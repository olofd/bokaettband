var app;
(function (app) {
    var profile;
    (function (profile) {
        var ProfileService = (function () {
            function ProfileService($http, $q, $rootScope) {
                this.$http = $http;
                this.$q = $q;
                this.$rootScope = $rootScope;
            }
            ProfileService.prototype.getProfileViewModel = function (url) {
                var _this = this;
                var d = this.$q.defer();
                this.$http.get("/api/profile/" + url).then(function (res) {
                    if (res.data !== null) {
                        d.resolve(res.data);
                    }
                    else {
                        _this.$rootScope.notfound();
                    }
                });
                return d.promise;
            };
            ProfileService.prototype.createProfile = function (url) {
                //this.$http.post("/api/profile/" + url).then((res) => {
            };
            ProfileService.prototype.postProfileViewModel = function (url) {
            };
            ProfileService.$inject = ['$http', '$q', '$rootScope'];
            return ProfileService;
        })();
        profile.ProfileService = ProfileService;
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
angular.module('app.profile').service("profileService", app.profile.ProfileService);
