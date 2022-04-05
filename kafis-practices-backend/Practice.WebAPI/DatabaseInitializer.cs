using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
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
                await EnsureUserCreated(userManager, rolesManager, context);
            }
            catch (Exception)
            {
            }
        }

        private static async Task EnsureUserCreated(UserManager<User> userManager, RoleManager<Role> roleManager, ApplicationContext context)
        {
            string adminUserName = "BigDaddy";
            string adminPassword = "Aa123456";

            string teacherUserName = "SmallerDaddy";
            string teacherPassword = "Bb123456";

            string studentUserName = "SmallestDaddy";
            string studentPassword = "Cc123456";

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

                IdentityResult result = await userManager.CreateAsync(superAdmin, adminPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(superAdmin, RoleNameConstants.Admin);
                }
            }

            if (await userManager.FindByEmailAsync(teacherUserName) == null)
            {
                var superTeacherRole = await roleManager.Roles.FirstAsync(role => role.Name == RoleNameConstants.Teacher);

                User superTeacher = new User(teacherUserName, superTeacherRole);

                IdentityResult result = await userManager.CreateAsync(superTeacher, teacherPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(superTeacher, RoleNameConstants.Teacher);
                }

                context.Teachers.Add(new Teacher { Id = Guid.NewGuid(), FullName = superTeacher.UserName, Position = "Mega", UserId = superTeacher.Id });
            }

            if (await userManager.FindByEmailAsync(studentUserName) == null)
            {
                var superStudentRole = await roleManager.Roles.FirstAsync(role => role.Name == RoleNameConstants.Student);

                User superStudent = new User(studentUserName, superStudentRole);

                IdentityResult result = await userManager.CreateAsync(superStudent, studentPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(superStudent, RoleNameConstants.Student);
                }

                context.Students.Add(new Student { Id = Guid.NewGuid(), FullName = superStudent.UserName, Year = DateTime.UtcNow.Year, Specialty = "121", Specialization = "2", UserId = superStudent.Id });
            }
        }
    }
}
