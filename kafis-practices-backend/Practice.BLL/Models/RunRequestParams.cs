using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Models;

namespace Practice.Application.Models
{
    public class RunRequestParams : SortParams
    {
        public int StartDate { get; set; }
        public int EndDate { get; set; }
        public GradeLevelEnum GradeLevel { get; set; }
    }
}
