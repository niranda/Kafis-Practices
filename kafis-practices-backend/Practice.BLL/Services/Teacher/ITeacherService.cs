using Practice.Application.DTOs.User.Teacher;
using Practice.Application.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Application.Services.TeacherN
{
    public interface ITeacherService
    {
        Task<TeacherDTO> AddTeacher(TeacherUserDTO teacherDTO);
        Task<TeacherDTO> GetTeacherById(Guid id);
        Task<TeacherDTO> GetTeacherByUserId(Guid id);
        Task<IEnumerable<TeacherDTO>> GetAllTeachers(RunRequestParams parameters);
        Task<IEnumerable<TeacherUserDTO>> GetAllTeachersWithCredentials(RunRequestParams parameters);
        Task<TeacherDTO> UpdateTeacher(TeacherDTO teacherDTO);
        Task<bool> DeleteTeacher(Guid id);
    }
}
