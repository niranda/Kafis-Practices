using Microsoft.AspNetCore.Identity;
using Practice.Application.DTOs.Login;
using Practice.Application.Services.Token;
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
        private readonly RoleManager<Role> _roleManager;
        private readonly SignInManager<User> _signInManager;

        public AuthService(ITokenService tokenService, UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<Role> roleManager)
        {
            this.tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        public async Task<AuthResultDTO> Login(AuthDTO model)
        {
            if (model == null)
                throw new ArgumentNullException(nameof(model));

            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

                if (result.Succeeded)
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
