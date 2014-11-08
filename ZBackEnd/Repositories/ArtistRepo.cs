using System;
using System.Data.Entity;
using System.Threading.Tasks;
using Backend.DomainModels;
using Backend.Models;

namespace Backend.Repositories
{
    public class ArtistRepo : IDisposable
    {
        private readonly UrlRepo _urlRepo;
        private readonly ProfileRepo _profileRepo;
        private readonly Entities _db;

        public ArtistRepo(UrlRepo urlRepo, ProfileRepo profileRepo, Entities db)
        {
            _urlRepo = urlRepo;
            _profileRepo = profileRepo;
            _db = db;
        }
        public static async Task<tblArtist> GetArtistForUrl(Entities db, string profileUrl)
        {
            return await db.Artists.FirstOrDefaultAsync(b => b.Url.Url == profileUrl);
        }
        public async Task<tblArtist> GetArtistForUrl(string profileUrl)
        {
            return await _db.Artists.FirstOrDefaultAsync(b => b.Url.Url == profileUrl);
        }

        public void Dispose()
        {
            _db.Dispose();
        }

        public async Task<tblArtist> CreateArtist(ArtistBindingModel artistModel)
        {
            var url = await _urlRepo.CreateUrl(artistModel.Url);
            var user = await UserRepo.GetLoggedInUser();
            if (url != null && user != null)
            {
                var artist = new tblArtist
                {
                    Created = DateTime.Now,
                    Modified = DateTime.Now,
                    Name = artistModel.Name,
                    Url = url,
                };
                artist.Users.Add(user);
                _db.Artists.Add(artist);
                try
                {
                    await _db.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    _urlRepo.DeleteUrl(url);
                    throw;
                }
                try
                {
                    await _profileRepo.CreateProfile(url.Url);
                }
                catch (Exception ex)
                {
                    artist.Users.Remove(user);
                    _db.SaveChanges();
                    DeleteArtist(artist);
                    _urlRepo.DeleteUrl(url);
                    throw;
                }
     
                return artist;
            }
            return null;
        }

        private bool DeleteArtist(tblArtist artist)
        {
            _db.Artists.Remove(artist);
            _db.SaveChangesAsync();
            return true;
        }
    }
}
