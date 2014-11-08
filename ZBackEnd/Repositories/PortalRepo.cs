using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Backend.DomainModels;
using Backend.Models;

namespace Backend.Repositories
{
    public class PortalRepo
    {
        private readonly Entities _db;

        public PortalRepo(Entities db)
        {
            _db = db;
        }

        public async Task<StartPageBindingModel> GetPortalStartPageViewModel(string url)
        {
            return await (from user in _db.Users
                where user.Url.Url == url
                select new StartPageBindingModel
                {
                    FirstName = user.FistName,
                    LastName = user.LastName,
                    PersonalProfileUrl = url
                }).FirstOrDefaultAsync();

        }
    }
}
