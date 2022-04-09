using System.Threading.Tasks;

namespace Practice.Domain.Core.Stores.Mail
{
    public interface IMailSendService
    {
        public Task SendEmailAsync(string email, string subject, string message);
    }
}
