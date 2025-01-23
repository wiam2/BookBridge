namespace BookBridge_backend.Models
{
    public class Lecteur:User
    {
        public string CIN { get; set; }
        public string Tel { get; set; }
        public string Adresse { get; set; }

        // Relation: Un Lecteur peut avoir plusieurs emprunts
        public ICollection<Emprunt> Emprunts { get; set; } = new List<Emprunt>();
    }
}
