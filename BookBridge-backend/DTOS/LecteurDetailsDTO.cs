namespace BookBridge_backend.DTOS
{
    public class LecteurDetailsDTO
    {
        public string LecteurNom { get; set; }
        public string LecteurEmail { get; set; }
        public bool EstPenalise { get; set; }
        public List<EmpruntDTO> Emprunts { get; set; }
    }
}
