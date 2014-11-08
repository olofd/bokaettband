using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Backend.Enums;
using Backend.Models;

namespace Backend.Repositories
{
    public class UrlRepo
    {
        private readonly Entities _db;

        public UrlRepo(Entities db)
        {
            _db = db;
        }

        public async Task<tblUrl> GetUrlObjectFromUrlString(string url)
        {
            return await _db.Urls.FirstOrDefaultAsync(b => b.Url == url);
        }

        public async Task<PageType> GetPageTypeFromUrl(string url)
        {
            return await (from urlDb in _db.Urls
                          let isArtistUrl = urlDb.Artists.Any()
                          let isUserUrl = urlDb.Users.Any()
                          where urlDb.Url == url
                          select
                          isArtistUrl ? PageType.ArtistProfile :
                          isUserUrl ? PageType.UserProfile :
                          PageType.None).FirstOrDefaultAsync();
        }
        public async Task<bool> UrlIsAvaliable(string url)
        {
            if (string.IsNullOrEmpty(url) || url.StartsWith("http://") || url.StartsWith("www"))
            {
                throw new Exception("Incorrect Url");
            }
            var result = await (_db.Urls.AnyAsync(b => b.Url == url));
            return !result;
        }

        public async Task<tblUrl> CreateUrl(string urlstring)
        {
            var urlIsAvaliable = await UrlIsAvaliable(urlstring);
            if (!urlIsAvaliable)
            {
                throw new Exception("The url is taken!");
            }
            var url = new tblUrl
            {
                Url = urlstring,
                Created = DateTime.Now,
                Modified = DateTime.Now,
            };
            _db.Urls.Add(url);
            await _db.SaveChangesAsync();
            return url;
        }

        public bool DeleteUrl(tblUrl url)
        {
            _db.Urls.Remove(url);
            _db.SaveChanges();
            return true;
        }
    }
}
