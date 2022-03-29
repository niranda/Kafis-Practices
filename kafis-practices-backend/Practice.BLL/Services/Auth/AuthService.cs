using Practice.Application.DTOs.Login;
using Practice.Application.Services.Encryption;
using Practice.Application.Services.Token;
using Practice.Application.Settings;
using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.UserN;
using System;
using System.Threading.Tasks;

namespace Practice.Application.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly ITokenService tokenService;
        private readonly IUserRepository userRepository;
        private readonly EncryptionSettings encryptionSettings;

        public AuthService(ITokenService tokenService,
                           IUserRepository userRepository,
                           EncryptionSettings encryptionSettings)
        {
            this.tokenService = tokenService;
            this.userRepository = userRepository;
            this.encryptionSettings = encryptionSettings;
        }

        public async Task<AuthResultDTO> Login(AuthDTO model)
        {
            if (model == null)
                throw new ArgumentNullException(nameof(model));

            var existingUser = await userRepository.FindByUserName(model.UserName);

            if (existingUser != null)
            {
                if (CheckPassword(existingUser, model.Password))
                {
                    return new AuthResultDTO
                    {
                        IsSuccess = true,
                        Token = tokenService.GenerateJwtToken(existingUser),
                        ErrorMessage = null
                    };
                }

                return new AuthResultDTO
                {
                    IsSuccess = false,
                    ErrorMessage = ErrorCode.InvalidPassword
                };
            }

            return new AuthResultDTO
            {
                IsSuccess = false,
                ErrorMessage = ErrorCode.InvalidLogin
            };
        }

        private bool CheckPassword(User user, string password) => EncryptionService.DecryptString(user.PasswordHash, encryptionSettings.Key) == password;
    }

}
