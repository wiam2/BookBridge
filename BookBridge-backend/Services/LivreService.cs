
using BookBridge_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace BookBridge_backend.Services
{
    public class LivreService
    {
        private readonly LibraryContext _dbContext;

        public LivreService(LibraryContext dbContext) => _dbContext = dbContext;

        // CRUD: Ajouter un livre
        public async Task<Livre> AjouterLivreAsync(Livre livre)
        {
            if (livre == null) throw new ArgumentNullException(nameof(livre));

            _dbContext.Livres.Add(livre);
            await _dbContext.SaveChangesAsync();
            return livre;
        }

        // CRUD: Modifier un livreCo
        public async Task<Livre?> ModifierLivreAsync(int id, Livre livreModifie)
        {
            if (livreModifie == null) throw new ArgumentNullException(nameof(livreModifie));

            var livre = await _dbContext.Livres.FindAsync(id);
            if (livre == null) return null;

            // Mise à jour des propriétés
            livre.Titre = livreModifie.Titre;
            livre.Auteur = livreModifie.Auteur;
            livre.Editeur = livreModifie.Editeur;
            livre.Genre = livreModifie.Genre;
            livre.Annee = livreModifie.Annee;
            livre.NombreCopies = livreModifie.NombreCopies;
            livre.image = livreModifie.image;

            await _dbContext.SaveChangesAsync();
            return livre;
        }

        // CRUD: Supprimer un livre
        public async Task<bool> SupprimerLivreAsync(int id)
        {
            var livre = await _dbContext.Livres.FindAsync(id);
            if (livre == null) return false;

            _dbContext.Livres.Remove(livre);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        // CRUD: Obtenir tous les livres
        public async Task<List<Livre>> ObtenirTousLesLivresAsync()
        {
            return await _dbContext.Livres.ToListAsync();
        }

        // CRUD: Obtenir un livre par ID
        public async Task<Livre?> ObtenirLivreParIdAsync(int id)
        {
            return await _dbContext.Livres.FindAsync(id);
        }

        // Filtrage avancée

        public async Task<List<Livre>> RechercherLivresAsync(string? titre, string? auteur, string? genre, int? anneePublication, bool? disponiblesUniquement)
        {
            var query = _dbContext.Livres.AsQueryable();

            // Recherche par titre
            if (!string.IsNullOrEmpty(titre))
            {
                query = query.Where(l => EF.Functions.Like(l.Titre, $"%{titre}%"));
            }

            // Recherche par auteur
            if (!string.IsNullOrEmpty(auteur))
            {
                query = query.Where(l => EF.Functions.Like(l.Auteur, $"%{auteur}%"));
            }

            // Recherche par genre
            if (!string.IsNullOrEmpty(genre))
            {
                query = query.Where(l => EF.Functions.Like(l.Genre, $"%{genre}%"));
            }

            // Recherche par année de publication
            if (anneePublication.HasValue)
            {
                query = query.Where(l => l.Annee == anneePublication.Value);
            }

            // Filtrer par disponibilité
            if (disponiblesUniquement.HasValue && disponiblesUniquement.Value)
            {
                query = query.Where(l => l.NombreCopies > 0); // Filtrer les livres disponibles
            }

            // Retourner les résultats après avoir appliqué tous les filtres
            return await query.ToListAsync();
        }



    }
}
