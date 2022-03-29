using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using System.Collections.Generic;

namespace Practice.Application.Models.StudentN
{
    public class StudentOrder
    {
        public GradeLevelEnum GradeLevel { get; set; }
        public string OrganizationName { get; set; }
        public IEnumerable<Student> Students { get; set; }
    }
}
