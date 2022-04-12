using Practice.Domain.Core.Entities.Base;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Practice.Domain.Core.Entities
{
    public class Student : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string FullName { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Specialty { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Specialization { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(25)")]
        public string GroupCode { get; set; }
        [Range(1, 100)]
        public int? Grade { get; set; }
        public string ReportFileName { get; set; }

        public Guid? TeacherId { get; set; }
        public Guid? OrganizationId { get; set; }
        public Guid UserId { get; set; }
        public Guid? PracticeDatesId { get; set; }

        public User User { get; set; }
        public Teacher Teacher { get; set; }
        public Organization Organization { get; set; }
        public PracticeDates PracticeDates { get; set; }
    }
}
