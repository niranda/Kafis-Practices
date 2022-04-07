using Practice.Domain.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Domain.Core.Stores.ManagerN
{
    public interface IManagerRepository
    {
        Task<Manager> GetById(Guid id, bool asNoTracking = true);
        Task<Manager> GetByUserId(Guid userId);
        Task<IEnumerable<Manager>> GetAll();
        Task<IEnumerable<Manager>> GetAllWithCredentials();
        Task<Manager> Create(Manager manager);
        Task<Manager> Update(Manager manager);
        Task<bool> Delete(Manager manager);
    }
}
