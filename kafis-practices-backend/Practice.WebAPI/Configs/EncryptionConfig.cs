using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Practice.Application.Settings;

namespace Practice.WebAPI.Configs
{
    public static class EncryptionConfig
    {
        public static void RegisterEncryption(this IServiceCollection services, IConfiguration configuration)
        {
            var encryptionSettings = new EncryptionSettings();
            configuration.Bind(nameof(encryptionSettings), encryptionSettings);
            services.AddSingleton(encryptionSettings);
        }
    }
}
