using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Backend.Models
{
    [Table("tblUser")]
    public class tblUser : IdentityUser
    {
        [Required]
        public string FistName { get; set; }
        [Required]
        public string LastName { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public virtual ICollection<tblArtist> Artists { get; set; }

        [ForeignKey("Url")]
        public int UrlId { get; set; }
        public virtual tblUrl Url { get; set; }
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<tblUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}