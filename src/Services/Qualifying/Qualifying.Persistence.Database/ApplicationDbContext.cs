using Microsoft.EntityFrameworkCore;
using Qualifying.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Persistence.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Qualify> Qualify { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.HasDefaultSchema("ChapaTuProfe");
            ModelConfig(builder);
        }

        public void ModelConfig(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().HasNoKey();
            modelBuilder.Entity<Course>().HasNoKey();
            modelBuilder.Entity<Teacher>().HasNoKey();
            modelBuilder.Entity<Qualify>().HasNoKey();
        }
    }
}
