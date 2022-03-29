using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Practice.UtilityServices.Settings;
using System.IO;
using System.Text;

namespace Practice.WebAPI.Configs
{
    public static class FolderConfig
    {
        public static void RegisterFolders(this IServiceCollection services, IConfiguration configuration)
        {
            var folderSettings = new FolderSettings();
            configuration.Bind(nameof(FolderSettings), folderSettings);
            services.AddSingleton(folderSettings);

            CreateAttorneyFile(configuration);
        }

        private static void CreateAttorneyFile(IConfiguration configuration)
        {
            if (!File.Exists(configuration.GetSection("FolderSettings")["PathToAttorneyFile"]))
            {
                File.WriteAllText(configuration.GetSection("FolderSettings")["PathToAttorneyFile"],
                                  configuration.GetSection("FolderSettings")["AttorneyFileDefaultValue"],
                                  Encoding.UTF8);
            }
        }
    }
}
