using Microsoft.AspNetCore.Identity;
using System;

namespace Practice.Domain.Core.Entities
{
    public class User : IdentityUser<Guid>
    {
        public Guid RoleId { get; set; }

        public IdentityRole<Guid> Role { get; set; }
    }
}
