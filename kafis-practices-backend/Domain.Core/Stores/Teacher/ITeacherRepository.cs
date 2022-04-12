using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Domain.Core.Stores.TeacherN
{
    public interface ITeacherRepository
    {
        Task<Teacher> GetById(Guid id, bool asNoTracking = true);
        Task<Teacher> GetByUserId(Guid userId);
        Task<IEnumerable<Teacher>> GetAll(int startDate, int endDate, GradeLevelEnum gradeLevel);
        Task<IEnumerable<Teacher>> GetAllWithCredentials(int startDate, int endDate, GradeLevelEnum gradeLevel);
        Task<Teacher> Create(Teacher teacher);
        Task<Teacher> Update(Teacher teacher);
        Task<bool> Delete(Teacher teacher);
    }
}
