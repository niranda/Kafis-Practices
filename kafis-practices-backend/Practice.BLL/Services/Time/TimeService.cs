using System;
using System.Text.RegularExpressions;

namespace Practice.Application.Services.Time
{
    public class TimeService : ITimeService
    {
        public DateTime GetUTCDate(DateTime date, string timezoneOffset)
        {
            if (timezoneOffset == null)
                throw new ArgumentNullException(nameof(timezoneOffset));
            if (!Regex.IsMatch(timezoneOffset, @"^[+-]\d{2}:\d{2}$"))
                throw new FormatException();

            TimeSpan offset;
            if (timezoneOffset.StartsWith('-'))
                offset = -TimeSpan.ParseExact(timezoneOffset, @"\-h\:m", null);
            else
                offset = TimeSpan.ParseExact(timezoneOffset, @"\+h\:m", null);

            return date + offset;
        }
    }
}
