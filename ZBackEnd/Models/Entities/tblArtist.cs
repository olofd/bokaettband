using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("tblArtist")]
    public class tblArtist
    {
        public tblArtist()
        {
            this.Users = new HashSet<tblUser>();
        }
        [Key]
        public int ArtistId { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public bool Deleted { get; set; }
        public virtual ICollection<tblUser> Users { get; set; }

        public int UrlId { get; set; }
        [ForeignKey("UrlId")]
        public virtual tblUrl Url { get; set; }
    }
}
