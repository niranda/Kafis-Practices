using Practice.Domain.Core.Entities;
using System;
using System.Threading.Tasks;

namespace Practice.Domain.Core.Stores.UserN
{
    public interface IUserRepository
    {
        Task<User> FindByUserName(string username);

        Task<Guid> Create(User user);

        Task<User> Get(Guid id);

        Task<Guid> GetRoleId(string role);
    }
}
