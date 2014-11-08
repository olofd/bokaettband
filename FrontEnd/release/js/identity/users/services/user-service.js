var app;
(function (app) {
    var identity;
    (function (identity) {
        var UserService = (function () {
            function UserService($http) {
                this.$http = $http;
            }
            UserService.prototype.getUserPagesDescription = function (url) {
                return this.$http.get('/api/User/' + url + '/GetUserPagesDescriptions');
            };
            UserService.$inject = ['$http'];
            return UserService;
        })();
        identity.UserService = UserService;
    })(identity = app.identity || (app.identity = {}));
})(app || (app = {}));
angular.module('app.auth').service("userService", app.identity.UserService);
