using Microsoft.AspNetCore.Identity;
using Practice.Application.DTOs.Login;
using Practice.Application.Services.Encryption;
using Practice.Application.Services.Token;
using Practice.Application.Settings;
using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using System;
using System.Threading.Tasks;

namespace Practice.Application.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly ITokenService tokenService;
        private readonly UserManager<User> _userManager;
        private readonly EncryptionSettings _encryptionSettings;

        public AuthService(ITokenService tokenService, UserManager<User> userManager, EncryptionSettings encryptionSettings)
        {
            this.tokenService = tokenService;
            _userManager = userManager;
            _encryptionSettings = encryptionSettings;
        }

        public async Task<AuthResultDTO> Login(AuthDTO model)
        {
            if (model == null)
                throw new ArgumentNullException(nameof(model));

            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user != null)
            {
                var result = EncryptionService.DecryptString(user.PasswordHash, _encryptionSettings.Key) == model.Password;

                if (result)
                {
                    return new AuthResultDTO
                    {
                        IsSuccess = true,
                        Token = await tokenService.GenerateJwtToken(user),
                        ErrorMessage = null
                    };
                }
            }

            return new AuthResultDTO
            {
                IsSuccess = false,
                ErrorMessage = ErrorCode.InvalidPassword
            };
        }

    }
}
