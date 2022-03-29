using Practice.Application.DTOs.Login;
using System.Threading.Tasks;

namespace Practice.Application.Services.Auth
{
    public interface IAuthService
    {
        Task<AuthResultDTO> Login(AuthDTO model);
    }
}
