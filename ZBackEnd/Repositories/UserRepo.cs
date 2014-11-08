using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Backend.DomainModels;
using Backend.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace Backend.Repositories
{
    public class UserRepo : UserManager<tblUser>
    {
        private readonly Entities _db;

        public UserRepo(IUserStore<tblUser> userStore, Entities db)
            : base(userStore)
        {
            _db = db;
        }

        public static async Task<tblUser> GetLoggedInUser()
        {
            var db = InjectService.GetInstance<Entities>();
            return await db.Users.FirstOrDefaultAsync(b => b.Email == HttpContext.Current.User.Identity.Name);
        }
        public bool UserControlsUrl(string userName, string url)
        {
            return (from urlDb in _db.Urls
                    where urlDb.Url == url &&
                    (urlDb.Users.Any(b => b.UserName == userName)
                    || (urlDb.Artists.Any(b => b.Users.Any(c => c.UserName == userName))))
                    select urlDb).Any();

        }
        public async Task<IQueryable<UserPageDescription>> GetUserPagesDescriptionsFromUserUrl(string userUrl, bool includePrivateUrls)
        {
            return await
                (from user in _db.Users
                    where user.Url.Url == userUrl
                    select (from userInner in _db.Users
                        where userInner.Id == user.Id && (includePrivateUrls || !user.Url.Private)
                        select new UserPageDescription
                        {
                            Name = user.FistName + " " + user.LastName,
                            PageType = Enums.PageType.UserProfile,
                            Url = user.Url.Url
                        }).Union(
                            from artist in _db.Artists
                            where artist.Users.Any(b => b.Id == user.Id) && (includePrivateUrls || !artist.Url.Private)
                            select new UserPageDescription
                            {
                                Name = artist.Name,
                                PageType = Enums.PageType.ArtistProfile,
                                Url = artist.Url.Url
                            })
                    ).FirstOrDefaultAsync();
        }
        public async Task<List<UserPageDescription>> GetUserPagesDescriptions(string userId)
        {
            return await (
                from user in _db.Users
                where user.Id == userId
                select new UserPageDescription
                {
                    Name = user.FistName + " " + user.LastName,
                    PageType = Enums.PageType.UserProfile,
                    Url = user.Url.Url
                }).Union(
                from artist in _db.Artists
                where artist.Users.Any(b => b.Id == userId)
                select new UserPageDescription
                {
                    Name = artist.Name,
                    PageType = Enums.PageType.ArtistProfile,
                    Url = artist.Url.Url
                }).ToListAsync();
        }

        public async Task<tblUser> GetUserForUrl(string profileUrl)
        {
            return await _db.Users.FirstOrDefaultAsync(b => b.Url.Url == profileUrl);
        }


        public static UserRepo Create(IdentityFactoryOptions<UserRepo> options, IOwinContext context)
        {
            var manager = new UserRepo(new UserStore<tblUser>(InjectService.GetInstance<Entities>()), InjectService.GetInstance<Entities>());
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<tblUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<tblUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}
