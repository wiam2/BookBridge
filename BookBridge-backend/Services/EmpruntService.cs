using BookBridge_backend.DTOS;
using BookBridge_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookBridge_backend.Services
{
    public class EmpruntService
    {
        private readonly LibraryContext _context;

        public EmpruntService(LibraryContext context)
        {
            _context = context;
        }
        public async Task EmprunterLivreAsync(string lecteurId, int livreId)
        {
            // Vérifier si l'emprunt existe déjà pour ce lecteur et ce livre
            var empruntExistant = await _context.Emprunts
                .FirstOrDefaultAsync(e => e.LecteurId == lecteurId && e.LivreId == livreId && e.DateRetour == null);

            if (empruntExistant != null)
            {
                throw new InvalidOperationException("Vous avez déjà emprunté ce livre et ne l'avez pas encore retourné.");
            }
            // Vérifier si l'utilisateur a dépassé le seuil de retards
            if (await ISpenalized(lecteurId))
            {
                throw new InvalidOperationException("Vous êtes pénalisé en dépassant le nombre maximum de retards autorisés. Vous ne pouvez pas emprunter de livre.");
            }
            // Vérifier si le livre est disponible
            var livre = await _context.Livres.FirstOrDefaultAsync(l => l.Id == livreId);
            if (livre == null)
                throw new ArgumentException("Livre introuvable.");

            if (livre.NombreCopies <= 0)
                throw new InvalidOperationException("Le livre n'est pas disponible.");

            // Créer un nouvel emprunt
            var emprunt = new Emprunt
            {
                LecteurId = lecteurId,
                LivreId = livreId,
                DateEmprunt = DateTime.Now,
                DateRetour = null // Date de retour reste vide
            };

            // Ajouter l'emprunt à la base de données et réduire le stock du livre
            _context.Emprunts.Add(emprunt);
            livre.NombreCopies--;

            await _context.SaveChangesAsync();
            Console.WriteLine("Livre emprunté avec succès !");
        }

        public async Task RetournerLivreAsync(int empruntId)
        {
            // Récupérer l'emprunt dans la base de données
            var emprunt = await _context.Emprunts
                .Include(e => e.Livre) // Inclure le livre associé
                .FirstOrDefaultAsync(e => e.Id == empruntId);

            if (emprunt == null)
                throw new ArgumentException("Emprunt introuvable.");

            if (emprunt.DateRetour != null)
                throw new InvalidOperationException("Ce livre a déjà été retourné.");

            // Mettre à jour la date de retour
            emprunt.DateRetour = DateTime.Now;

            // Mettre à jour le stock du livre
            emprunt.Livre.NombreCopies++;

            // Sauvegarder les modifications
            await _context.SaveChangesAsync();
            Console.WriteLine("Livre retourné avec succès !");
        }
        public async Task<string> ObtenirEtatEmpruntAsync(int empruntId)
        {
            // Récupérer l'emprunt depuis la base de données
            var emprunt = await _context.Emprunts
                .FirstOrDefaultAsync(e => e.Id == empruntId);

            // Vérifier si l'emprunt existe
            if (emprunt == null)
            {
                return "Emprunt introuvable"; // Retourner un message si l'emprunt n'est pas trouvé
            }

            // Vérifier si le livre a été retourné
            if (emprunt.DateRetour != null)
            {
                return "Rendu"; // Le livre a été retourné
            }

            // Calculer les jours depuis l'emprunt
            var joursDepuisEmprunt = (DateTime.Now - emprunt.DateEmprunt).Days;

            // Vérifier si l'emprunt est en retard
            if (joursDepuisEmprunt > 30)
            {
                return "Retard"; // L'emprunt dépasse 30 jours et n'a pas été rendu
            }

            return "En cours"; // L'emprunt est toujours valide
        }


        public async Task<bool> ISpenalized(string lecteurId)
        {
            // Récupérer tous les emprunts de l'utilisateur où la date de retour est supérieure à la date limite (30 jours)
            var empruntsEnRetard = await _context.Emprunts
                .Where(e => e.LecteurId == lecteurId && e.DateRetour != null && e.DateRetour > e.DateEmprunt.AddDays(30))
                .ToListAsync();

            // Vérifier si le nombre de retards dépasse 5
            return empruntsEnRetard.Count > 5;
        }

        public async Task<List<EmpruntDTO>> EmpruntsParLecteur(string lecteurId)
        {
            // Récupérer tous les emprunts du lecteur avec les informations des livres associés
            var emprunts = await _context.Emprunts
                .Where(e => e.LecteurId == lecteurId)
                .Include(e => e.Livre)  // Inclure les informations du livre associé à l'emprunt
                .ToListAsync();
            var empruntsDetails = new List<EmpruntDTO>();
            foreach (var emprunt in emprunts)
            {
                var etatEmprunt = await ObtenirEtatEmpruntAsync(emprunt.Id);
                empruntsDetails.Add(new EmpruntDTO
                {
                    LivreTitre = emprunt.Livre.Titre,
                    DateEmprunt = emprunt.DateEmprunt,
                    EtatEmprunt = etatEmprunt
                });
            }
            // Retourner la liste des emprunts
            return empruntsDetails;
        }
        

        public async Task<LecteurDetailsDTO> DetailsLecteurAdmin(string lecteurId)
        {
            // Récupérer les informations du lecteur
            var lecteur = await _context.Lecteurs.FirstOrDefaultAsync(l => l.Id == lecteurId);
            if (lecteur == null)
            {
                throw new KeyNotFoundException("Lecteur introuvable.");
            }

            // Vérifier si le lecteur a été pénalisé
            bool estPenalise = await ISpenalized(lecteurId);

            // Récupérer la liste des emprunts du lecteur
            var emprunts = await _context.Emprunts
                .Where(e => e.LecteurId == lecteurId)
                .Include(e => e.Livre) // Inclure les informations sur le livre
                .ToListAsync();

            // Créer une liste d'emprunts avec l'état d'emprunt et les détails des livres
            var empruntsDetails = new List<EmpruntDTO>();

            foreach (var emprunt in emprunts)
            {
                var etatEmprunt = await ObtenirEtatEmpruntAsync(emprunt.Id);
                empruntsDetails.Add(new EmpruntDTO
                {
                    LivreTitre = emprunt.Livre.Titre,
                    DateEmprunt = emprunt.DateEmprunt,
                    EtatEmprunt = etatEmprunt
                });
            }

            // Créer un DTO avec les informations du lecteur et des emprunts
            var lecteurDetails = new LecteurDetailsDTO
            {
                LecteurNom = lecteur.Nom,
                LecteurEmail = lecteur.Email,
                EstPenalise = estPenalise,
                Emprunts = empruntsDetails
            };

            return lecteurDetails; // Retourner le DTO
        }

        public async Task<List<Emprunt>> TousLesEmprunts()
        {
            // Récupérer tous les emprunts avec les relations Lecteur et Livre incluses
            var emprunts = await _context.Emprunts
                .ToListAsync();

            return emprunts; // Retourner la liste des emprunts
        }


    }
}
