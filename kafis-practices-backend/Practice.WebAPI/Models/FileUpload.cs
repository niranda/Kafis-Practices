using Microsoft.AspNetCore.Http;

namespace Practice.WebAPI.Models
{
    public class FileUpload
    {
        public IFormFile File { get; set; }
    }
}
