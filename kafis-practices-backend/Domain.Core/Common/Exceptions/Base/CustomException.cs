using System;

namespace Practice.Domain.Core.Common.Exceptions.Base
{
    public class CustomException : Exception
    {
        private const string ExceptionMessage = "Bad request.";

        public CustomException()
            : base(ExceptionMessage) { }

        public CustomException(string message)
            : base(message) { }

        public CustomException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
