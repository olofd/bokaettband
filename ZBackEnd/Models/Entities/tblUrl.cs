using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("tblUrl")]
    public class tblUrl
    {
        [Key]
        public int UrlId { get; set; }
        [Required]
        [MaxLength(100)]
        [Index("Url", IsUnique = true)]
        public string Url { get; set; }

        public bool Private { get; set; }

        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }

        public virtual ICollection<tblUser> Users { get; set; }
        public virtual ICollection<tblArtist> Artists { get; set; }

    }
}
