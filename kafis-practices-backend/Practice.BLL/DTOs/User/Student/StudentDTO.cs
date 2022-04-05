using Practice.Application.DTOs.Base;
using Practice.Application.DTOs.Organization;
using Practice.Application.DTOs.Practice;
using Practice.Application.DTOs.User.Teacher;
using Practice.Application.DTOs.Academic;
using Practice.Domain.Core.Common.Enums;
using System;
using Practice.Application.DTOs.Run;

namespace Practice.Application.DTOs.User.Student
{
    public class StudentDTO : BaseDTO
    {
        private int _year;
        private int? _grade;

        public string FullName { get; set; }
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
        public string Specialty { get; set; }
        public string Specialization { get; set; }
        public string GroupCode { get; set; }
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

        public Guid? TeacherId { get; set; }
        public Guid? OrganizationId { get; set; }
        public Guid? UserId { get; set; }
        public Guid? PracticeDatesId { get; set; }
        public Guid? RunId { get; set; }


        public TeacherDTO Teacher { get; set; }
        public OrganizationDTO Organization { get; set; }
        public PracticeDatesDTO PracticeDates { get; set; }
        public RunDTO Run { get; set; }
    }
}
