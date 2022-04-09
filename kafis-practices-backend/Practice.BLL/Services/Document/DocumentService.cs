using AutoMapper;
using Practice.Application.DTOs.User.Student;
using Practice.Application.Models.Admin;
using Practice.Application.Models.StudentN;
using Practice.Domain.Core.Common.Enums;
using Practice.Domain.Core.Common.Exceptions;
using Practice.Domain.Core.Stores.StudentN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Practice.Application.Services.Document
{
    public class DocumentService : IDocumentService
    {
        private readonly IMapper mapper;
        private readonly IStudentRepository studentRepository;

        public DocumentService(IMapper mapper, IStudentRepository studentRepository)
        {
            this.mapper = mapper;
            this.studentRepository = studentRepository;
        }

        public async Task<AdminReportResponse> GetAdminReport(AdminRequestParams parameters)
        {
            if (parameters == null)
                throw new ArgumentNullException(nameof(parameters));

            var students = (await studentRepository.GetBySearchParams(parameters.Run.AcademicYear, parameters.Run.GradeLevel, parameters.Specialty)).ToList();

            if (students == null || !students.Any())
                throw new StudentNotFoundException();

            var allStudentsAmount = students.Count;
            var organizations = students.Where(s => s.Organization != null).Select(s => s.Organization?.Name).Distinct();
            var organizationsAmount = organizations.Count();
            int successfulStudentsAmount = 0;
            int failedStudentsAmount = 0;

            List<StudentsGradesSummary> summaries = new();
            for (int i = 1; i < 6; i++)
            {
                var summary = new StudentsGradesSummary((GradeLetter)i);
                summaries.Add(summary);
            }

            students.ForEach(s =>
            {
                switch (s.Grade)
                {
                    case >= 90:
                        summaries.Single(s => s.GradeLetter == GradeLetter.A).Amount++;
                        successfulStudentsAmount++;
                        break;
                    case >= 82:
                        summaries.Single(s => s.GradeLetter == GradeLetter.B).Amount++;
                        successfulStudentsAmount++;
                        break;
                    case >= 74:
                        summaries.Single(s => s.GradeLetter == GradeLetter.C).Amount++;
                        successfulStudentsAmount++;
                        break;
                    case >= 64:
                        summaries.Single(s => s.GradeLetter == GradeLetter.D).Amount++;
                        successfulStudentsAmount++;
                        break;
                    case >= 60:
                        summaries.Single(s => s.GradeLetter == GradeLetter.E).Amount++;
                        successfulStudentsAmount++;
                        break;
                    default:
                        failedStudentsAmount++;
                        break;
                }
            });

            summaries.ForEach(s =>
            {
                if (s.Amount > 0)
                    s.Percent = Math.Round((double)s.Amount / (double)successfulStudentsAmount * 100, 1);
            });

            return new AdminReportResponse
            {
                GradeLevel = parameters.Run.GradeLevel,
                AcademicYear = parameters.Run.AcademicYear,
                AllStudentsAmount = allStudentsAmount,
                SuccessfulStudentsAmount = successfulStudentsAmount,
                FailedStudentsAmount = failedStudentsAmount,
                OrganizationsAmount = organizationsAmount,
                OrganizationsNames = organizations,
                StudentsGradesSummary = summaries
            };
        }
        public IEnumerable<AdminOrderResponse> GetAdminOrder(AdminRequestParams parameters)
        {
            var students = studentRepository.GetStudentsForOrder(parameters.Run.DegreeLevel, parameters.Specialty, parameters.Run.AcademicYear);

            if (students == null || !students.Any())
                throw new StudentNotFoundException();

            var groupedStudentOrders = students.AsEnumerable().GroupBy(s => new { s.Run.GradeLevel, s.Organization.Name }, (key, group) =>
                new StudentOrder { GradeLevel = key.GradeLevel, OrganizationName = key.Name, Students = group.ToList() })
                    .GroupBy(s => new { s.GradeLevel }, (key, group) => new GroupedStudentOrder { GradeLevel = key.GradeLevel, StudentOrders = group.ToList() }).ToList();

            List<AdminOrderResponse> response = new();

            groupedStudentOrders.ForEach(g =>
            {
                AdminOrderResponse adminOrder = new AdminOrderResponse
                {
                    GradeLevel = g.GradeLevel,
                    Specialty = g.StudentOrders.First().Students.First().Specialty,
                    Year = g.StudentOrders.First().Students.First().Year,
                    Specialization = g.StudentOrders.First().Students.First().Specialization,
                    StartDate = g.StudentOrders.First().Students.First().PracticeDates.StartDate,
                    EndDate = g.StudentOrders.First().Students.First().PracticeDates.EndDate,
                    StudentOrders = mapper.Map<IEnumerable<StudentOrderDTO>>(g.StudentOrders)
                };
                response.Add(adminOrder);
            });
            return response;
        }
    }
}
