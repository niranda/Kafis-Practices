using System;
using System.ComponentModel.DataAnnotations;

namespace Practice.Domain.Core.Entities.Base
{
    public class BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public bool IsDeleted { get; set; }
    }
}
