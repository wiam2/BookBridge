using BookBridge_backend.DTOS;
using BookBridge_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookBridge_backend.Controllers
{
    public class AccountController(AccountService userAccount) : ControllerBase
    {

        [HttpPost("registerLecteur")]
        public async Task<IActionResult> RegisterLecteur([FromBody] LecteurDTO LecteurDTO)
        {
            var response = await userAccount.CreateAccountLecteur(LecteurDTO);
            return Ok(response);
        }
        [HttpPost("registerBiblio")]
        public async Task<IActionResult> RegisterBiblio([FromBody] BibliothecaireDTO BIBLIODTO)
        {
            var response = await userAccount.CreateAccountBiblio(BIBLIODTO);
            return Ok(response);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            // Vérifiez si le corps de la requête est null
            if (loginDTO == null)
            {
                Console.WriteLine("Requête reçue : null");
                return BadRequest("Le corps de la requête est vide.");
            }

            // Vérifiez les champs Email et Password
            if (string.IsNullOrEmpty(loginDTO.Email) || string.IsNullOrEmpty(loginDTO.Password))
            {
                Console.WriteLine($"Requête reçue avec des champs manquants : {loginDTO}");
                return BadRequest("Les champs Email et Password sont requis.");
            }

            // Log des informations reçues
            Console.WriteLine($"Requête reçue : Email = {loginDTO.Email}, Password = (caché)");

            // Appeler le service utilisateur pour effectuer la connexion
            var response = await userAccount.LoginAccount(loginDTO);

            // Vérifiez la réponse du service
            if (response == null)
            {
                return Unauthorized("Échec de la connexion. Vérifiez vos informations.");
            }

            return Ok(response);
        }
    }
}
