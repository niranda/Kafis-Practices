using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.ManagerN;
using Practice.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Practice.Infrastructure.Stores
{
    public class ManagerRepository : IManagerRepository
    {
        private readonly ApplicationContext context;
        public ManagerRepository(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task<Manager> GetById(Guid id, bool asNoTracking = true)
        {
            if (asNoTracking)
            {
                return await context.Managers.AsNoTracking().Include(t => t.Organization).SingleOrDefaultAsync(s => s.Id == id);
            }
            return await context.Managers.Include(t => t.Organization).SingleOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Manager> GetByUserId(Guid userId)
        {
            return await context.Managers.AsNoTracking()
                .Include(t => t.Organization)
                .Where(t => t.UserId == userId)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Manager>> GetAll()
        {
            return await context.Managers.AsNoTracking()
                .Include(t => t.Organization)
                .Where(t => !t.IsDeleted)
                .ToListAsync();
        }

        public async Task<IEnumerable<Manager>> GetAllWithCredentials()
        {
            return await context.Managers.AsNoTracking().Include(t => t.User).Where(t => !t.IsDeleted).ToListAsync();
        }

        public async Task<Manager> Create(Manager manager)
        {
            await context.Managers.AddAsync(manager);
            await context.SaveChangesAsync();
            return manager;
        }

        public async Task<Manager> Update(Manager manager)
        {
            context.Update(manager);
            await context.SaveChangesAsync();
            return manager;
        }

        public async Task<bool> Delete(Manager manager)
        {
            var company = await context.Organizations.Where(s => s.ManagerId == manager.Id && !s.IsDeleted).ToListAsync();
            company.ForEach(s => s.IsDeleted = true);
            manager.IsDeleted = true;

            await context.SaveChangesAsync();
            return true;
        }
    }
}
