using AutoMapper;
using Practice.Application.DTOs.Practice;
using Practice.Application.Services.Time;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.Practice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Practice.Application.Services.PracticeDatesN
{
    public class PracticeDatesService : IPracticeDatesService
    {
        private readonly ITimeService timeService;
        private readonly IPracticeDatesRepository practiceDatesRepository;
        private readonly IMapper mapper;

        public PracticeDatesService(ITimeService timeService, IPracticeDatesRepository practiceDatesRepository, IMapper mapper)
        {
            this.timeService = timeService;
            this.practiceDatesRepository = practiceDatesRepository;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<PracticeDatesDTO>> GetPracticeDates()
        {
            return mapper.Map<IEnumerable<PracticeDatesDTO>>(await practiceDatesRepository.GetAll());
        }

        public async Task<IEnumerable<PracticeDatesDTO>> UpdatePracticeDates(IEnumerable<PracticeDatesDTO> practiceDates, string timezoneOffset)
        {
            if (practiceDates == null)
                throw new ArgumentNullException(nameof(practiceDates));

            practiceDates.ToList().ForEach(dates =>
            {
                dates.StartDate = timeService.GetUTCDate(dates.StartDate.Value, timezoneOffset);
                dates.EndDate = timeService.GetUTCDate(dates.EndDate.Value, timezoneOffset);
            });

            var updatedPracticeDates = mapper.Map<IEnumerable<PracticeDatesDTO>>(
                await practiceDatesRepository.UpdateAll(mapper.Map<IEnumerable<PracticeDates>>(practiceDates)));

            return updatedPracticeDates;
        }
    }
}
