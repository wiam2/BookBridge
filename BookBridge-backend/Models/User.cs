using Microsoft.AspNetCore.Identity;

namespace BookBridge_backend.Models
{
    public class User: IdentityUser
    {
        public int Id { get; set; } // Identifiant unique
        public string Nom { get; set; }
        public string Prenom { get; set; }
    }
}
