using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookBridge_backend.Models
{
    public class LibraryContext : IdentityDbContext<User>
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        { }

        // DbSet pour chaque entité du modèle
        public DbSet<Lecteur> Lecteurs { get; set; }
        public DbSet<Bibliothecaire> Bibliothecaires { get; set; }
        public DbSet<Livre> Livres { get; set; }
        public DbSet<Emprunt> Emprunts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // IMPORTANT : Appeler la configuration de la classe parente
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Lecteur>().ToTable("lecteurs");
            modelBuilder.Entity<Bibliothecaire>().ToTable("Biblios");
            modelBuilder.Entity<Emprunt>().ToTable("Emprunts");
            modelBuilder.Entity<Livre>().ToTable("livres");
            // Configuration des relations Lecteur -> Emprunts
            modelBuilder.Entity<Lecteur>()
              .HasMany(l => l.Emprunts)
              .WithOne(e => e.Lecteur)
              .HasForeignKey(e => e.LecteurId)
              .OnDelete(DeleteBehavior.Cascade); // Supprimer les emprunts si un lecteur est supprimé

            // Configuration des relations Livre -> Emprunts
            modelBuilder.Entity<Livre>()
                .HasMany(l => l.Emprunts)
                .WithOne(e => e.Livre)
                .HasForeignKey(e => e.LivreId)
                .OnDelete(DeleteBehavior.Restrict); // Empêcher la suppression d'un livre s'il est emprunté
        }
    }
}