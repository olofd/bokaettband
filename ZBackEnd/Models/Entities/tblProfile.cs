using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
     [Table("tblProfile")]
    public class tblProfile
    {
        [Key]
        public int ProfileId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [ForeignKey("Url")]
        public int? UrlId { get; set; }
        public virtual tblUrl Url { get; set; }
        [ForeignKey("HeaderImage")]
        public int? HeaderImageId { get; set; }
        public virtual tblFile HeaderImage { get; set; }
        public string HeaderImagePostionQuery { get; set; }
        [ForeignKey("ProfileImage")]
        public int? ProfileImageId { get; set; }
        public virtual tblFile ProfileImage { get; set; }
        public virtual ICollection<tblFile> Images { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public bool Deleted { get; set; }

    }
}
