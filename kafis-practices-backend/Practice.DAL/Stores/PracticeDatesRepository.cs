using Microsoft.EntityFrameworkCore;
using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.Practice;
using Practice.Infrastructure.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Practice.Infrastructure.Stores
{
    public class PracticeDatesRepository : IPracticeDatesRepository
    {
        private readonly ApplicationContext context;
        public PracticeDatesRepository(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task<PracticeDates> GetByGradeLevel(GradeLevelEnum gradeLevel)
        {
            return await context.PracticeDates.AsNoTracking().FirstOrDefaultAsync(p => p.GradeLevel == gradeLevel);
        }

        public async Task<IEnumerable<PracticeDates>> GetAll()
        {
            return await context.PracticeDates.AsNoTracking().Where(p => !p.IsDeleted).ToListAsync();
        }

        public async Task<IEnumerable<PracticeDates>> UpdateAll(IEnumerable<PracticeDates> practiceDates)
        {
            context.UpdateRange(practiceDates);
            await context.SaveChangesAsync();
            return practiceDates;
        }
    }
}
