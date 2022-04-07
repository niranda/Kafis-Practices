using Microsoft.AspNetCore.Http;
using Practice.Application.DTOs.User.Student;
using Practice.Application.Models;
using Practice.Application.Models.Admin;
using Practice.Application.Models.StudentN;
using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Application.Services.StudentN
{
    public interface IStudentService
    {
        Task<AddStudentResultDTO> AddStudent(StudentUserDTO studentDTO);
        Task<StudentDTO> GetStudentById(Guid id);
        Task<StudentDTO> GetStudentByUserId(Guid userId);
        Task<IEnumerable<StudentDTO>> GetAllStudents(RunRequestParams parameters);
        Task<IEnumerable<StudentUserDTO>> GetAllStudentsWithCredentials(RunRequestParams parameters);
        Task<IEnumerable<StudentDTO>> GetAllStudents(SortParams param = null);
        Task<IEnumerable<StudentUserDTO>> GetAllStudentsWithCredentials(SortParams param = null);
        Task<IEnumerable<string>> GetSpecialtiesBySearchParams(SpecialtiesRequestParams parameters);
        Task<IEnumerable<string>> GetSpecialtiesByDegreeLevel(DegreeLevelEnum degreeLevel);
        Task<StudentDTO> UpdateStudentGrade(Guid id, int grade);
        Task<StudentDTO> UpdateStudentReport(Guid id, IFormFile fileUpload);
        Task<UpdateStudentResultDTO> UpdateStudent(StudentDTO studentDTO);
        Task<bool> DeleteStudent(Guid id);
        Task<bool> DeleteAllStudents();
    }
}
