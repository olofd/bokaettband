var app;
(function (app) {
    var portal;
    (function (portal) {
        var PortalService = (function () {
            function PortalService($http, userService) {
                this.$http = $http;
                this.userService = userService;
            }
            PortalService.prototype.getLeftMenuViewModel = function (url) {
                var _this = this;
                return this.userService.getUserPagesDescription(url).then(function (res) {
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
                    return {
                        pages: pages
                    };
                });
            };
            PortalService.prototype.translatePageTypeToPortalPageType = function (pageType) {
                switch (pageType) {
                    case 1 /* UserProfile */:
                        return 0 /* UserProfile */;
                    case 2 /* ArtistProfile */:
                        return 1 /* ArtistProfile */;
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
