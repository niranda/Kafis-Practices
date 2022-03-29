using Practice.Application.DTOs.Base;
using Practice.Domain.Core.Common.Enums;
using System;

namespace Practice.Application.DTOs.Practice
{
    public class PracticeDatesDTO : BaseDTO
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public GradeLevelEnum GradeLevel { get; set; }
    }
}
