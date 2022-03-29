using Practice.Domain.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Domain.Core.Stores.OrganizationN
{
    public interface IOrganizationRepository
    {
        Task<Organization> GetById(int id, bool asNoTracking = true);
        Task<IEnumerable<Organization>> GetAll();
        Task<Organization> Create(Organization organization);
        Task<Organization> Update(Organization organization);
        Task<bool> Delete(Organization organization);
        Task<bool> DeleteAll();
    }
}
