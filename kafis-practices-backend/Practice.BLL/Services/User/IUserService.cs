using System;
using System.Threading.Tasks;

namespace Practice.Application.Services.UserN
{
    public interface IUserService
    {
        Task<Guid> CreateUser(string role);
    }
}
