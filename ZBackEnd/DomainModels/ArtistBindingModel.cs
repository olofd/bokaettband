using System.ComponentModel.DataAnnotations;

namespace Backend.DomainModels
{
    public class ArtistBindingModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Url { get; set; }
    }
}
