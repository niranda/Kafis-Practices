using Practice.Domain.Core.Common.Enums;

namespace Practice.Application.Models.StudentN
{
    public class StudentsGradesSummary
    {
        public StudentsGradesSummary(GradeLetter gradeLetter, int amount = 0, double percent = 0)
        {
            GradeLetter = gradeLetter;
            Amount = amount;
            Percent = percent;
        }
        public GradeLetter GradeLetter { get; set; }
        public int Amount { get; set; }
        public double Percent { get; set; }
    }
}
