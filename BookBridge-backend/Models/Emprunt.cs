namespace BookBridge_backend.Models
{
    public class Emprunt
    {
        public int Id { get; set; } // Identifiant unique
        public DateTime DateEmprunt { get; set; }
        public DateTime? DateRetour { get; set; } // Peut être null si le livre n'est pas encore retourné

        // Relation: Un Emprunt est associé à un Lecteur
        public string LecteurId { get; set; }
        public Lecteur Lecteur { get; set; }

        // Relation: Un Emprunt est associé à un Livre
        public int LivreId { get; set; }
        public Livre Livre { get; set; }
    }
}
