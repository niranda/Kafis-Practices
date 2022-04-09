using Practice.Domain.Core.Common.Enums;

namespace Practice.Domain.Models
{
    public class SortParams
    {
        public SortDirection? SortDirection { get; set; }
        public string SortBy { get; set; }
    }
}
