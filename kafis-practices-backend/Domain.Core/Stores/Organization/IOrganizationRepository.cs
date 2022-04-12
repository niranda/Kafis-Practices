using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Domain.Core.Stores.OrganizationN
{
    public interface IOrganizationRepository
    {
        Task<Organization> GetById(Guid id, bool asNoTracking = true);
        Task<IEnumerable<Organization>> GetAll(int startDate, int endDate, GradeLevelEnum gradeLevel);
        Task<Organization> Create(Organization organization);
        Task<Organization> Update(Organization organization);
        Task<bool> Delete(Organization organization);
        Task<bool> DeleteAll();
    }
}
