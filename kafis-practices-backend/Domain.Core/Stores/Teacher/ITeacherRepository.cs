using Practice.Domain.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Domain.Core.Stores.TeacherN
{
    public interface ITeacherRepository
    {
        Task<Teacher> GetById(int id, bool asNoTracking = true);
        Task<Teacher> GetByUserId(string userId);
        Task<IEnumerable<Teacher>> GetAll();
        Task<IEnumerable<Teacher>> GetAllWithCredentials();
        Task<Teacher> Create(Teacher teacher);
        Task<Teacher> Update(Teacher teacher);
        Task<bool> Delete(Teacher teacher);
    }
}
