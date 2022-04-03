using Practice.Application.DTOs.Base;
using Practice.Domain.Core.Common.Enums;
using System;

namespace Practice.Application.DTOs.Academic
{
    public class AcademicYearDTO
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
