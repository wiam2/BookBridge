namespace BookBridge_backend.Models
{
    public class Livre
    {
        public int Id { get; set; } // Identifiant unique
        public string Titre { get; set; }
        public string Editeur { get; set; }
        public string image { get; set; }
        public string Auteur { get; set; }
        public string Genre { get; set; }
        public int Annee { get; set; }
        public int NombreCopies { get; set; }

        // Relation: Un Livre peut être associé à plusieurs emprunts
        public ICollection<Emprunt> Emprunts { get; set; } = new List<Emprunt>();
    }
}
