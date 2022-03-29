using Practice.Domain.Core.Common.Enums;
using System.Collections.Generic;

namespace Practice.Application.Models.StudentN
{
    public class GroupedStudentOrder
    {
        public GradeLevelEnum GradeLevel { get; set; }
        public IEnumerable<StudentOrder> StudentOrders { get; set; }
    }
}
