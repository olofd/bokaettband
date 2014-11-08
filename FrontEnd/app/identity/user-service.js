var app;
(function (app) {
    (function (identity) {
        var UserService = (function () {
            function UserService($http, $rootScope) {
                this.$http = $http;
                this.$rootScope = $rootScope;
            }
            UserService.prototype.checkProfileUrlAvaliablity = function (url) {
            };
            UserService.$inject = ['$http', '$rootScope'];
            return UserService;
        })();
        identity.UserService = UserService;
    })(app.identity || (app.identity = {}));
    var identity = app.identity;
})(app || (app = {}));
angular.module('app.auth').service("userService", app.identity.UserService);
//# sourceMappingURL=user-service.js.map
