using Practice.Application.DTOs.Practice;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Application.Services.PracticeDatesN
{
    public interface IPracticeDatesService
    {
        Task<IEnumerable<PracticeDatesDTO>> GetPracticeDates();
        Task<IEnumerable<PracticeDatesDTO>> UpdatePracticeDates(IEnumerable<PracticeDatesDTO> practiceDates, string timezoneOffset);
    }
}
