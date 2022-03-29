using Practice.Domain.Core.Common.Exceptions.Base;
using System;

namespace Practice.Domain.Core.Common.Exceptions
{
    public class OrganizationNotFoundException : CustomException
    {
        private const string ExceptionMessage = "Organization could not be found.";

        public OrganizationNotFoundException()
           : base(ExceptionMessage) { }

        public OrganizationNotFoundException(string message)
            : base(message) { }

        public OrganizationNotFoundException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
