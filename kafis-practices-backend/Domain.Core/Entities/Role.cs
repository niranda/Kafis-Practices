using Microsoft.AspNetCore.Identity;
using System;

namespace Practice.Domain.Core.Entities
{
    public class Role : IdentityRole<Guid>
    {
        public Role(string name)
        {
            Name = name;
        }
    }
}
