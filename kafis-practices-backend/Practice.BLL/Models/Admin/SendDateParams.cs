using System;
using System.Collections.Generic;

namespace Practice.Application.Models.Admin
{
    public class SendDateParams
    {
        public IEnumerable<Guid> UserIds { get; set; }
    }
}
