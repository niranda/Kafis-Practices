using Microsoft.AspNetCore.Mvc;
using Practice.Application.DTOs.Login;
using Practice.Application.DTOs.Response;
using Practice.Application.Services.Auth;
using System.Threading.Tasks;

namespace Practice.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("Login")]
        //POST: api/Auth/Login
        public async Task<IActionResult> Login([FromBody] AuthDTO user)
        {
            var result = await authService.Login(user);
            if (result.IsSuccess)
                HttpContext.Response.Cookies.Append("Token", result.Token);

            return Ok(new ResponseDTO { IsSuccess = result.IsSuccess, ErrorMessage = result.ErrorMessage });
        }
    }
}
