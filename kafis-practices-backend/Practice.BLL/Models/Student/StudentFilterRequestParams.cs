using Practice.Domain.Core.Common.Enums;
using System;

namespace Practice.Application.Models.StudentN
{
    public class StudentFilterRequestParams
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public GradeLevelEnum GradeLevel { get; set; }
    }
}
