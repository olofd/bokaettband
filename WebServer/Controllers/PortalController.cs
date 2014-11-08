using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.DomainModels;
using Backend.Repositories;

namespace Bokaettband.Controllers
{
    [Authorize]
    [RoutePrefix("api/Portal")]
    public class PortalController : ApiController
    {
        private readonly PortalRepo _portalRepo;

        public PortalController(PortalRepo portalRepo)
        {
            _portalRepo = portalRepo;
        }

        // GET: StartPage

        [HttpGet]
        [Route("StartPage/{profileUrl}")]
        [ResponseType(typeof(StartPageBindingModel))]
        public async Task<IHttpActionResult> Get(string profileUrl)
        {
            var viewModel = await _portalRepo.GetPortalStartPageViewModel(profileUrl);
            return Ok(viewModel);
        }
    }
}