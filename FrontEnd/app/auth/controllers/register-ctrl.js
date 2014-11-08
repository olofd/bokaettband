angular.module('app.auth').controller('registerCtrl', [
    '$scope',
    'appAuthService',
    'toastService',
    'urlService',
    '$state',
    function ($scope, appAuthService, toastService, urlService, $state) {
        $scope.vm = {
            baseUrl: 'http://www.bokaettband.se/',
            isLoading: false,
            profileHelpIsCollapsed: true,
            encodedUrl: "",
            user: {},
            registerUser: function () {
                $scope.vm.user.Url = $scope.vm.encodedUrl.replace($scope.vm.baseUrl, '');
                appAuthService.registerUser($scope.vm.user).then(function (user) {
                    toastService.success("Registreringen gick bra!");
                    $state.go('baseState.profile', { url: user.Url });
                }).catch(function (error) {
                    toastService.error(error);
                });
            }
        };
    }
]);
//# sourceMappingURL=register-ctrl.js.map