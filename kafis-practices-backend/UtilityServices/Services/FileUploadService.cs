using Microsoft.AspNetCore.Http;
using Practice.Domain.Core.Stores.File.FileUploadN;
using Practice.UtilityServices.Settings;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Practice.UtilityServices.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly FolderSettings _folderSettings;
        public FileUploadService(FolderSettings folderSettings)
        {
            _folderSettings = folderSettings;
        }

        public async Task<string> UploadFile(IFormFile fileUpload)
        {

            string fileName = Path.GetRandomFileName() + Path.GetExtension(fileUpload.FileName);

            using FileStream fileStream = File.Create(_folderSettings.PathToReportsFolder + fileName);
            await fileUpload.CopyToAsync(fileStream);
            await fileStream.FlushAsync();

            return fileName;
        }

        public async Task<byte[]> GetFile(string fileName)
        {
            return await File.ReadAllBytesAsync(_folderSettings.PathToReportsFolder + fileName);
        }

        public void DeleteFile(string fileName)
        {
            File.Delete(_folderSettings.PathToReportsFolder + fileName);
        }

        public async Task<string> GetAttorney() =>
            await File.ReadAllTextAsync(_folderSettings.PathToAttorneyFile);

        public async Task UpdateAttorney(string newAttorney) =>
            await File.WriteAllTextAsync(_folderSettings.PathToAttorneyFile, newAttorney, Encoding.UTF8);

        public string GetMimeType(string fileName)
        {
            string mimeType = "application/unknown";
            string ext = Path.GetExtension(fileName).ToLower();

#pragma warning disable CA1416
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);

            if (regKey != null && regKey.GetValue("Content Type") != null)
            {
                mimeType = regKey.GetValue("Content Type").ToString();
            }
#pragma warning restore CA1416
            else if (ext == ".docx")
            {
                mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            }
            else if (ext == ".doc")
            {
                mimeType = "application/msword";
            }
            else if (ext == ".pdf")
            {
                mimeType = "application/pdf";
            }
            return mimeType;
        }
    }
}
