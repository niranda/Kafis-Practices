using Practice.Application.Models.StudentN;
using Practice.Domain.Core.Common.Enums;
using System.Collections.Generic;

namespace Practice.Application.Models.Admin
{
    public class AdminReportResponse
    {
        public int Year { get; set; }
        public GradeLevelEnum GradeLevel { get; set; }
        public string Specialty { get; set; }

        public int OrganizationsAmount { get; set; }
        public IEnumerable<string> OrganizationsNames { get; set; }

        public int AllStudentsAmount { get; set; }
        public int SuccessfulStudentsAmount { get; set; }
        public int FailedStudentsAmount { get; set; }
        public IEnumerable<StudentsGradesSummary> StudentsGradesSummary { get; set; }
    }
}
