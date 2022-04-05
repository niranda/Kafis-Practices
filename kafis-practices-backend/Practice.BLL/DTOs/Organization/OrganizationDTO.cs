using Practice.Application.DTOs.Base;
using Practice.Application.DTOs.User.Student;
using System.Collections.Generic;

namespace Practice.Application.DTOs.Organization
{
    public class OrganizationDTO : BaseDTO
    {
        public string Name { get; set; }
        public string City { get; set; }

        public IEnumerable<StudentDTO> Students { get; set; }
    }
}
