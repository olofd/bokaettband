using Backend.Enums;

namespace Backend.DomainModels
{
    public class UserPageDescription
    {
        public string Name { get; set; }
        public PageType PageType { get; set; }
        public string Url { get; set; }

    }
}
