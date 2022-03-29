using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Practice.Application.Settings;

namespace Practice.WebAPI.Configs
{
    public static class ClientUrlsConfig
    {
        public static void RegisterClientUrls(this IServiceCollection services, IConfiguration configuration)
        {
            var clientUrlsSettings = new ClientUrlsSettings();
            configuration.Bind(nameof(ClientUrlsSettings), clientUrlsSettings);
            services.AddSingleton(clientUrlsSettings);
        }
    }
}
