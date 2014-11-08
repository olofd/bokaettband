module app.portal {
    export class PortalService {
        static $inject = ['$http', 'userService'];
        leftProtalMenuViewModels: any;
        constructor(private $http, private userService: app.identity.UserService) {
            this.leftProtalMenuViewModels = {};
        }
        getStartPageViewModel(url): ng.IPromise<IStartPageViewModel> {
            return this.$http.get("/api/Portal/StartPage/" + url).then((res) => {
                return res.data;
            });
        }
        getUserPagesDescriptionModel(userUrl): ng.IPromise<ILeftMenuViewModel> {
            return this.userService.getUserPagesDescription(userUrl).then((res) => {
                var pages = new Array<IPortalPageDescription>();
                _.forEach(res.data, (pageDesc: app.identity.IUserPageDescription, index) => {
                    pages.push({
                        Name: pageDesc.Name,
                        PageType: this.translatePageTypeToPortalPageType(pageDesc.PageType),
                        Group: 1,
                        SortOrder: index,
                        Url: pageDesc.Url
                    });
                });
                var viewModel = <ILeftMenuViewModel>{
                    pages: pages
                }
                this.leftProtalMenuViewModels[userUrl] = viewModel;
                return viewModel;
            });
        }
        addLeftHandMenuItem(url, pageDesc: app.identity.IUserPageDescription) {
            var vm = this.leftProtalMenuViewModels[url];
            if (vm) {
                vm.pages.push(pageDesc);
            }
        }
        getCreatePageViewModel(type: string, url :string) {
            var viewModel = <IPortalCreatePageViewModel>{
                entity: {
                    EntityType: type === "band" ? app.shared.EntityType.Artist : type === "arranger" ? app.shared.EntityType.Arranger : app.shared.EntityType.None,
                },
                type_sv: type === "band" ? "band" : type === "arranger" ? "arrangör" : "inget",
                url : url
            };
            if (viewModel.entity.EntityType === app.shared.EntityType.None) {
                throw new AppError("getCreatePageViewModel => could not find entitytype", "Kunde inte hitta den typ av sida du ville skapa", 2);
            }
            return viewModel;
        }

        private translatePageTypeToPortalPageType(pageType: app.identity.PageType): PageType {
            switch (pageType) {
                case app.identity.PageType.UserProfile:
                    return PageType.UserProfile;
                case app.identity.PageType.ArtistProfile:
                    return PageType.ArtistProfile;
                default:
                    return null;
            }
        }
    }
}
angular.module('app.portal').service("portalService", app.portal.PortalService);
