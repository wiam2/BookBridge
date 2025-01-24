using System.ComponentModel.DataAnnotations;

namespace BookBridge_backend.DTOS
{
    public class UserDTO
    {
       
      
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; } // Hérité de IdentityUser
        public string UserName { get; set; } // Hérité de IdentityUser
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
