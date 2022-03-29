using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Practice.Application.Settings;
using Practice.Domain.Core.Entities;
using Practice.Infrastructure.Context;
using Practice.WebAPI.Configs;
using Practice.WebAPI.Converters;
using Practice.WebAPI.Extensions;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace Practice.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.RegisterInjections();
            services.RegisterJwt(Configuration);
            services.RegisterFolders(Configuration);
            services.RegisterEncryption(Configuration);
            services.RegisterClientUrls(Configuration);

            services.AddCors();
            services.AddControllers();

            string mySqlConnectionStr = Configuration.GetConnectionString("LocalConnectionString");
            services.AddDbContext<ApplicationContext>(options =>
            options.UseMySql(mySqlConnectionStr, ServerVersion.AutoDetect(mySqlConnectionStr)));

            services.AddDefaultIdentity<User>().AddRoles<IdentityRole<Guid>>().AddEntityFrameworkStores<ApplicationContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
            });

            services.AddAutoMapper(typeof(MapperProfile).GetTypeInfo().Assembly);

            services.AddControllersWithViews().AddNewtonsoftJson(options =>
                            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddJsonOptions(options =>
               {
                   options.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
                   options.JsonSerializerOptions.Converters.Add(new TimeSpanConverter());

               });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Practice.WebAPI", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the bearer scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {new OpenApiSecurityScheme{Reference = new OpenApiReference
                    {
                        Id = "Bearer",
                        Type = ReferenceType.SecurityScheme
                    }}, new List<string>()}
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Practice.WebAPI v1"));
            }

            app.UseCors(builder =>
            builder.WithOrigins(Configuration.GetSection("ClientUrlsSettings")["Urls"].Split(','))
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowAnyMethod());

            app.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.Strict,
                HttpOnly = HttpOnlyPolicy.None,
                Secure = CookieSecurePolicy.None
            });

            app.ProcessJwt();

            app.UseRouting();

            app.AddMiddleware();

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
