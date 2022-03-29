using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Domain.Core.Stores.Practice
{
    public interface IPracticeDatesRepository
    {
        Task<PracticeDates> GetByGradeLevel(GradeLevelEnum gradeLevel);
        Task<IEnumerable<PracticeDates>> GetAll();
        Task<IEnumerable<PracticeDates>> UpdateAll(IEnumerable<PracticeDates> practiceDates);
    }
}
