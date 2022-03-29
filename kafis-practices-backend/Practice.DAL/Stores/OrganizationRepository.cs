using Microsoft.EntityFrameworkCore;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.OrganizationN;
using Practice.Infrastructure.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Practice.Infrastructure.Stores
{
    public class OrganizationRepository : IOrganizationRepository
    {
        private readonly ApplicationContext context;
        public OrganizationRepository(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task<Organization> GetById(int id, bool asNoTracking = true)
        {
            if (asNoTracking)
            {
                return await context.Organizations.AsNoTracking().Include(o => o.Students.Where(s => !s.IsDeleted)).SingleOrDefaultAsync(s => s.Id == id);
            }
            return await context.Organizations.Include(o => o.Students.Where(s => !s.IsDeleted)).SingleOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IEnumerable<Organization>> GetAll()
        {
            return await context.Organizations.AsNoTracking().Include(o => o.Students.Where(s => !s.IsDeleted)).Where(o => !o.IsDeleted).ToListAsync();
        }

        public async Task<Organization> Create(Organization organization)
        {
            await context.Organizations.AddAsync(organization);
            await context.SaveChangesAsync();
            return organization;
        }

        public async Task<Organization> Update(Organization organization)
        {
            context.Update(organization);
            await context.SaveChangesAsync();
            return organization;
        }

        public async Task<bool> Delete(Organization organization)
        {
            var students = await context.Students.Where(s => s.OrganizationId == organization.Id && !s.IsDeleted).ToListAsync();
            students.ForEach(s => s.OrganizationId = null);
            organization.IsDeleted = true;
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAll()
        {
            var organizations = await context.Organizations.Where(o => !o.IsDeleted).ToListAsync();
            organizations.ForEach(o => o.IsDeleted = true);
            await context.SaveChangesAsync();
            return true;
        }
    }
}
