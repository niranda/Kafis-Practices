using Practice.Domain.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Practice.Domain.Core.Entities
{
    public class Teacher : BaseEntity
    {
        public Guid UserId { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string FullName { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Position { get; set; }

        public User User { get; set; }
        public IEnumerable<Student> Students { get; set; }
    }
}
