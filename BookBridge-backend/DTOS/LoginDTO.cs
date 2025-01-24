using System.ComponentModel.DataAnnotations;

namespace BookBridge_backend.DTOS
{
    public class LoginDTO
    {

        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = string.Empty;
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        public override string ToString()
        {
            return $"LoginDTO: {{ Email: {Email}, Password: (hidden) }}";
        }
    }
}

