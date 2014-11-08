module app.identity {
    export class UserService {
        static $inject = ['$http'];
        constructor(private $http) {
        }
        getUserPagesDescription(url) : ng.IHttpPromise<IUserPageDescription[]> {
            return this.$http.get('/api/User/' + url + '/GetUserPagesDescriptions');
        }
    }
}
angular.module('app.auth').service("userService", app.identity.UserService);
