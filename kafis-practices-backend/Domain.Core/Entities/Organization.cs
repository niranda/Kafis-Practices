using Practice.Domain.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Practice.Domain.Core.Entities
{
    public class Organization : BaseEntity
    {
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string City { get; set; }
        public Guid ManagerId { get; set; }
        public ICollection<Student> Students { get; set; }

        public Manager Manager { get; set; }
    }
}
