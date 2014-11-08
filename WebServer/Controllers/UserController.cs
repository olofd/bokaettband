using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.DomainModels;
using Backend.Helpers;
using Backend.Models;
using Backend.Repositories;
using Bokaettband.Models;
using Microsoft.AspNet.Identity;

namespace Bokaettband.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private readonly UserRepo _userRepo;
        private readonly UrlRepo _urlRepo;
        private readonly ProfileRepo _profileRepo;

        public UserController(UserRepo userRepo, UrlRepo urlRepo, ProfileRepo profileRepo)
        {
            _userRepo = userRepo;
            _urlRepo = urlRepo;
            _profileRepo = profileRepo;
        }
        [HttpGet]
        [Authorize]
        [ResponseType(typeof(List<UserPageDescription>))]
        [Route("{userUrl}/GetUserPagesDescriptions")]
        public async Task<IHttpActionResult> GetUserPagesDescriptions(string userUrl)
        {
            var result = await _userRepo.GetUserPagesDescriptionsFromUserUrl(userUrl, _userRepo.UserControlsUrl(User.Identity.Name, userUrl));
            return Ok(result);

        }
        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            model.Password = OpenSSLCrypto.OpenSSLDecrypt(model.PasswordEncrypted, "Secret");
            model.PasswordEncrypted = OpenSSLCrypto.OpenSSLDecrypt(model.PasswordEncrypted, "Secret");
            ModelState.Clear();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var url = await _urlRepo.CreateUrl(model.Url);

            var user = new tblUser()
            {
                UserName = model.Email,
                Email = model.Email,
                FistName = model.FirstName,
                LastName = model.LastName,
                Created = DateTime.Now,
                Modified = DateTime.Now,
                UrlId = url.UrlId
            };

            IdentityResult result = await _userRepo.CreateAsync(user, model.Password);


            if (!result.Succeeded)
            {
                _urlRepo.DeleteUrl(url);
                return GetErrorResult(result);
            }
            await _profileRepo.CreateProfile(url.Url);
            return Ok();
        }
        // GET api/Account/UserInfo
        // GET api/Account/UserInfo
        [Route("GetExtraUserInfo")]
        public async Task<UserInfoViewModel> GetExtraUserInfo()
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = await _userRepo.FindByNameAsync(User.Identity.Name);
                if (user != null)
                {
                    return new UserInfoViewModel
                             {
                                 UserName = User.Identity.GetUserName(),
                                 FirstName = user.FistName,
                                 LastName = user.LastName,
                                 Created = user.Created,
                                 Modified = user.Modified,
                                 Email = User.Identity.GetUserName(),
                                 Url = (user.Url != null ? user.Url.Url : "")
                             };
                }
            }
            return null;

        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}
