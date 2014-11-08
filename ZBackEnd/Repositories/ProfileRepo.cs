using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Backend.DomainModels;
using Backend.Enums;
using Backend.Helpers;
using Backend.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Backend.Repositories
{
    public class ProfileRepo
    {
        private readonly Entities _db;
        private readonly UrlRepo _urlRepo;

        public ProfileRepo(Entities db, UrlRepo urlRepo)
        {
            _db = db;
            _urlRepo = urlRepo;
        }

        public async Task<ProfileBindingModel> GetProfileViewModel(string profileUrl)
        {
            var profileViewModel = await (from profile in _db.Profiles
                                          where profile.Url.Url == profileUrl
                                          select new ProfileBindingModel
                                          {
                                              Title = profile.Title,
                                              HeaderImage = profile.HeaderImage.FilePath + profile.HeaderImage.FileName + profile.HeaderImage.FileExtension,
                                              HeaderImagePostionQuery = profile.HeaderImagePostionQuery,
                                              ProfileImage = profile.ProfileImage.FilePath + profile.ProfileImage.FileName + profile.ProfileImage.FileExtension,
                                              Created = profile.Created,
                                              Modified = profile.Modified,
                                              Description = profile.Description,
                                              Url = profile.Url.Url,
                                              Images = from image in profile.Images
                                                       select image.FilePath + image.FileName + image.FileExtension

                                          }).FirstOrDefaultAsync();
            return profileViewModel;
        }

        public async Task<ProfileBindingModel> CreateProfileViewModel(string profileUrl)
        {
            var profile = await CreateProfile(profileUrl);
            if (profile != null)
            {
                return new ProfileBindingModel
                {
                    ProfileId = profile.ProfileId,
                    Description = profile.Description,
                    Url = profile.Url.Url,
                    Title = profile.Title,
                    Created = profile.Created,
                    Modified = profile.Modified
                };
            }
            return null;
        }
        public async Task<tblProfile> CreateProfile(string profileUrl)
        {
            var profileExists = await _db.Profiles.AnyAsync(b => b.Url.Url == profileUrl);
            var urlDb = await _urlRepo.GetUrlObjectFromUrlString(profileUrl);
            if (urlDb == null)
            {
                throw new Exception("Could not find url " + profileUrl + " in database.");
            }
            if (!profileExists)
            {
                var pageType = await _urlRepo.GetPageTypeFromUrl(profileUrl);

                tblProfile profileDb = null;
                switch (pageType)
                {
                    case PageType.None:
                        throw new Exception("Could not find the page-type for this Url");
                    case PageType.UserProfile:
                        profileDb = await CreateUserProfile(profileUrl);
                        break;
                    case PageType.ArtistProfile:
                        profileDb = await CreateArtistProfile(profileUrl);
                        break;
                    default:
                        throw new ArgumentOutOfRangeException("Unknown-handled page-type");
                }
                if (profileDb == null) return null;
                profileDb.Url = urlDb;
                _db.Profiles.Add(profileDb);
                await _db.SaveChangesAsync();
                return profileDb;
            }
            throw new Exception("Profile already exists!");
        }

        private async Task<tblProfile> CreateUserProfile(string profileUrl)
        {
            using (var userRepo = new UserRepo(new UserStore<tblUser>(_db), _db))
            {
                var user = await userRepo.GetUserForUrl(profileUrl);
                if (user == null)
                {
                    throw new Exception("Could not find user for url " + profileUrl);
                }
                return new tblProfile
                {
                    Title = user.FistName + " " + user.LastName,
                    Description = Resources.DefaultProfileText,
                    Created = DateTime.Now,
                    Modified = DateTime.Now,
                    Deleted = false

                };
            }
        }
        private async Task<tblProfile> CreateArtistProfile(string profileUrl)
        {

            var artist = await ArtistRepo.GetArtistForUrl(_db, profileUrl);
            if (artist == null)
            {
                throw new Exception("Could not find artist for url " + profileUrl);
            }
            return new tblProfile
            {
                Title = artist.Name,
                Description = Resources.DefaultProfileText,
                Created = DateTime.Now,
                Modified = DateTime.Now,
                Deleted = false

            };

        }
    }
}
