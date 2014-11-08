module app.shared {
    export class UrlService {
        static $inject = ['$http', '$rootScope'];
        constructor(private $http, private $rootScope) {
        }
        checkProfileUrlAvaliablity(url) {
            return this.$http.get('/api/Url/UrlAvaliablity?url=' + url).then((res) => {
                return res.data;
            });
        }

    }
}
angular.module('app.shared').service("urlService", app.shared.UrlService);
 