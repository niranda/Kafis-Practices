using Microsoft.EntityFrameworkCore;
using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.StudentN;
using Practice.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Practice.Infrastructure.Stores
{
    public class StudentRepository : IStudentRepository
    {
        private readonly ApplicationContext context;
        public StudentRepository(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task<Student> GetById(int id, bool asNoTracking = true)
        {
            if (asNoTracking)
            {
                return await context.Students.AsNoTracking().Include(s => s.Teacher).Include(s => s.Organization).Include(s => s.PracticeDates).SingleOrDefaultAsync(s => s.Id == id);
            }
            return await context.Students.Include(s => s.Teacher).Include(s => s.Organization).Include(s => s.PracticeDates).SingleOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Student> GetByUserId(string userId)
        {
            return await context.Students.AsNoTracking().Include(s => s.Teacher).Include(s => s.Organization).Include(s => s.PracticeDates).Where(s => s.UserId == new Guid(userId)).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Student>> GetAll()
        {
            return await context.Students.AsNoTracking().Include(s => s.Teacher).Include(s => s.Organization)
                                         .Include(s => s.PracticeDates).Where(s => !s.IsDeleted).ToListAsync();
        }

        public async Task<IEnumerable<Student>> GetAllWithCredentials()
        {
            return await context.Students.AsNoTracking().Include(s => s.User).Where(s => !s.IsDeleted).ToListAsync();
        }

        public async Task<IEnumerable<Student>> GetBySearchParams(int year, GradeLevelEnum gradeLevel, string specialty)
        {
            return await context.Students.AsNoTracking().Include(s => s.Organization)
                .Where(s => s.Year == year && s.GradeLevel == gradeLevel && s.Specialty == specialty && !s.IsDeleted).ToListAsync();
        }

        public IQueryable<Student> GetStudentsForOrder(DegreeLevelEnum degreeLevel, string specialty)
        {
            if (degreeLevel == DegreeLevelEnum.Bachelor)
                return context.Students.AsNoTracking().Include(s => s.Organization).Include(s => s.Teacher).Include(s => s.PracticeDates)
                .Where(s => (s.GradeLevel == GradeLevelEnum.FirstFull || s.GradeLevel == GradeLevelEnum.FirstReduced)
                    && s.Specialty == specialty && s.Organization != null && !s.IsDeleted);
            else
                return context.Students.AsNoTracking().Include(s => s.Organization).Include(s => s.Teacher).Include(s => s.PracticeDates)
                .Where(s => s.GradeLevel == GradeLevelEnum.Second && s.Specialty == specialty && s.Organization != null && !s.IsDeleted);
        }

        public async Task<IEnumerable<string>> GetAllSpecialtiesByYearAndGradeLevel(int year, GradeLevelEnum gradeLevel)
        {
            return await context.Students.AsNoTracking().Where(s => s.Year == year && s.GradeLevel == gradeLevel && !s.IsDeleted)
                .Select(s => s.Specialty).Distinct().ToListAsync();
        }

        public async Task<IEnumerable<string>> GetSpecialtiesByDegreeLevel(DegreeLevelEnum degreeLevel)
        {
            if (degreeLevel == DegreeLevelEnum.Bachelor)
                return await context.Students.AsNoTracking().Where(s =>
                    (s.GradeLevel == GradeLevelEnum.FirstFull || s.GradeLevel == GradeLevelEnum.FirstReduced) && !s.IsDeleted)
                        .Select(s => s.Specialty).Distinct().ToListAsync();
            else
                return await context.Students.AsNoTracking().Where(s => s.GradeLevel == GradeLevelEnum.Second && !s.IsDeleted)
                    .Select(s => s.Specialty).Distinct().ToListAsync();
        }

        public async Task<Student> Create(Student student)
        {
            await context.Students.AddAsync(student);
            await context.SaveChangesAsync();
            return student;
        }

        public async Task<Student> Update(Student student)
        {
            context.Update(student);
            await context.SaveChangesAsync();
            return student;
        }

        public async Task<bool> Delete(Student student)
        {
            student.IsDeleted = true;

            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == student.UserId);
            context.Users.Remove(user);

            await context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAll()
        {
            var students = await context.Students.Where(s => !s.IsDeleted).ToListAsync();
            List<User> users = new List<User>();

            students.ForEach(s =>
            {
                s.IsDeleted = true;
                users.Add(context.Users.FirstOrDefault(u => u.Id == s.UserId));
            });
            context.Users.RemoveRange(users);

            await context.SaveChangesAsync();
            return true;
        }
    }
}
