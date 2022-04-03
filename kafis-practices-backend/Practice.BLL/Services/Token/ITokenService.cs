using Practice.Domain.Core.Entities;
using System.Threading.Tasks;

namespace Practice.Application.Services.Token
{
    public interface ITokenService
    {
        public Task<string> GenerateJwtToken(User user);
    }
}
