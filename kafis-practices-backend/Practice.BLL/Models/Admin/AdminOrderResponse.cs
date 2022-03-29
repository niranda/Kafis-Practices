using Practice.Application.DTOs.User.Student;
using Practice.Domain.Core.Common.Enums;
using System;
using System.Collections.Generic;

namespace Practice.Application.Models.Admin
{
    public class AdminOrderResponse
    {
        public int Year { get; set; }
        public GradeLevelEnum GradeLevel { get; set; }
        public string Specialty { get; set; }
        public string Specialization { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public IEnumerable<StudentOrderDTO> StudentOrders { get; set; }
    }
}
