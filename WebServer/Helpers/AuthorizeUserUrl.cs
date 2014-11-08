using System.Linq;
using System.Net.Http;
using System.Security.Principal;
using System.Web.Http;
using System.Web.Http.Controllers;
using Backend.Repositories;
using Microsoft.AspNet.Identity.Owin;

namespace Bokaettband.Helpers
{
    public class AuthorizeUserUrl : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            if (base.IsAuthorized(actionContext))
            {
                IPrincipal userLoggedIn = actionContext.ControllerContext.RequestContext.Principal;
                var queryString = actionContext.Request.GetQueryNameValuePairs();
                var userUrl = queryString.FirstOrDefault(b => b.Key == "userUrl");
                if (string.IsNullOrEmpty(userUrl.Value)) return false;
                var userManager = actionContext.Request.GetOwinContext().GetUserManager<UserRepo>();
                var loggedInUserWithUrl = (from user in userManager.Users
                                           where user.UserName == userLoggedIn.Identity.Name && user.Url.Url == userUrl.Value
                                           select user).FirstOrDefault();
                if (loggedInUserWithUrl != null)
                {
                    return true;
                }
            }
            return false;

        }
    }
}