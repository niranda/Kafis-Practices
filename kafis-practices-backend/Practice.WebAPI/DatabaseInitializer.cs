using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using Practice.Application.Services.Encryption;
using Practice.Application.Settings;
using Practice.Domain.Core.Common.Constants;
using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Entities;
using Practice.Infrastructure.Context;
using System;
using System.Threading.Tasks;

namespace Practice.WebAPI
{
    public static class DatabaseInitializer
    {
        public static async Task Initialize(IServiceProvider services)
        {
            var context = services.GetRequiredService<ApplicationContext>();

            var dbCreator = context.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;

            var isFirstLaunch = !dbCreator.Exists();

            if (isFirstLaunch)
            {
                dbCreator.Create();
                context.Database.Migrate();
                await AddInitialData(services);
                context.SaveChanges();
            }
        }

        public static async Task AddInitialData(IServiceProvider services)
        {
            try
            {
                var userManager = services.GetRequiredService<UserManager<User>>();
                var rolesManager = services.GetRequiredService<RoleManager<Role>>();
                var context = services.GetRequiredService<ApplicationContext>();
                var settings = services.GetRequiredService<EncryptionSettings>();
                await EnsureUserCreated(userManager, rolesManager, context, settings);
            }
            catch (Exception)
            {
            }
        }

        private static async Task EnsureUserCreated(UserManager<User> userManager, RoleManager<Role> roleManager, ApplicationContext context, EncryptionSettings settings)
        {
            string adminUserName = "BigDaddy";
            string adminPassword = EncryptionService.EncryptString("Aa123456", settings.Key);

            string teacherUserName = "SmallerDaddy";
            string teacherPassword = EncryptionService.EncryptString("Bb123456", settings.Key);

            string studentUserName = "SmallestDaddy";
            string studentPassword = EncryptionService.EncryptString("Cc123456", settings.Key);

            if (await roleManager.FindByNameAsync(RoleNameConstants.Admin) == null)
            {
                await roleManager.CreateAsync(new Role(RoleNameConstants.Admin));
            }

            if (await roleManager.FindByNameAsync(RoleNameConstants.Teacher) == null)
            {
                await roleManager.CreateAsync(new Role(RoleNameConstants.Teacher));
            }

            if (await roleManager.FindByNameAsync(RoleNameConstants.Student) == null)
            {
                await roleManager.CreateAsync(new Role(RoleNameConstants.Student));
            }

            if (await userManager.FindByEmailAsync(adminUserName) == null)
            {
                var superAdminRole = await roleManager.Roles.FirstAsync(role => role.Name == RoleNameConstants.Admin);

                User superAdmin = new User(adminUserName, superAdminRole);

                IdentityResult result = await userManager.CreateAsync(superAdmin);

                superAdmin.PasswordHash = adminPassword;

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(superAdmin, RoleNameConstants.Admin);
                }
            }

            if (await userManager.FindByEmailAsync(teacherUserName) == null)
            {
                var superTeacherRole = await roleManager.Roles.FirstAsync(role => role.Name == RoleNameConstants.Teacher);

                User superTeacher = new User(teacherUserName, superTeacherRole);

                IdentityResult result = await userManager.CreateAsync(superTeacher);

                superTeacher.PasswordHash = teacherPassword;

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(superTeacher, RoleNameConstants.Teacher);
                }

                await context.Teachers.AddAsync(new Teacher { Id = Guid.NewGuid(), FullName = superTeacher.UserName, Position = "Mega", UserId = superTeacher.Id, PracticeDates = new PracticeDates { GradeLevel = GradeLevelEnum.FirstFull, StartDate = DateTime.Parse("2021-02-02"), EndDate = DateTime.Parse("2022.12.12") } });
                await context.SaveChangesAsync();
            }

            if (await userManager.FindByEmailAsync(studentUserName) == null)
            {
                var superStudentRole = await roleManager.Roles.FirstAsync(role => role.Name == RoleNameConstants.Student);

                User superStudent = new User(studentUserName, superStudentRole);

                IdentityResult result = await userManager.CreateAsync(superStudent);

                superStudent.PasswordHash = studentPassword;

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(superStudent, RoleNameConstants.Student);
                }

                context.Students.Add(new Student { Id = Guid.NewGuid(), FullName = superStudent.UserName, Specialty = "121", Specialization = "2", GroupCode = "121.02.010.4.2", UserId = superStudent.Id, PracticeDates = new PracticeDates { GradeLevel = GradeLevelEnum.FirstFull, StartDate = DateTime.Parse("2021-01-01"), EndDate = DateTime.Parse("2022.12.12") } });
                await context.SaveChangesAsync();
            }
        }
    }
}
