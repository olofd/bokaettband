using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Bokaettband.Controllers
{
    public class RoleController : ApiController
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleController(RoleManager<IdentityRole>  roleManager)
        {
            _roleManager = roleManager;
        }

        public void Get()
        {
            
        }
    }
}
