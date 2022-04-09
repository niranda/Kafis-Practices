using Practice.Domain.Core.Entities.Base;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Practice.Domain.Core.Entities
{
    public class Manager : BaseEntity
    {
        public Guid UserId { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string FullName { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Company { get; set; }
        public Guid OrganizationId { get; set; }
        public User User { get; set; }
        public Organization Organization { get; set; }
    }
}
