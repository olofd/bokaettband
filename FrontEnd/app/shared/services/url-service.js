var app;
(function (app) {
    var shared;
    (function (shared) {
        var UrlService = (function () {
            function UrlService($http, $rootScope) {
                this.$http = $http;
                this.$rootScope = $rootScope;
            }
            UrlService.prototype.checkProfileUrlAvaliablity = function (url) {
                return this.$http.get('/api/Url/UrlAvaliablity?url=' + url).then(function (res) {
                    return res.data;
                });
            };
            UrlService.$inject = ['$http', '$rootScope'];
            return UrlService;
        })();
        shared.UrlService = UrlService;
    })(shared = app.shared || (app.shared = {}));
})(app || (app = {}));
angular.module('app.shared').service("urlService", app.shared.UrlService);
//# sourceMappingURL=url-service.js.map