using BookBridge_backend.DTOS;
using BookBridge_backend.Models;
using Microsoft.AspNetCore.Identity;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static BookBridge_backend.DTOS.ServiceResponce.ServiceResponses;

namespace BookBridge_backend.Services
{
    public class AccountService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config)
    {

        public IConfiguration Config { get; } = config;
        public async Task<GeneralResponse> CreateAccountLecteur(LecteurDTO LeteurDto)
        {
            if (LeteurDto is null) return new GeneralResponse(false, "Model is empty");
            var newUser = new Lecteur()
            {
               
                CIN = LeteurDto.CIN,
                Tel = LeteurDto.Tel,
                Adresse = LeteurDto.Adresse,
                // Additional properties for the User (Identity-related)
                Email = LeteurDto.Email,
                PasswordHash = LeteurDto.Password,
                UserName = LeteurDto.Email,
                Nom = LeteurDto.Nom,
                   Prenom = LeteurDto.Prenom
               
            };
            var user = await userManager.FindByEmailAsync(newUser.Email);
            if (user is not null) return new GeneralResponse(false, "User registered already");

            var createUser = await userManager.CreateAsync(newUser!, LeteurDto.Password);
            if (!createUser.Succeeded)
            {
                // Il y a eu une erreur lors de la création de l'utilisateur
                var errorMessages = string.Join(", ", createUser.Errors.Select(e => e.Description));
                return new GeneralResponse(false, $"Error occured.. please try again. Details: {errorMessages}");
            }

            // Créer le rôle RInvestisseur s'il n'existe pas déjà
            var role = new IdentityRole("RLecteur");
            await roleManager.CreateAsync(role);

            // Ajouter l'utilisateur au rôle Investisseur
            var addToRoleResult = await userManager.AddToRoleAsync(newUser, "RLecteur");
            if (!addToRoleResult.Succeeded)
            {
                return new GeneralResponse(false, "Failed to assign role to user.");
            }

            return new GeneralResponse(true, "Account Created");
        }

        public async Task<GeneralResponse> CreateAccountBiblio(BibliothecaireDTO BiblioDto)
        {
            if (BiblioDto is null) return new GeneralResponse(false, "Model is empty");
            var newUser = new Bibliothecaire()
            {
              
                Email = BiblioDto.Email,
                PasswordHash = BiblioDto.Password,
                UserName = BiblioDto.Email,
                Nom = BiblioDto.Nom,
                Prenom = BiblioDto.Prenom
            };
            var user = await userManager.FindByEmailAsync(newUser.Email);
            if (user is not null) return new GeneralResponse(false, "User registered already");

            var createUser = await userManager.CreateAsync(newUser!, BiblioDto.Password);
            if (!createUser.Succeeded)
            {
                // Il y a eu une erreur lors de la création de l'utilisateur
                var errorMessages = string.Join(", ", createUser.Errors.Select(e => e.Description));
                return new GeneralResponse(false, $"Error occured.. please try again. Details: {errorMessages}");
            }

            // Créer le rôle RInvestisseur s'il n'existe pas déjà
            var role = new IdentityRole("RBiblio");
            await roleManager.CreateAsync(role);

            // Ajouter l'utilisateur au rôle Investisseur
            var addToRoleResult = await userManager.AddToRoleAsync(newUser, "RBiblio");
            if (!addToRoleResult.Succeeded)
            {
                return new GeneralResponse(false, "Failed to assign role to user.");
            }

            return new GeneralResponse(true, "Account Created");
        }

        public async Task<LoginResponse> LoginAccount(LoginDTO loginDTO)
        {
            if (loginDTO == null)
                return new LoginResponse(false, null!, "Login container is empty");

            var getUser = await userManager.FindByEmailAsync(loginDTO.Email);
            if (getUser is null)
                return new LoginResponse(false, null!, "User not found");

            bool checkUserPasswords = await userManager.CheckPasswordAsync(getUser, loginDTO.Password);
            if (!checkUserPasswords)
                return new LoginResponse(false, null!, "Invalid email/password");

            var getUserRole = await userManager.GetRolesAsync(getUser);
            var userSession = new UserSession(getUser.Id, getUser.Email, getUserRole.First());
            string token = GenerateToken(userSession);
            return new LoginResponse(true, token!, "Login completed");
        }



        private string GenerateToken(UserSession user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: userClaims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
