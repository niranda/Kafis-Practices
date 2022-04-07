using Practice.Application.Services.Encryption;
using Practice.Application.Settings;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.Mail;
using Practice.Domain.Core.Stores.UserN;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Application.Services.UserN
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly EncryptionSettings encryptionSettings;
        private readonly IMailSendService _mailSendService;

        public UserService(IUserRepository userRepository,
                           EncryptionSettings encryptionSettings,
                           IMailSendService mailSendService)
        {
            this.userRepository = userRepository;
            this.encryptionSettings = encryptionSettings;
            _mailSendService = mailSendService;
        }

        public async Task<Guid> CreateUser(string role)
        {
            string username = EncryptionService.RandomString(15);
            string password = EncryptionService.RandomString(10);

            User user = new User
            {
                UserName = username,
                NormalizedUserName = username,
                SecurityStamp = Guid.NewGuid().ToString(),
                PasswordHash = EncryptionService.EncryptString(password, encryptionSettings.Key),
                RoleId = await userRepository.GetRoleId(role)
            };

            return await userRepository.Create(user);
        }

        public async Task SendDataOnEmailAddress(IEnumerable<Guid> ids)
        {
            var users = userRepository.GetAllUserByIds(ids);

            foreach (var user in users)
            {
                string messages = $"Login: {user.UserName}\nPassword: {EncryptionService.DecryptString(user.PasswordHash, encryptionSettings.Key)}";
                await _mailSendService.SendEmailAsync(user.Email, "Information", messages);
            }
        }
    }
}
