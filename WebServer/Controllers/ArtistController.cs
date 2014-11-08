using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.DomainModels;
using Backend.Models;
using Backend.Repositories;

namespace Bokaettband.Controllers
{
    [RoutePrefix("api/Artist")]
    public class ArtistController : ApiController
    {
        private readonly ArtistRepo _artistRepo;

        public ArtistController(ArtistRepo artistRepo)
        {
            _artistRepo = artistRepo;
        }



        // POST: api/Artist
        [ResponseType(typeof(tblArtist))]
        public async Task<IHttpActionResult> Post(ArtistBindingModel artistModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var artist = await _artistRepo.CreateArtist(artistModel);
            return Ok(artist);
        }

       
    }
}