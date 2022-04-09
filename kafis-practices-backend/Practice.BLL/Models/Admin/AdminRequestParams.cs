using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;

namespace Practice.Application.Models.Admin
{
    public class AdminRequestParams
    {
       public Run Run { get; set; }
       public string Specialty { get; set; }
    }
}
