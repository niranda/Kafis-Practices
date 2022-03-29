using System.Collections.Generic;

namespace Practice.Application.DTOs.User.Student
{
    public class StudentOrderDTO
    {
        public string OrganizationName { get; set; }
        public IEnumerable<StudentTeacherOnlyDTO> Students { get; set; }
    }
}
