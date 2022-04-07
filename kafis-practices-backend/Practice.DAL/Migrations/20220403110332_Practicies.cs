using Microsoft.EntityFrameworkCore.Migrations;

namespace Practice.Infrastructure.Migrations
{
    public partial class Practicies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"INSERT INTO PracticeDates(Id,StartDate, EndDate, GradeLevel, CreatedOn, ModifiedOn, IsDeleted) VALUES
            ('7dc698f2-6a5e-4388-a0de-dd6cbc9968e2', '2021-05-10', '2021-05-21', 1, NOW(), NOW(), 0)");
            migrationBuilder.Sql(@"INSERT INTO PracticeDates(Id, StartDate, EndDate, GradeLevel, CreatedOn, ModifiedOn, IsDeleted) VALUES
            ('aa131e71-691d-4933-b634-444ffdc94769', '2021-05-10', '2021-05-21', 2, NOW(), NOW(), 0)");
            migrationBuilder.Sql(@"INSERT INTO PracticeDates(Id, StartDate, EndDate, GradeLevel, CreatedOn, ModifiedOn, IsDeleted) VALUES
            ('130e3846-cf60-4fc2-9029-be43524a9145', '2021-12-06', '2021-12-31', 3, NOW(), NOW(), 0)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DELETE FROM PracticeDates WHERE Id=1");
            migrationBuilder.Sql(@"DELETE FROM PracticeDates WHERE Id=2");
            migrationBuilder.Sql(@"DELETE FROM PracticeDates WHERE Id=3");
        }
    }
}
