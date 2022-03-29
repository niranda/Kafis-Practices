using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities.Base;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Practice.Domain.Core.Entities
{
    public class Student : BaseEntity
    {
        private int _year;
        private int? _grade;

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string FullName { get; set; }
        [Required]
        [Range(1, 6)]
        public int Year
        {
            get
            {
                return _year;
            }
            set
            {
                if (value != 2 && value != 4)
                {
                    throw new ArgumentOutOfRangeException();
                }
                _year = value;
            }
        }
        [Required]
        public GradeLevelEnum GradeLevel { get; set; }
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
        public int? Grade
        {
            get
            {
                return _grade;
            }
            set
            {
                if (value > 100)
                {
                    throw new ArgumentOutOfRangeException();
                }
                _grade = value;
            }
        }
        public string ReportFileName { get; set; }

        public int? TeacherId { get; set; }
        public int? OrganizationId { get; set; }
        public Guid? UserId { get; set; }
        public int? PracticeDatesId { get; set; }

        public User User { get; set; }
        public Teacher Teacher { get; set; }
        public Organization Organization { get; set; }
        public PracticeDates PracticeDates { get; set; }
    }
}
