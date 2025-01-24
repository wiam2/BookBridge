using Microsoft.AspNetCore.Mvc;
using BookBridge_backend.Models;
using BookBridge_backend.Services;
using System.Threading.Tasks;

namespace BookBridge_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LivresController : ControllerBase
    {
        private readonly LivreService _livreService;

        public LivresController(LivreService livreService) => _livreService = livreService;

        // GET: api/Livres
        [HttpGet]
        public async Task<IActionResult> GetAllLivres()
        {
            var result = await _livreService.ObtenirTousLesLivresAsync();
            return Ok(result);
        }

        // GET: api/Livres/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLivreById(int id)
        {
            var livre = await _livreService.ObtenirLivreParIdAsync(id);
            if (livre == null)
                return NotFound(new { Message = "Livre non trouvé." });

            return Ok(livre);
        }

        // POST: api/Livres
        [HttpPost]
        public async Task<IActionResult> AjouterLivre(Livre livre)
        {
            if (livre == null)
                return BadRequest(new { Message = "Les données du livre sont invalides." });

            var createdLivre = await _livreService.AjouterLivreAsync(livre);
            return CreatedAtAction(nameof(GetLivreById), new { id = createdLivre.Id }, createdLivre);
        }

        // PUT: api/Livres/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> ModifierLivre(int id, Livre updatedLivre)
        {
            if (updatedLivre == null)
                return BadRequest(new { Message = "Les données du livre sont invalides." });

            var existingLivre = await _livreService.ObtenirLivreParIdAsync(id);
            if (existingLivre == null)
                return NotFound(new { Message = "Livre non trouvé." });

            await _livreService.ModifierLivreAsync(id, updatedLivre);
            return NoContent();
        }

        // DELETE: api/Livres/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> SupprimerLivre(int id)
        {
            var success = await _livreService.SupprimerLivreAsync(id);
            if (success)
                return NoContent();

            return NotFound(new { Message = "Livre non trouvé." });
        }



        [HttpGet("rechercher")]
        public async Task<IActionResult> RechercherLivres(
    [FromQuery] string? titre,
    [FromQuery] string? auteur,
    [FromQuery] string? genre,
    [FromQuery] int? anneePublication,
    [FromQuery] bool? disponiblesUniquement)
        {
            var livres = await _livreService.RechercherLivresAsync(titre, auteur, genre, anneePublication, disponiblesUniquement);

            if (livres == null || livres.Count == 0)
            {
                return NotFound(new { Message = "Aucun livre trouvé pour les critères de recherche." });
            }

            return Ok(livres);
        }
    }
}
