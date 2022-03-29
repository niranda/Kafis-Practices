using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Practice.Application.DTOs.User.Teacher;
using Practice.Application.Services.TeacherN;
using Practice.Domain.Core.Common.Constants;
using Practice.WebAPI.Filters;
using System.Threading.Tasks;

namespace Practice.WebAPI.Controllers
{
    [ServiceFilter(typeof(CustomExceptionFilterAttribute))]
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService teacherService;

        public TeacherController(ITeacherService teacherService)
        {
            this.teacherService = teacherService;
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpPost]
        //POST: api/Teacher
        public async Task<IActionResult> CreateTeacher([FromBody] TeacherUserDTO teacherDTO)
        {
            return Ok(await teacherService.AddTeacher(teacherDTO));
        }

        [Authorize]
        [HttpGet("{id}")]
        //GET: api/Teacher/{id}
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            return Ok(await teacherService.GetTeacherById(id));
        }

        [Authorize(Roles = RoleNameConstants.Teacher)]
        [HttpGet("ByUserId")]
        //GET: api/Teacher/ByUserId?{teacherId}
        public async Task<IActionResult> GetTeacherByUserId([FromQuery] string userId)
        {
            return Ok(await teacherService.GetTeacherByUserId(userId));
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpGet]
        //GET: api/Teacher
        public async Task<IActionResult> GetTeachers()
        {
            return Ok(await teacherService.GetAllTeachers());
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpGet("credentials")]
        //GET: api/Teacher/credentials
        public async Task<IActionResult> GetTeachersWithCredentials()
        {
            return Ok(await teacherService.GetAllTeachersWithCredentials());
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpPut]
        //PUT: api/Teacher
        public async Task<IActionResult> UpdateTeacher([FromBody] TeacherDTO teacherDTO)
        {
            return Ok(await teacherService.UpdateTeacher(teacherDTO));
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpDelete("{id}")]
        //DELETE: api/Teacher/{id}
        public async Task<IActionResult> DeleteTeacher([FromRoute] int id)
        {
            return Ok(await teacherService.DeleteTeacher(id));
        }
    }
}
