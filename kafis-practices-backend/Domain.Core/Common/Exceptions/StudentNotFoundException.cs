using Practice.Domain.Core.Common.Exceptions.Base;
using System;

namespace Practice.Domain.Core.Common.Exceptions
{
    public class StudentNotFoundException : CustomException
    {
        private const string ExceptionMessage = "Student could not be found.";

        public StudentNotFoundException()
           : base(ExceptionMessage) { }

        public StudentNotFoundException(string message)
            : base(message) { }

        public StudentNotFoundException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
