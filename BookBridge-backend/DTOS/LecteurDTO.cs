namespace BookBridge_backend.DTOS
{
    public class LecteurDTO : UserDTO
    {
        public string? Id2 { get; set; }
        public string CIN { get; set; }
        public string Tel { get; set; }
        public string Adresse { get; set; }

        // Liste simplifiée des emprunts (par exemple, les identifiants des emprunts)
        public List<int> EmpruntIds { get; set; } = new List<int>();
    }
}
