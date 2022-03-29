using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Practice.Application.DTOs.Practice;
using Practice.Application.Services.PracticeDatesN;
using Practice.Domain.Core.Common.Constants;
using Practice.WebAPI.Filters;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.WebAPI.Controllers
{
    [ServiceFilter(typeof(CustomExceptionFilterAttribute))]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = RoleNameConstants.Admin)]
    public class PracticeDatesController : ControllerBase
    {
        private readonly IPracticeDatesService practiceDatesService;

        public PracticeDatesController(IPracticeDatesService practiceDatesService)
        {
            this.practiceDatesService = practiceDatesService;
        }

        [HttpGet]
        //GET: api/PracticeDates
        public async Task<IActionResult> GetPracticeDates()
        {
            return Ok(await practiceDatesService.GetPracticeDates());
        }

        [HttpPut]
        //PUT: api/PracticeDates
        public async Task<IActionResult> UpdatePracticeDates([FromBody] IEnumerable<PracticeDatesDTO> practiceDates, [FromHeader] string timezone)
        {
            return Ok(await practiceDatesService.UpdatePracticeDates(practiceDates, timezone));
        }
    }
}
