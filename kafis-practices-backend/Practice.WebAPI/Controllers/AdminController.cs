using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Practice.Application.DTOs.Attorney;
using Practice.Application.Models.Admin;
using Practice.Application.Services.Document;
using Practice.Application.Services.OrganizationN;
using Practice.Application.Services.StudentN;
using Practice.Domain.Core.Common.Constants;
using Practice.Domain.Core.Stores.File.FileUploadN;
using Practice.WebAPI.Filters;
using System.Threading.Tasks;

namespace Practice.WebAPI.Controllers
{
    [ServiceFilter(typeof(CustomExceptionFilterAttribute))]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IStudentService studentService;
        private readonly IOrganizationService organizationService;
        private readonly IDocumentService documentService;
        private readonly IFileUploadService fileUploadService;

        public AdminController(
            IStudentService studentService,
            IOrganizationService organizationService,
            IDocumentService documentService,
            IFileUploadService fileUploadService)
        {
            this.studentService = studentService;
            this.organizationService = organizationService;
            this.documentService = documentService;
            this.fileUploadService = fileUploadService;
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpGet("clearDB")]
        //GET: api/Admin/clearDB
        public async Task<IActionResult> ClearDatabase()
        {
            var studentsDeleteResult = await studentService.DeleteAllStudents();
            var organizationDeleteResult = await organizationService.DeleteAllOrganizations();

            return Ok(studentsDeleteResult && organizationDeleteResult);
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpPost("report")]
        //POST: api/Admin/report
        public async Task<IActionResult> GetAdminReport(AdminReportRequestParams parameters)
        {
            return Ok(await documentService.GetAdminReport(parameters));
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpPost("order")]
        //POST: api/Admin/order
        public IActionResult GetAdminOrder(AdminOrderRequestParams parameters)
        {
            return Ok(documentService.GetAdminOrder(parameters));
        }

        [Authorize(Roles = RoleNameConstants.Student + "," + RoleNameConstants.Admin)]
        [HttpGet("getAttorney")]
        //GET: api/Admin/getAttorney
        public async Task<IActionResult> GetAttorney()
        {
            var x = await fileUploadService.GetAttorney();
            return Ok(new AttorneyDTO { Value = x });
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpGet("updateAttorney")]
        //GET: api/Admin/updateAttorney
        public async Task UpdateAttorney([FromQuery] string newAttorney)
        {
            await fileUploadService.UpdateAttorney(newAttorney);
        }
    }
}
