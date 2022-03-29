using Practice.Application.DTOs.User.Teacher;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Application.Services.TeacherN
{
    public interface ITeacherService
    {
        Task<TeacherDTO> AddTeacher(TeacherUserDTO teacherDTO);
        Task<TeacherDTO> GetTeacherById(int id);
        Task<TeacherDTO> GetTeacherByUserId(string id);
        Task<IEnumerable<TeacherDTO>> GetAllTeachers();
        Task<IEnumerable<TeacherUserDTO>> GetAllTeachersWithCredentials();
        Task<TeacherDTO> UpdateTeacher(TeacherDTO teacherDTO);
        Task<bool> DeleteTeacher(int id);
    }
}
