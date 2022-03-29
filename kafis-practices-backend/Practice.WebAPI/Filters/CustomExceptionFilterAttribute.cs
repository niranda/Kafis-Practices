using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Practice.Domain.Core.Common.Exceptions.Base;
using System;

namespace Practice.WebAPI.Filters
{
    [AttributeUsage(AttributeTargets.All)]
    public class CustomExceptionFilterAttribute : Attribute, IExceptionFilter, IFilterMetadata
    {
        private readonly ILogger _logger;

        public CustomExceptionFilterAttribute(ILogger<CustomExceptionFilterAttribute> logger)
        {
            _logger = logger;
        }

        public void OnException(ExceptionContext exceptionContext)
        {
            if (!exceptionContext?.ExceptionHandled ?? false && exceptionContext.Exception is CustomException)
            {
                _logger.LogError($"{exceptionContext.Exception.Message} - {exceptionContext.Exception.GetType()}");
                exceptionContext.Result = new BadRequestObjectResult($"{exceptionContext.Exception.Message} - {exceptionContext.Exception.GetType()}");
                exceptionContext.ExceptionHandled = true;
            }
            if (!exceptionContext?.ExceptionHandled ?? false && exceptionContext.Exception is Exception)
            {
                _logger.LogError("Something went wrong with the server.");
                exceptionContext.Result = new BadRequestObjectResult($"{exceptionContext.Exception.Message}");
                exceptionContext.ExceptionHandled = true;
            }
        }
    }
}

