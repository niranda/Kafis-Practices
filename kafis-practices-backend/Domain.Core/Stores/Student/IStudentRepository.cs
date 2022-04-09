using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using Practice.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Practice.Domain.Core.Stores.StudentN
{
    public interface IStudentRepository
    {
        Task<Student> GetById(Guid id, bool asNoTracking = true);
        Task<Student> GetByUserId(Guid userId);
        Task<IEnumerable<Student>> GetAllWithCredentials(DateTime startDate, DateTime endTime, GradeLevelEnum gradeLevel, string sortBy, SortDirection? sortDirection);
        Task<IEnumerable<Student>> GetAll(DateTime startDate, DateTime endTime, GradeLevelEnum gradeLevel, string sortBy, SortDirection? sortDirection);
        Task<IEnumerable<Student>> GetBySearchParams(int year, GradeLevelEnum gradeLevel);
        IQueryable<Student> GetStudentsForOrder(DegreeLevelEnum degreeLevel, string specialty);
        Task<IEnumerable<string>> GetAllSpecialtiesByYearAndGradeLevel(int year, GradeLevelEnum gradeLevel);
        Task<IEnumerable<string>> GetSpecialtiesByDegreeLevel(DegreeLevelEnum degreeLevel);
        Task<Student> Create(Student student);
        Task<Student> Update(Student student);
        Task<bool> Delete(Student student);
        Task<bool> DeleteAll();
    }
}
