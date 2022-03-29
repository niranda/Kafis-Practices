using Microsoft.EntityFrameworkCore.Migrations;

namespace Practice.Infrastructure.Migrations
{
    public partial class InsertEmptyPracticeDates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"INSERT INTO PracticeDates(StartDate, EndDate, GradeLevel, CreatedOn, ModifiedOn, IsDeleted) VALUES
            ('2021-05-10', '2021-05-21', 1, NOW(), NOW(), 0)");
            migrationBuilder.Sql(@"INSERT INTO PracticeDates(StartDate, EndDate, GradeLevel, CreatedOn, ModifiedOn, IsDeleted) VALUES
            ('2021-05-10', '2021-05-21', 2, NOW(), NOW(), 0)");
            migrationBuilder.Sql(@"INSERT INTO PracticeDates(StartDate, EndDate, GradeLevel, CreatedOn, ModifiedOn, IsDeleted) VALUES
            ('2021-12-06', '2021-12-31', 3, NOW(), NOW(), 0)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DELETE FROM PracticeDates WHERE Id=1");
            migrationBuilder.Sql(@"DELETE FROM PracticeDates WHERE Id=2");
            migrationBuilder.Sql(@"DELETE FROM PracticeDates WHERE Id=3");
        }
    }
}
