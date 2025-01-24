using Microsoft.AspNetCore.Identity;

namespace BookBridge_backend.Models
{
    public class User: IdentityUser
    {
       
        public string Nom { get; set; }
        public string Prenom { get; set; }
        
    }
}
