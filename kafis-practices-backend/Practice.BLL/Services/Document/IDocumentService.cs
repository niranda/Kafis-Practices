using Practice.Application.Models.Admin;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Practice.Application.Services.Document
{
    public interface IDocumentService
    {
        Task<AdminReportResponse> GetAdminReport(AdminReportRequestParams parameters);
        IEnumerable<AdminOrderResponse> GetAdminOrder(AdminOrderRequestParams parameters);
    }
}
