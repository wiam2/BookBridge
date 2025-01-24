using BookBridge_backend.DTOS;
using BookBridge_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookBridge_backend.Controllers
{
    public class LecteurController :ControllerBase
    {
        private readonly LecteurService _lecteurRepository;

        public LecteurController(LecteurService lecteurRepository)
        {
            _lecteurRepository = lecteurRepository;
        }

        [HttpGet("affichagelecteurs")]
        public async Task<IActionResult> GetAlllecteurs()
        {
            var Candidats = await _lecteurRepository.AffichageLecteurs();
            return Ok(Candidats);
        }
        [HttpGet("affichagelecteur/{id}")]

        public async Task<IActionResult> GetlecteurById(string id)
        {
            var CandidatDTO = await _lecteurRepository.AffichageLecteurById(id);
            if (CandidatDTO == null)
            {
                return NotFound();
            }

            return Ok(CandidatDTO);
        }
        [HttpDelete("Deletelecteur/{id}")]
        public async Task<IActionResult> Supprimerlecteur(string id)
        {
            await _lecteurRepository.SupprimerLecteurById(id);
            return NoContent();
        }
        [HttpPut("Updatelecteur/{id}")]
        public async Task<IActionResult> MettreAJourlecteur(string id, [FromBody] LecteurDTO lecteurdto)
        {

            if (lecteurdto == null)
            {
                return BadRequest(new { message = "Les données du lecteur ne peuvent pas être nulles." });
            }

            try
            {
                // Appel du repository pour effectuer la mise à jour
                await _lecteurRepository.MettreAJourlecteur(id, lecteurdto);

                return NoContent(); // Mise à jour réussie, aucune réponse nécessaire
            }
            catch (KeyNotFoundException)
            {
                // Si le lecteur avec l'ID spécifié n'est pas trouvé
                return NotFound(new { message = $"Le lecteur avec l'ID {id} n'a pas été trouvé." });
            }
            catch (Exception ex)
            {
                // Erreur interne
                return StatusCode(500, new { message = "Une erreur est survenue lors de la mise à jour du lecteur.", details = ex.Message });
            }
        }

    }
}

