using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Practice.Application.Settings;
using Practice.Domain.Core.Entities;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Practice.Application.Services.Token
{
    public class TokenService : ITokenService
    {
        private readonly JwtSettings _jwtSettings;
        private readonly UserManager<User> _userManager;

        public TokenService(JwtSettings jwtSettings, UserManager<User> userManager)
        {
            _jwtSettings = jwtSettings;
            _userManager = userManager;
        }
        public async Task<string> GenerateJwtToken(User user)
        {
            if (user == null) { throw new ArgumentNullException(nameof(user)); }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            var role = await _userManager.GetRolesAsync(user);
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("role", role.FirstOrDefault()),
                    new Claim("username", user.UserName),
                    new Claim("id", user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var securityToken = tokenHandler.CreateToken(tokenDescription);
            var token = tokenHandler.WriteToken(securityToken);

            return token;
        }
    }
}
