using Microsoft.AspNetCore.Http;
using Practice.Application.DTOs.User.Student;
using Practice.Application.Models;
using Practice.Domain.Core.Common.Enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Application.Services.StudentN
{
    public interface IStudentService
    {
        Task<AddStudentResultDTO> AddStudent(StudentUserDTO studentDTO);
        Task<StudentDTO> GetStudentById(int id);
        Task<StudentDTO> GetStudentByUserId(string userId);
        Task<IEnumerable<StudentDTO>> GetAllStudents();
        Task<IEnumerable<StudentUserDTO>> GetAllStudentsWithCredentials();
        Task<IEnumerable<string>> GetSpecialtiesBySearchParams(SpecialtiesRequestParams parameters);
        Task<IEnumerable<string>> GetSpecialtiesByDegreeLevel(DegreeLevelEnum degreeLevel);
        Task<StudentDTO> UpdateStudentGrade(int id, int grade);
        Task<StudentDTO> UpdateStudentReport(int id, IFormFile fileUpload);
        Task<UpdateStudentResultDTO> UpdateStudent(StudentDTO studentDTO);
        Task<bool> DeleteStudent(int id);
        Task<bool> DeleteAllStudents();
    }
}
