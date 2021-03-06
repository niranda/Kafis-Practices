using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Practice.Application.DTOs.Organization;
using Practice.Application.Services.OrganizationN;
using Practice.Domain.Core.Common.Constants;
using Practice.WebAPI.Filters;
using System.Threading.Tasks;

namespace Practice.WebAPI.Controllers
{
    [ServiceFilter(typeof(CustomExceptionFilterAttribute))]
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {
        private readonly IOrganizationService organizationService;

        public OrganizationController(IOrganizationService organizationService)
        {
            this.organizationService = organizationService;
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpPost]
        //POST: api/Organization
        public async Task<IActionResult> CreateOrganization([FromBody] OrganizationDTO organizationDTO)
        {
            return Ok(await organizationService.AddOrganization(organizationDTO));
        }

        [Authorize]
        [HttpGet("{id}")]
        //GET: api/Organization/{id}
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            return Ok(await organizationService.GetOrganizationById(id));
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpGet]
        //GET: api/Organization
        public async Task<IActionResult> GetOrganizations()
        {
            return Ok(await organizationService.GetAllOrganizations());
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpPut]
        //PUT: api/Organization
        public async Task<IActionResult> UpdateOrganization([FromBody] OrganizationDTO organizationDTO)
        {
            return Ok(await organizationService.UpdateOrganization(organizationDTO));
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpDelete("{id}")]
        //DELETE: api/Organization/{id}
        public async Task<IActionResult> DeleteOrganization([FromRoute] int id)
        {
            return Ok(await organizationService.DeleteOrganization(id));
        }
    }
}
