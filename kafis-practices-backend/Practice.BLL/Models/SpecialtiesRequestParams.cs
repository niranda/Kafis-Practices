using Practice.Domain.Core.Common.Enums;

namespace Practice.Application.Models
{
    public class SpecialtiesRequestParams
    {
        public int Year { get; set; }
        public GradeLevelEnum GradeLevel { get; set; }
    }
}
