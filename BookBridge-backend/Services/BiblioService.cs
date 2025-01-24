using BookBridge_backend.DTOS;
using BookBridge_backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookBridge_backend.Services
{
    public class BiblioService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly LibraryContext _context;

        public BiblioService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config, LibraryContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = config;
            _context = context;
        }
        public async Task<List<LecteurDTO>> AffichageBiblios()
        {

            var bibios = await _context.Bibliothecaires.ToListAsync();
            return bibios.Select(biblioDto => new LecteurDTO
            {

                Id2 = biblioDto.Id,
                Nom = biblioDto.Nom,
                Prenom = biblioDto.Prenom,
                Email = biblioDto.Email,

                Password = biblioDto.PasswordHash,







            }).ToList(); ;
        }

        public async Task<BibliothecaireDTO> AffichageBiblioById(string id)
        {
            var biblioDto = await _context.Bibliothecaires.FindAsync(id);
            if (biblioDto == null)
            {
                return null;
            }

            return new BibliothecaireDTO
            {
               
                Id2= biblioDto.Id,
                Nom = biblioDto.Nom,
                Prenom = biblioDto.Prenom,
                Email = biblioDto.Email

               

            };

        }
    }
}
