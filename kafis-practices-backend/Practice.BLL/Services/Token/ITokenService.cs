
using Microsoft.IdentityModel.Tokens;
using Practice.Domain.Core.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace Practice.Application.Services.Token
{
    public interface ITokenService
    {
        public Task<string> GenerateJwtToken(User user);
    }
}
