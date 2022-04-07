using Practice.Application.DTOs.Academic;
using Practice.Application.DTOs.Base;
using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice.Application.DTOs.Run
{
    public class RunDTO : BaseDTO
    {
        public AcademicYearDTO AcademicYear { get; set; }
        public GradeLevelEnum GradeLevel { get; set; }
    }
}
