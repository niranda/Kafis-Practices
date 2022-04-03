using Microsoft.EntityFrameworkCore;
using Practice.Domain.Core.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Practice.Domain.Core.Stores
{
    public interface IApplicationContext
    {
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<PracticeDates> PracticeDates { get; set; }
        public DbSet<Manager> Managers { get; set; }

        int SaveChanges();
        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

    }
}
