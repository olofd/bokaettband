using System.Web.Http;
using Backend;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using Owin;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;

namespace Bokaettband
{
    public partial class Startup
    {
        /// <summary>Initialize the container and register it as MVC3 Dependency Resolver.</summary>
        public static Container InitializeDi(IAppBuilder app)
        {
            // Did you know the container can diagnose your configuration? Go to: https://bit.ly/YE8OJj.
            var container = new Container();

            InitializeContainer(container, app);
            container.RegisterPerWebRequest<Entities>();
            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            container.Verify();

            GlobalConfiguration.Configuration.DependencyResolver =
                new SimpleInjectorWebApiDependencyResolver(container);
            return container;
        }

        private static void InitializeContainer(Container container, IAppBuilder app)
        {
            container.RegisterPerWebRequest<IUserStore<tblUser>>(() => new UserStore<tblUser>(container.GetInstance<Entities>()));
            container.RegisterPerWebRequest(() => new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(container.GetInstance<Entities>())));
            container.RegisterInitializer<UserRepo>(manager => InitializeUserManager(manager, app));
            using (var context = new Entities())
            {
                context.Database.CreateIfNotExists();
            }
            InjectService.SetContainer(container);
        }

        private static void InitializeUserManager(
            UserRepo manager, IAppBuilder app)
        {
            manager.UserValidator = new UserValidator<tblUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
            };
            var dataProtectionProvider = app.GetDataProtectionProvider();
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider =
                    new DataProtectorTokenProvider<tblUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
        }
    }
}

