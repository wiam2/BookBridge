using BookBridge_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookBridge_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmpruntController : ControllerBase
    {
        private readonly EmpruntService _empruntService;

        public EmpruntController(EmpruntService empruntService)
        {
            _empruntService = empruntService;
        }
        [HttpPost("emprunter/{lecteurId}/{livreId}")]
        public async Task<IActionResult> EmprunterLivre(string lecteurId, int livreId)
        {
            try
            {
                await _empruntService.EmprunterLivreAsync(lecteurId, livreId);
                return Ok(new { message = "Livre emprunté avec succès !" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Une erreur s'est produite lors de l'emprunt du livre.", error = ex.Message });
            }
        }
        [HttpPost("retourner/{empruntId}")]
        public async Task<IActionResult> RetournerLivre(int empruntId)
        {
            try
            {
                await _empruntService.RetournerLivreAsync(empruntId);
                return Ok(new { message = "Livre retourné avec succès !" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Une erreur s'est produite lors du retour du livre.", error = ex.Message });
            }
        }
        [HttpGet("etat/{empruntId}")]
        public async Task<IActionResult> ObtenirEtatEmprunt(int empruntId)
        {
            try
            {
                // Appeler la méthode pour obtenir l'état de l'emprunt
                var etatEmprunt = await _empruntService.ObtenirEtatEmpruntAsync(empruntId);

                // Retourner l'état de l'emprunt
                return Ok(new { etatEmprunt });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Une erreur s'est produite lors de la récupération de l'état de l'emprunt.", error = ex.Message });
            }
        }
        [HttpGet("penalise/{lecteurId}")]
        public async Task<IActionResult> VerifierPenalite(string lecteurId)
        {
            try
            {
                // Vérifier si le lecteur est pénalisé
                bool estPenalise = await _empruntService.ISpenalized(lecteurId);

                // Retourner le résultat
                return Ok(new { estPenalise });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Une erreur s'est produite lors de la vérification de la pénalité.", error = ex.Message });
            }
        }

        [HttpGet("LecteurEmprunts/{lecteurId}")]
        public async Task<IActionResult> GetEmpruntsParLecteur(string lecteurId)
        {
            try
            {
                // Récupérer les emprunts du lecteur
                var emprunts = await _empruntService.EmpruntsParLecteur(lecteurId);

                // Vérifier si des emprunts existent
                if (emprunts == null || !emprunts.Any())
                {
                    return NotFound(new { message = "Aucun emprunt trouvé pour ce lecteur." });
                }

                // Retourner la liste des emprunts
                return Ok(emprunts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Une erreur s'est produite lors de la récupération des emprunts.", error = ex.Message });
            }
        }
        [HttpGet("AdminDetails/{lecteurId}")]
        public async Task<IActionResult> GetDetailsLecteurAdmin(string lecteurId)
        {
            try
            {
                // Récupérer les détails du lecteur
                var lecteurDetails = await _empruntService.DetailsLecteurAdmin(lecteurId);

                // Retourner les détails du lecteur
                return Ok(lecteurDetails);
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new { message = "Lecteur introuvable." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Une erreur s'est produite lors de la récupération des détails du lecteur.", error = ex.Message });
            }
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAllEmprunts()
        {
            try
            {
                // Récupérer tous les emprunts avec les détails des livres et des lecteurs
                var emprunts = await _empruntService.TousLesEmprunts();

                // Retourner les emprunts en format JSON
                return Ok(emprunts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Une erreur s'est produite.", error = ex.Message });
            }
        }
    }
}
