using Practice.Domain.Core.Common.Enums;

namespace Practice.Application.DTOs.Response
{
    public class ResponseDTO
    {
        public bool IsSuccess { get; set; }
        public ErrorCode? ErrorMessage { get; set; }
    }
}
