angular.module('app.auth').controller('registerCtrl', [
    '$scope', 'appAuthService', 'toastService', 'urlService', '$state',
    ($scope, appAuthService: app.auth.AuthService, toastService: app.toast.ToastService, urlService: app.shared.UrlService, $state) => {

        $scope.vm = {
            baseUrl: 'http://www.bokaettband.se/',
            isLoading: false,
            profileHelpIsCollapsed: true,
            encodedUrl : "",
            user: {
            },
            registerUser: () => {
                $scope.vm.user.Url = $scope.vm.encodedUrl.replace($scope.vm.baseUrl, '');
                appAuthService.registerUser($scope.vm.user).then((user) => {
                    toastService.success("Registreringen gick bra!");
                    $state.go('baseState.profile', { url: user.Url });
                }).catch((error) => {
                        toastService.error(error);
                    });
            }

        };
    }
]);