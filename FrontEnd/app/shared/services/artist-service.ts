module app.shared {
    export class ArtistService implements IEntityService<ArtistViewModel> {
        static $inject = ['$http', '$rootScope'];
        constructor(private $http, private $rootScope) {
        }
        post(viewModel: ArtistViewModel) : ng.IPromise<ArtistViewModel> {
            return this.$http.post("/api/artist", viewModel).then((res) => {
                return res.data;
            });
        }
    }
    angular.module('app.shared').service("artistService", ArtistService);
} 