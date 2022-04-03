using Practice.Domain.Core.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice.Application.Models.StudentN
{
    public class StudentFilterRequestParams
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public GradeLevelEnum GradeLevel { get; set; }
    }
}
