using System;

namespace Practice.Application.DTOs.Base
{
    public class BaseDTO
    {
        public Guid Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
