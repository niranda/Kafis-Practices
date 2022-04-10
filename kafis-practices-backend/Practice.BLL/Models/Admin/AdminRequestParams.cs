using Practice.Domain.Core.Common.Enums;

namespace Practice.Application.Models.Admin
{
    public class AdminRequestParams
    {
        public int StartDate { get; set; }
        public int EndDate { get; set; }
        public GradeLevelEnum GradeLevel { get; set; }
        public string Specialty { get; set; }
    }
}
