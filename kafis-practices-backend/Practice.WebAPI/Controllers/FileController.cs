using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Practice.Domain.Core.Stores.File.FileUploadN;
using Practice.WebAPI.Filters;
using System.Threading.Tasks;

namespace Practice.WebAPI.Controllers
{
    [ServiceFilter(typeof(CustomExceptionFilterAttribute))]
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileUploadService _fileUploadService;

        public FileController(IFileUploadService fileUploadService)
        {
            _fileUploadService = fileUploadService;
        }

        [Authorize]
        [HttpGet]
        //GET: api/File
        public async Task<IActionResult> GetFile([FromQuery] string fileName)
        {
            return File(await _fileUploadService.GetFile(fileName), _fileUploadService.GetMimeType(fileName));
        }
    }
}
