using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Backend.Models
{
    public class Entities : IdentityDbContext<tblUser>
    {
        public Entities()
            : base("Entities")
        {
            Database.SetInitializer<Entities>(new CreateDatabaseIfNotExists<Entities>());

        }

        public DbSet<tblArtist> Artists { get; set; }
        public DbSet<tblUrl> Urls { get; set; }
        public DbSet<tblFile> Files { get; set; }
        public DbSet<tblProfile> Profiles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //Configure domain classes using Fluent API here
            modelBuilder.Entity<tblUser>().
              HasMany(c => c.Artists).
              WithMany(p => p.Users).
              Map(
               m =>
               {
                   m.MapLeftKey("Id");
                   m.MapRightKey("ArtistId");
                   m.ToTable("tblUsers_tblArtist");
               });
            modelBuilder.Entity<tblUser>()
                .HasRequired(lu => lu.Url);
            modelBuilder.Entity<tblArtist>().HasRequired(i => i.Url);
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public static Entities Create()
        {
            return new Entities();
        }
    }
}
