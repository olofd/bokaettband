using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Models
{
    [Table("tblFile")]
    public class tblFile
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FilePath { get; set; }
        [Required]
        public string FileName { get; set; }
        [Required]
        public string OriginalFileName { get; set; }
        [Required]
        public string FileExtension { get; set; }
        public bool Deleted { get; set; }
        public System.DateTime Created { get; set; }
        public System.DateTime Modified { get; set; }

    }
}
