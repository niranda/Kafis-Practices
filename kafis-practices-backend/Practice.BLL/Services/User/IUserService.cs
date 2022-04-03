using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Application.Services.UserN
{
    public interface IUserService
    {
        Task<Guid> CreateUser(string role);
        public Task SendDataOnEmailAddress(IEnumerable<Guid> ids);
    }
}
