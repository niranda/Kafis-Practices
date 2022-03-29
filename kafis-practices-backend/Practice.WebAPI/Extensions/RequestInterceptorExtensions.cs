using Microsoft.AspNetCore.Builder;
using Practice.WebAPI.Middleware;

namespace Practice.WebAPI.Extensions
{
    public static class RequestInterceptorExtensions
    {
        public static IApplicationBuilder AddMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<RequestInterceptor>();
        }
    }
}
