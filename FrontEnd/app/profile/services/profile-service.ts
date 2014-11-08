module app.profile {
    export class ProfileService {
        static $inject = ['$http', '$q', '$rootScope'];
        constructor(private $http, private $q: ng.IQService, private $rootScope) {
        }
        getProfileViewModel(url): ng.IPromise<IProfileViewModel> {
            var d = this.$q.defer();
            this.$http.get("/api/profile/" + url).then((res) => {
                if (res.data !== null) {
                    d.resolve(res.data);
                   
                } else {
                    this.$rootScope.notfound("profileUrl " + url);

                }
               
            });
            return d.promise;
        }
        createProfile(url) {
            //this.$http.post("/api/profile/" + url).then((res) => {
        }
        postProfileViewModel(url) {

        }
    }
}
angular.module('app.profile').service("profileService", app.profile.ProfileService);
