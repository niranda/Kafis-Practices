using Microsoft.Extensions.DependencyInjection;
using Practice.Application.Services.Auth;
using Practice.Application.Services.Document;
using Practice.Application.Services.OrganizationN;
using Practice.Application.Services.PracticeDatesN;
using Practice.Application.Services.StudentN;
using Practice.Application.Services.TeacherN;
using Practice.Application.Services.Time;
using Practice.Application.Services.Token;
using Practice.Application.Services.UserN;
using Practice.Domain.Core.Stores;
using Practice.Domain.Core.Stores.File.FileUploadN;
using Practice.Domain.Core.Stores.OrganizationN;
using Practice.Domain.Core.Stores.Practice;
using Practice.Domain.Core.Stores.StudentN;
using Practice.Domain.Core.Stores.TeacherN;
using Practice.Domain.Core.Stores.UserN;
using Practice.Infrastructure.Context;
using Practice.Infrastructure.Stores;
using Practice.UtilityServices.Services;
using Practice.WebAPI.Filters;

namespace Practice.WebAPI.Configs
{
    public static class DIConfig
    {
        public static void RegisterInjections(this IServiceCollection services)
        {
            services.AddTransient<IApplicationContext, ApplicationContext>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IStudentService, StudentService>();
            services.AddTransient<ITeacherService, TeacherService>();
            services.AddTransient<IOrganizationService, OrganizationService>();
            services.AddTransient<ITokenService, TokenService>();
            services.AddScoped<IFileUploadService, FileUploadService>();
            services.AddTransient<IPracticeDatesService, PracticeDatesService>();
            services.AddTransient<IDocumentService, DocumentService>();
            services.AddTransient<ITimeService, TimeService>();


            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IStudentRepository, StudentRepository>();
            services.AddTransient<ITeacherRepository, TeacherRepository>();
            services.AddTransient<IOrganizationRepository, OrganizationRepository>();
            services.AddTransient<IPracticeDatesRepository, PracticeDatesRepository>();

            services.AddTransient<CustomExceptionFilterAttribute>();
        }
    }
}
