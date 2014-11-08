var app;
(function (app) {
    var shared;
    (function (shared) {
        var ArtistService = (function () {
            function ArtistService($http, $rootScope) {
                this.$http = $http;
                this.$rootScope = $rootScope;
            }
            ArtistService.prototype.post = function (viewModel) {
                return this.$http.post("/api/artist", viewModel).then(function (res) {
                    return res.data;
                });
            };
            ArtistService.$inject = ['$http', '$rootScope'];
            return ArtistService;
        })();
        shared.ArtistService = ArtistService;
        angular.module('app.shared').service("artistService", ArtistService);
    })(shared = app.shared || (app.shared = {}));
})(app || (app = {}));
//# sourceMappingURL=artist-service.js.map