using BookBridge_backend.DTOS;
using BookBridge_backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;

namespace BookBridge_backend.Services
{
    public class LecteurService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly LibraryContext _context;

        public LecteurService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config, LibraryContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
            _context = context;
        }

        public async Task<List<LecteurDTO>> AffichageLecteurs()
        {

            var Lecteurs = await _context.Lecteurs.ToListAsync();
            return Lecteurs.Select(LecteurDto => new LecteurDTO
            {
                Id2 = LecteurDto.Id,
                CIN = LecteurDto.CIN,
                Tel = LecteurDto.Tel,
                Adresse = LecteurDto.Adresse,

                Nom = LecteurDto.Nom,
                Prenom = LecteurDto.Prenom,
                Email = LecteurDto.Email,
               
                Password = LecteurDto.PasswordHash,

              





            }).ToList(); ;
        }


        public async Task<LecteurDTO> AffichageLecteurById(string id)
        {
            var LecteurDto = await _context.Lecteurs.FindAsync(id);
            if (LecteurDto == null)
            {
                return null;
            }

            return new LecteurDTO
            {
                Id2 = LecteurDto.Id,
                CIN = LecteurDto.CIN,
                Tel = LecteurDto.Tel,
                Adresse = LecteurDto.Adresse,

                Nom = LecteurDto.Nom,
                Prenom = LecteurDto.Prenom,
                Email = LecteurDto.Email,

                Password = LecteurDto.PasswordHash,

            };

        }
        public async Task SupprimerLecteurById(string id)
        {
            var lecteur = await _context.Lecteurs.FindAsync(id);
            if (lecteur == null)
            {
                return;
            }

            _context.Lecteurs.Remove(lecteur);

            await _context.SaveChangesAsync();
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                await _userManager.DeleteAsync(user);
            }
        }
        public async Task MettreAJourlecteur(string id, LecteurDTO lecteurDTO)
        {
            Console.WriteLine(lecteurDTO);
            var Lecteur = await _context.Lecteurs.FindAsync(id);
            if (Lecteur == null)
            {
              
                return;
            }
         
            Lecteur.CIN = lecteurDTO.CIN;
            Lecteur.Tel = lecteurDTO.Tel;
            Lecteur.Adresse = lecteurDTO.Adresse;

            Lecteur.Nom = lecteurDTO.Nom;
            Lecteur.Prenom = lecteurDTO.Prenom;
            Lecteur.Email = lecteurDTO.Email;

            User user = await _userManager.FindByIdAsync(id);
            user.Email = lecteurDTO.Email;

            _userManager.UpdateNormalizedEmailAsync(user);
            _userManager.UpdateNormalizedUserNameAsync(user);
            Lecteur.PasswordHash = _userManager.PasswordHasher.HashPassword(user, lecteurDTO.Password);



            // Mettre à jour l'utilisateur dans la base de données


            _context.Entry(Lecteur).State = EntityState.Modified;
            await _context.SaveChangesAsync();

        }
    }
}

