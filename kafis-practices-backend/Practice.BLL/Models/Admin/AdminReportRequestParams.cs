using Practice.Domain.Core.Common.Enums;

namespace Practice.Application.Models.Admin
{
    public class AdminReportRequestParams
    {
        public int Year { get; set; }
        public GradeLevelEnum GradeLevel { get; set; }
    }
}
