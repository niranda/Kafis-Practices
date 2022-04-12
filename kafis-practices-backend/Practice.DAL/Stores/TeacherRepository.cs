using Microsoft.EntityFrameworkCore;
using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.TeacherN;
using Practice.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Practice.Infrastructure.Stores
{
    public class TeacherRepository : ITeacherRepository
    {
        private readonly ApplicationContext context;
        public TeacherRepository(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task<Teacher> GetById(Guid id, bool asNoTracking = true)
        {
            if (asNoTracking)
            {
                return await context.Teachers.AsNoTracking().Include(t => t.Students.Where(s => !s.IsDeleted)).SingleOrDefaultAsync(s => s.Id == id);
            }
            return await context.Teachers.Include(t => t.Students.Where(s => !s.IsDeleted)).SingleOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Teacher> GetByUserId(Guid userId)
        {
            return await context.Teachers.AsNoTracking()
                .Include(t => t.Students.Where(s => !s.IsDeleted))
                .ThenInclude(s => s.Organization)
                .Where(t => t.UserId == userId)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Teacher>> GetAll(int startDate, int endDate, GradeLevelEnum gradeLevel)
        {
            return await context.Teachers
                .AsNoTracking()
                .Include(t => t.Students.Where(s => !s.IsDeleted))
                .Include(t => t.User)
                .Include(t => t.PracticeDates)
                .Where(t => t.PracticeDates.StartDate.Value.Year == startDate &&
                            t.PracticeDates.EndDate.Value.Year == endDate &&
                            t.PracticeDates.GradeLevel == gradeLevel &&
                            !t.IsDeleted)
                .OrderByDescending(t => t.Students.Count())
                .ToListAsync();
        }

        public async Task<IEnumerable<Teacher>> GetAllWithCredentials(int startDate, int endDate, GradeLevelEnum gradeLevel)
        {
            return await context.Teachers
                .AsNoTracking()
                .Include(t => t.User)
                .Include(t => t.PracticeDates)
                .Where(t => t.PracticeDates.StartDate.Value.Year == startDate &&
                            t.PracticeDates.EndDate.Value.Year == endDate &&
                            t.PracticeDates.GradeLevel == gradeLevel &&
                            !t.IsDeleted)
                .ToListAsync();
        }

        public async Task<Teacher> Create(Teacher teacher)
        {
            await context.Teachers.AddAsync(teacher);
            await context.SaveChangesAsync();
            return teacher;
        }

        public async Task<Teacher> Update(Teacher teacher)
        {
            context.Update(teacher);
            await context.SaveChangesAsync();
            return teacher;
        }

        public async Task<bool> Delete(Teacher teacher)
        {
            var students = await context.Students.Where(s => s.TeacherId == teacher.Id && !s.IsDeleted).ToListAsync();
            students.ForEach(s => s.TeacherId = null);
            teacher.IsDeleted = true;

            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == teacher.UserId);
            context.Users.Remove(user);

            await context.SaveChangesAsync();
            return true;
        }
    }
}
