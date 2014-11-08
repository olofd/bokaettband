using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.DomainModels
{
    public class ProfileBindingModel
    {
        public int ProfileId { get; set; }
        public string Title { get; set; }
        public string HeaderImage { get; set; }
        public string HeaderImagePostionQuery { get; set; }
        public string ProfileImage { get; set; }
        public string ProfileImagePositionQuery { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public IEnumerable<string> Images { get; set; }
    }
}
