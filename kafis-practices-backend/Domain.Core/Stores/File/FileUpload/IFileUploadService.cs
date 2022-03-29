using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Practice.Domain.Core.Stores.File.FileUploadN
{
    public interface IFileUploadService
    {
        Task<byte[]> GetFile(string fileName);
        Task<string> UploadFile(IFormFile fileUpload);
        void DeleteFile(string fileName);
        Task<string> GetAttorney();
        Task UpdateAttorney(string newAttorney);
        string GetMimeType(string fileName);
    }
}
