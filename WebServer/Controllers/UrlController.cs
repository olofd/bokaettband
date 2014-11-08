using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Repositories;

namespace Bokaettband.Controllers
{
    [RoutePrefix("api/Url")]
    public class UrlController : ApiController
    {
        private readonly UrlRepo _urlRepo;

        public UrlController(UrlRepo urlRepo)
        {
            _urlRepo = urlRepo;
        }

        [AllowAnonymous]
        [Route("UrlAvaliablity")]
        [ResponseType(typeof(bool))]
        [HttpGet]
        public async Task<IHttpActionResult> UrlAvaliablity(string url)
        {
            var res = await _urlRepo.UrlIsAvaliable(url);
            return Ok(res);
        }
    }
}
