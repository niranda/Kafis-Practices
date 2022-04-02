﻿using Practice.Application.DTOs.Organization;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Application.Services.OrganizationN
{
    public interface IOrganizationService
    {
        Task<OrganizationDTO> AddOrganization(OrganizationDTO organizationDTO);
        Task<OrganizationDTO> GetOrganizationById(Guid id);
        Task<IEnumerable<OrganizationDTO>> GetAllOrganizations();
        Task<OrganizationDTO> UpdateOrganization(OrganizationDTO organizationDTO);
        Task<bool> DeleteOrganization(Guid id);
        Task<bool> DeleteAllOrganizations();
    }
}
