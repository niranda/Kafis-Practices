using Practice.Domain.Core.Common.Enums;

namespace Practice.Application.Models.Admin
{
    public class AdminOrderRequestParams
    {
        public DegreeLevelEnum DegreeLevel { get; set; }
        public string Specialty { get; set; }
    }
}
