using MailKit.Net.Smtp;
using MimeKit;
using Practice.Domain.Core.Stores.Mail;
using Practice.MailServices.Settings;
using System.Threading.Tasks;

namespace Practice.MailServices.Services
{
    public class MailSendService : IMailSendService
    {

        private readonly MailSettings _settings;

        public MailSendService(MailSettings settings)
        {
            _settings = settings;
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Администрация HNEU Practice", _settings.MailName));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Plain)
            {
                Text = message
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 25, false);
                await client.AuthenticateAsync(_settings.MailName, _settings.MailPassword);
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }
    }
}
