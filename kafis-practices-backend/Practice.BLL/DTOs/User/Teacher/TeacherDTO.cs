using Practice.Application.DTOs.Base;
using Practice.Application.DTOs.Run;
using Practice.Application.DTOs.User.Student;
using System;
using System.Collections.Generic;

namespace Practice.Application.DTOs.User.Teacher
{
    public class TeacherDTO : BaseDTO
    {
        public string FullName { get; set; }
        public string Position { get; set; }
        public Guid? UserId { get; set; }

        public IEnumerable<RunDTO> Runs { get; set; }
        public IEnumerable<StudentDTO> Students { get; set; }
    }
}
