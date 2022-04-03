using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice.Domain.Core.Entities
{
    public class Run : BaseEntity
    {
        public AcademicYear AcademicYear { get; set; }
        [Required]
        public GradeLevelEnum GradeLevel { get; set; }
    }
}
