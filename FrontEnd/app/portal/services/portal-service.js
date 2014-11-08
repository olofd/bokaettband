var app;
(function (app) {
    var portal;
    (function (portal) {
        var PortalService = (function () {
            function PortalService($http, userService) {
                this.$http = $http;
                this.userService = userService;
                this.leftProtalMenuViewModels = {};
            }
            PortalService.prototype.getStartPageViewModel = function (url) {
                return this.$http.get("/api/Portal/StartPage/" + url).then(function (res) {
                    return res.data;
                });
            };
            PortalService.prototype.getUserPagesDescriptionModel = function (userUrl) {
                var _this = this;
                return this.userService.getUserPagesDescription(userUrl).then(function (res) {
                    var pages = new Array();
                    _.forEach(res.data, function (pageDesc, index) {
                        pages.push({
                            Name: pageDesc.Name,
                            PageType: _this.translatePageTypeToPortalPageType(pageDesc.PageType),
                            Group: 1,
                            SortOrder: index,
                            Url: pageDesc.Url
                        });
                    });
                    var viewModel = {
                        pages: pages
                    };
                    _this.leftProtalMenuViewModels[userUrl] = viewModel;
                    return viewModel;
                });
            };
            PortalService.prototype.addLeftHandMenuItem = function (url, pageDesc) {
                var vm = this.leftProtalMenuViewModels[url];
                if (vm) {
                    vm.pages.push(pageDesc);
                }
            };
            PortalService.prototype.getCreatePageViewModel = function (type, url) {
                var viewModel = {
                    entity: {
                        EntityType: type === "band" ? 2 /* Artist */ : type === "arranger" ? 3 /* Arranger */ : 0 /* None */,
                    },
                    type_sv: type === "band" ? "band" : type === "arranger" ? "arrangör" : "inget",
                    url: url
                };
                if (viewModel.entity.EntityType === 0 /* None */) {
                    throw new AppError("getCreatePageViewModel => could not find entitytype", "Kunde inte hitta den typ av sida du ville skapa", 2);
                }
                return viewModel;
            };
            PortalService.prototype.translatePageTypeToPortalPageType = function (pageType) {
                switch (pageType) {
                    case 1 /* UserProfile */:
                        return 1 /* UserProfile */;
                    case 2 /* ArtistProfile */:
                        return 2 /* ArtistProfile */;
                    default:
                        return null;
                }
            };
            PortalService.$inject = ['$http', 'userService'];
            return PortalService;
        })();
        portal.PortalService = PortalService;
    })(portal = app.portal || (app.portal = {}));
})(app || (app = {}));
angular.module('app.portal').service("portalService", app.portal.PortalService);
//# sourceMappingURL=portal-service.js.map