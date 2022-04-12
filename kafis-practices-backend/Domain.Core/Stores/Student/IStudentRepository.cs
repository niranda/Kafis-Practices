using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
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
        Task<IEnumerable<Student>> GetAllWithCredentials(int startDate, int endDate, GradeLevelEnum gradeLevel, string sortBy, SortDirection? sortDirection);
        Task<IEnumerable<Student>> GetAll(int startDate, int endDate, GradeLevelEnum gradeLevel, string sortBy, SortDirection? sortDirection);
        Task<IEnumerable<Student>> GetBySearchParams(int startDate, int endDate, GradeLevelEnum gradeLevel, string specialty);
        IQueryable<Student> GetStudentsForOrder(string specialty, int startDate, int endDate, GradeLevelEnum gradeLevel);
        Task<IEnumerable<string>> GetAllSpecialtiesByYearAndGradeLevel(int startDate, int endDate, GradeLevelEnum gradeLevel);
        Task<IEnumerable<string>> GetSpecialtiesByGradeLevel(GradeLevelEnum degreeLevel);
        Task<Student> Create(Student student);
        Task<Student> Update(Student student);
        Task<bool> Delete(Student student);
        Task<bool> DeleteAll();
    }
}
