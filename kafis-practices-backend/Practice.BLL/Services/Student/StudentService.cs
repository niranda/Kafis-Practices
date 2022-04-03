using AutoMapper;
using Microsoft.AspNetCore.Http;
using Practice.Application.DTOs.Practice;
using Practice.Application.DTOs.User.Student;
using Practice.Application.Models;
using Practice.Application.Services.UserN;
using Practice.Domain.Core.Common.Constants;
using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Common.Exceptions;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.File.FileUploadN;
using Practice.Application.Models.StudentN;
using Practice.Domain.Core.Stores.Practice;
using Practice.Domain.Core.Stores.StudentN;
using Practice.Domain.Core.Stores.TeacherN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Practice.Application.Services.StudentN
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository studentRepository;
        private readonly ITeacherRepository teacherRepository;
        private readonly IPracticeDatesRepository practiceDatesRepository;
        private readonly IMapper mapper;
        private readonly IUserService userService;
        private readonly IFileUploadService fileUploadService;

        public StudentService(IStudentRepository studentRepository,
                              ITeacherRepository teacherRepository,
                              IPracticeDatesRepository practiceDatesRepository,
                              IMapper mapper,
                              IUserService userService,
                              IFileUploadService fileUploadService)
        {
            this.studentRepository = studentRepository;
            this.teacherRepository = teacherRepository;
            this.practiceDatesRepository = practiceDatesRepository;
            this.mapper = mapper;
            this.userService = userService;
            this.fileUploadService = fileUploadService;
        }

        public async Task<AddStudentResultDTO> AddStudent(StudentUserDTO studentDTO)
        {
            if (studentDTO == null)
                throw new ArgumentNullException(nameof(studentDTO));

            if (!await IsTeacherAssignValid(studentDTO))
            {
                return new AddStudentResultDTO
                {
                    IsSuccess = false
                };
            }

            studentDTO.UserId = await userService.CreateUser(RoleNameConstants.Student);

            studentDTO.PracticeDatesId = (await practiceDatesRepository.GetByGradeLevel(studentDTO.GradeLevel)).Id;

            var student = mapper.Map<Student>(studentDTO);
            var addedStudent = mapper.Map<StudentDTO>(await studentRepository.Create(student));
            return new AddStudentResultDTO
            {
                IsSuccess = true,
                StudentDTO = addedStudent
            };
        }

        public async Task<StudentDTO> GetStudentById(Guid id)
        {
            var student = await studentRepository.GetById(id);

            if (student == null)
                throw new StudentNotFoundException();

            return mapper.Map<StudentDTO>(student);
        }

        public async Task<StudentDTO> GetStudentByUserId(Guid userId)
        {
            return mapper.Map<StudentDTO>(await studentRepository.GetByUserId(userId));
        }

        public async Task<IEnumerable<StudentDTO>> GetAllStudents()
        {
            return mapper.Map<IEnumerable<StudentDTO>>(await studentRepository.GetAll());
        }

        public async Task<IEnumerable<StudentUserDTO>> GetAllStudentsWithCredentials()
        {
            return mapper.Map<IEnumerable<StudentUserDTO>>(await studentRepository.GetAllWithCredentials());
        }

        public async Task<IEnumerable<string>> GetSpecialtiesBySearchParams(SpecialtiesRequestParams parameters)
        {
            return await studentRepository.GetAllSpecialtiesByYearAndGradeLevel(parameters.Year, parameters.GradeLevel);
        }

        public async Task<IEnumerable<string>> GetSpecialtiesByDegreeLevel(DegreeLevelEnum degreeLevel)
        {
            return await studentRepository.GetSpecialtiesByDegreeLevel(degreeLevel);
        }

        public async Task<StudentDTO> UpdateStudentGrade(Guid id, int grade)
        {
            if (grade < 0 || grade > 100)
                throw new ArgumentOutOfRangeException(nameof(grade));

            var student = await studentRepository.GetById(id);
            if (student == null)
                throw new ArgumentNullException(nameof(student));

            student.Grade = grade;

            return mapper.Map<StudentDTO>(await studentRepository.Update(student));
        }

        public async Task<StudentDTO> UpdateStudentReport(Guid id, IFormFile fileUpload)
        {
            var student = await studentRepository.GetById(id);
            if (student == null)
                throw new ArgumentNullException(nameof(student));

            var fileName = await fileUploadService.UploadFile(fileUpload);

            if (fileName != null)
            {
                if (student.ReportFileName != null)
                    fileUploadService.DeleteFile(student.ReportFileName);
                student.ReportFileName = fileName;
            }

            return mapper.Map<StudentDTO>(await studentRepository.Update(student));
        }

        public async Task<RunDTO> UpdateRun(RunDTO runDTO)
        {
            if (runDTO == null)
                throw new ArgumentNullException(nameof(runDTO));

            return mapper.Map<RunDTO>(await studentRepository.UpdateRun(mapper.Map<Run>(runDTO)));
        }

        public async Task<RunDTO> AddRun(RunDTO runDTO)
        {
            if (runDTO == null)
                throw new ArgumentNullException(nameof(runDTO));

            return mapper.Map<RunDTO>(await studentRepository.CreateRun(mapper.Map<Run>(runDTO)));
        }

        public async Task<UpdateStudentResultDTO> UpdateStudent(StudentDTO studentDTO)
        {
            if (studentDTO == null)
                throw new ArgumentNullException(nameof(studentDTO));

            if (!await IsTeacherAssignValid(studentDTO))
            {
                return new UpdateStudentResultDTO
                {
                    IsSuccess = false
                };
            }

            var practiceDates = mapper.Map<PracticeDatesDTO>(await practiceDatesRepository.GetByGradeLevel(studentDTO.GradeLevel));
            studentDTO.PracticeDatesId = practiceDates.Id;
            studentDTO.PracticeDates = practiceDates;

            var updatedStudent = mapper.Map<StudentDTO>(await studentRepository.Update(mapper.Map<Student>(studentDTO)));
            return new UpdateStudentResultDTO
            {
                IsSuccess = true,
                StudentDTO = updatedStudent
            };
        }

        public async Task<bool> DeleteStudent(Guid id)
        {
            var studentToDelete = await studentRepository.GetById(id, false);

            if (studentToDelete == null)
                throw new StudentNotFoundException();

            return await studentRepository.Delete(studentToDelete);
        }

        public async Task<bool> DeleteAllStudents()
        {
            return await studentRepository.DeleteAll();
        }

        private async Task<bool> IsTeacherAssignValid(StudentDTO studentDTO)
        {
            if (studentDTO.TeacherId != null)
            {
                var teacherId = studentDTO.TeacherId.Value;
                var teacher = await teacherRepository.GetById(teacherId);
                if (teacher.Students.Count >= 8 && !teacher.Students.Any(s => s.Id == studentDTO.Id))
                    return false;
            }
            return true;
        }
    }
}
