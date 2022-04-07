using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace Practice.Domain.Core.Entities
{
    public class AcademicYear : BaseEntity
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
