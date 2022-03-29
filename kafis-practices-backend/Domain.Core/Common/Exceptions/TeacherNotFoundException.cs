using Practice.Domain.Core.Common.Exceptions.Base;
using System;

namespace Practice.Domain.Core.Common.Exceptions
{
    public class TeacherNotFoundException : CustomException
    {
        private const string ExceptionMessage = "Teacher could not be found.";

        public TeacherNotFoundException()
           : base(ExceptionMessage) { }

        public TeacherNotFoundException(string message)
            : base(message) { }

        public TeacherNotFoundException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
