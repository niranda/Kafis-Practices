using Microsoft.EntityFrameworkCore.Migrations;

namespace Practice.Infrastructure.Migrations
{
    public partial class InsertRolesWithAdminUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"INSERT INTO AspNetRoles(Id, Name, NormalizedName, ConcurrencyStamp) VALUES
            (N'740f9f5f-710c-47ed-03ba-08d8d33fcbe0', N'Admin', N'ADMIN', N'2c2f50a8-5c2d-4ea9-a331-9ddabe2055f1')");

            migrationBuilder.Sql(@"INSERT INTO AspNetRoles(Id, Name, NormalizedName, ConcurrencyStamp) VALUES
            (N'94b3ced5-6779-47d0-03bb-08d8d33fcbe0', N'Teacher', N'TEACHER', N'163be606-247a-4d73-847b-4837e27e5897')");

            migrationBuilder.Sql(@"INSERT INTO AspNetRoles(Id, Name, NormalizedName, ConcurrencyStamp) VALUES
            (N'd19fade6-4e99-4e5a-03bc-08d8d33fcbe0', N'Student', N'STUDENT', N'2d22e972-c199-4390-85fd-6b1300a4a2a3')");

            migrationBuilder.Sql(@"INSERT INTO AspNetUsers(Id, RoleId, UserName, NormalizedUserName, Email, NormalizedEmail, EmailConfirmed, PasswordHash, SecurityStamp, ConcurrencyStamp, PhoneNumber, PhoneNumberConfirmed, TwoFactorEnabled, LockoutEnd, LockoutEnabled, AccessFailedCount) VALUES
            (N'c45734f6-0159-4a27-bb2e-08d8d33fe452', N'740f9f5f-710c-47ed-03ba-08d8d33fcbe0', N'admin', N'ADMIN', NULL, NULL, 0, N'tEojVB6kTh4taFRbIXLTs3RUUTBmYtHISB0DAGF0ukY=', N'3442e80a-d2d8-4e00-a236-6191dcd3845f', N'add8c4b4-fa4f-4e69-a570-0c1e52b4c77a', NULL, 0, 0, NULL, 0, 0)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DELETE FROM AspNetUsers WHERE Id=N'740f9f5f-710c-47ed-03ba-08d8d33fcbe0'");
            migrationBuilder.Sql(@"DELETE FROM AspNetRoles WHERE Id=N'94b3ced5-6779-47d0-03bb-08d8d33fcbe0'");
            migrationBuilder.Sql(@"DELETE FROM AspNetRoles WHERE Id=N'd19fade6-4e99-4e5a-03bc-08d8d33fcbe0'");
            migrationBuilder.Sql(@"DELETE FROM AspNetRoles WHERE Id=N'c45734f6-0159-4a27-bb2e-08d8d33fe452'");
        }
    }
}
