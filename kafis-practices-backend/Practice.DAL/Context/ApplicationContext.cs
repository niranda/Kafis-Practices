using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Practice.Domain.Core.Entities;
using Practice.Domain.Core.Entities.Base;
using Practice.Domain.Core.Stores;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Practice.Infrastructure.Context
{
    public class ApplicationContext : IdentityDbContext<User, Role, Guid>, IApplicationContext
    {
        public ApplicationContext(DbContextOptions options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<PracticeDates> PracticeDates { get; set; }
        public DbSet<Run> Runs { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseEntity && (
                        e.State == EntityState.Added
                        || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((BaseEntity)entityEntry.Entity).ModifiedOn = DateTime.UtcNow;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedOn = DateTime.UtcNow;
                }
                else
                {
                    entityEntry.Property("CreatedOn").IsModified = false;
                }
            }

            return (await base.SaveChangesAsync(true, cancellationToken));
        }

        public override int SaveChanges()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseEntity && (
                        e.State == EntityState.Added
                        || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((BaseEntity)entityEntry.Entity).ModifiedOn = DateTime.UtcNow;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedOn = DateTime.UtcNow;
                }
                else
                {
                    entityEntry.Property("CreatedOn").IsModified = false;
                }
            }

            return base.SaveChanges(true);
        }
    }
}
