using Practice.Domain.Core.Common.Enums;

namespace Practice.Application.DTOs.Login
{
    public class AuthResultDTO
    {
        public bool IsSuccess { get; set; }
        public string Token { get; set; }
        public ErrorCode? ErrorMessage { get; set; }
    }
}
