using AutoMapper;
using Practice.Application.DTOs.Organization;
using Practice.Application.Models;
using Practice.Domain.Core.Common.Exceptions;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.OrganizationN;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Application.Services.OrganizationN
{
    public class OrganizationService : IOrganizationService
    {
        private readonly IOrganizationRepository organizationRepository;
        private readonly IMapper mapper;

        public OrganizationService(IOrganizationRepository organizationRepository,
                                   IMapper mapper)
        {
            this.organizationRepository = organizationRepository;
            this.mapper = mapper;
        }

        public async Task<OrganizationDTO> AddOrganization(OrganizationDTO organizationDTO)
        {
            if (organizationDTO == null)
                throw new ArgumentNullException(nameof(organizationDTO));

            return mapper.Map<OrganizationDTO>(await organizationRepository.Create(mapper.Map<Organization>(organizationDTO)));
        }

        public async Task<OrganizationDTO> GetOrganizationById(Guid id)
        {
            var organization = await organizationRepository.GetById(id);

            if (organization == null)
                throw new OrganizationNotFoundException();

            return mapper.Map<OrganizationDTO>(organization);
        }

        public async Task<IEnumerable<OrganizationDTO>> GetAllOrganizations(RunRequestParams parameters)
        {
            return mapper.Map<IEnumerable<OrganizationDTO>>(await organizationRepository.GetAll(parameters.StartDate, parameters.EndDate, parameters.GradeLevel));
        }

        public async Task<OrganizationDTO> UpdateOrganization(OrganizationDTO organizationDTO)
        {
            if (organizationDTO == null)
                throw new ArgumentNullException(nameof(organizationDTO));

            return mapper.Map<OrganizationDTO>(await organizationRepository.Update(mapper.Map<Organization>(organizationDTO)));
        }

        public async Task<bool> DeleteOrganization(Guid id)
        {
            var organizationToDelete = await organizationRepository.GetById(id, false);

            if (organizationToDelete == null)
                throw new OrganizationNotFoundException();

            return await organizationRepository.Delete(organizationToDelete);
        }

        public async Task<bool> DeleteAllOrganizations()
        {
            return await organizationRepository.DeleteAll();
        }
    }
}
