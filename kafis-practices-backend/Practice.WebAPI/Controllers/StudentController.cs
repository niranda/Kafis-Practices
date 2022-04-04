using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Practice.Application.DTOs.User.Student;
using Practice.Application.Models;
using Practice.Application.Services.StudentN;
using Practice.Domain.Core.Common.Constants;
using Practice.Application.Models.StudentN;
using Practice.Domain.Core.Common.Enums;
using Practice.WebAPI.Filters;
using Practice.WebAPI.Models;
using System;
using System.Threading.Tasks;

namespace Practice.WebAPI.Controllers
{
    [ServiceFilter(typeof(CustomExceptionFilterAttribute))]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {

        private readonly IStudentService studentService;


        public StudentController(IStudentService studentService)
        {
            this.studentService = studentService;
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpPost]
        //POST: api/Student
        public async Task<IActionResult> CreateStudent([FromBody] StudentUserDTO studentDTO)
        {
            return Ok(await studentService.AddStudent(studentDTO));
        }

        [Authorize]
        [HttpGet("{id}")]
        //GET: api/Student/{id}
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            return Ok(await studentService.GetStudentById(id));
        }

        [Authorize(Roles = RoleNameConstants.Student)]
        [HttpGet("ByUserId")]
        //GET: api/Student/ByUserId?{teacherId}
        public async Task<IActionResult> GetStudentByUserId([FromQuery] Guid userId)
        {
            return Ok(await studentService.GetStudentByUserId(userId));
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpGet]
        //GET: api/Student
        public async Task<IActionResult> GetStudents(RunRequestParams parameters)
        {
            return Ok(await studentService.GetAllStudents(parameters));
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpGet("credentials")]
        //GET: api/Student/credentials
        public async Task<IActionResult> GetStudentsWithCredentials()
        {
            return Ok(await studentService.GetAllStudentsWithCredentials());
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpPost("specialties")]
        //POST: api/Student/specialties
        public async Task<IActionResult> GetSpecialtiesByParams(SpecialtiesRequestParams parameters)
        {
            return Ok(await studentService.GetSpecialtiesBySearchParams(parameters));
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpPost("specialtiesByDegree")]
        //POST: api/Student/specialtiesByDegree
        public async Task<IActionResult> GetSpecialtiesByDegree(DegreeLevelEnum degreeLevel)
        {
            return Ok(await studentService.GetSpecialtiesByDegreeLevel(degreeLevel));
        }

        [Authorize(Roles = RoleNameConstants.Teacher)]
        [HttpGet("grade")]
        //GET: api/Student/grade
        public async Task<IActionResult> UpdateStudentGrade([FromQuery] Guid studentId, [FromQuery] int grade)
        {
            return Ok(await studentService.UpdateStudentGrade(studentId, grade));
        }


        [Authorize(Roles = RoleNameConstants.Student)]
        [HttpPost("report")]
        //POST: api/Student/report
        public async Task<IActionResult> UpdateStudentReport([FromQuery] Guid id, [FromForm] FileUpload fileUpload)
        {
            return Ok(await studentService.UpdateStudentReport(id, fileUpload.File));
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpPut]
        //PUT: api/Student
        public async Task<IActionResult> UpdateStudent([FromBody] StudentDTO studentDTO)
        {
            return Ok(await studentService.UpdateStudent(studentDTO));
        }

        [Authorize(Roles = RoleNameConstants.Admin)]
        [HttpDelete("{id}")]
        //DELETE: api/Student/{id}
        public async Task<IActionResult> DeleteStudent([FromRoute] Guid id)
        {
            return Ok(await studentService.DeleteStudent(id));
        }
    }
}
