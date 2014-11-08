using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.DomainModels;
using Backend.Repositories;

namespace Bokaettband.Controllers
{
    [RoutePrefix("api/Profile")]
    public class ProfileController : ApiController
    {
        private readonly ProfileRepo _profileRepo;

        public ProfileController(ProfileRepo profileRepo)
        {
            _profileRepo = profileRepo;
        }

        [HttpGet]
        [Route("{profileUrl}")]
        [ResponseType(typeof(ProfileBindingModel))]
        public async Task<IHttpActionResult> Get(string profileUrl)
        {
            var profile = await _profileRepo.GetProfileViewModel(profileUrl);
            return Ok(profile);
        }


        [HttpPost]
        [Route("{profileUrl}")]
        [ResponseType(typeof(ProfileBindingModel))]
        public async Task<IHttpActionResult> CreateProfile(string profileUrl)
        {
            var profile = await _profileRepo.CreateProfileViewModel(profileUrl);
            return Ok(profile);
        }

    }
}
