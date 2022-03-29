using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Stores.UserN;
using Practice.Infrastructure.Context;
using System;
using System.Threading.Tasks;

namespace Practice.Infrastructure.Stores
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationContext context;
        private readonly RoleManager<IdentityRole<Guid>> roleManager;

        public UserRepository(ApplicationContext context,
                              RoleManager<IdentityRole<Guid>> roleManager)
        {
            this.context = context;
            this.roleManager = roleManager;
        }
        public async Task<User> FindByUserName(string username) => await context.Users.AsNoTracking().Include(u => u.Role).SingleOrDefaultAsync(u => u.UserName == username);

        public async Task<Guid> Create(User user)
        {
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return user.Id;
        }

        public async Task<User> Get(Guid id)
        {
            return await context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Guid> GetRoleId(string role)
        {
            var userRole = await roleManager.FindByNameAsync(role);
            return userRole.Id;
        }
    }
}
