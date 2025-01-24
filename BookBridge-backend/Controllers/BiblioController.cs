using BookBridge_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookBridge_backend.Controllers
{
    public class BiblioController :ControllerBase
    {
        private readonly BiblioService _biblioRepository;
        public BiblioController(BiblioService biblioRepository)
        {
            _biblioRepository = biblioRepository;
        }

        [HttpGet("affichagebiblios")]
        public async Task<IActionResult> GetAlllecteurs()
        {
            var Candidats = await _biblioRepository.AffichageBiblios();
            return Ok(Candidats);
        }
        [HttpGet("affichagebibio/{id}")]

        public async Task<IActionResult> GetBibioById(string id)
        {
            var biblioDTO = await _biblioRepository.AffichageBiblioById(id);
            if (biblioDTO == null)
            {
                return NotFound();
            }

            return Ok(biblioDTO);
        }
    }
}
