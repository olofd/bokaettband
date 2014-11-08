using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Bokaettband.Startup))]

namespace Bokaettband
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var container = InitializeDi(app);
            ConfigureAuth(app, container);
        }
    }
}
