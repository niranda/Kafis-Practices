
using Practice.Domain.Core.Entities;

namespace Practice.Application.Services.Token
{
    public interface ITokenService
    {
        string GenerateJwtToken(User user);
    }
}
