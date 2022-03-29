using System;

namespace Practice.Application.Services.Time
{
    public interface ITimeService
    {
        DateTime GetUTCDate(DateTime date, string timezoneOffset);
    }
}
