angular.module('app.auth').controller('loginCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    'appAuthService',
    '$cookies',
    'toastService',
    function ($scope, $state, $rootScope, appAuthService, $cookies, toastService) {
        $scope.vm = {
            rememberMe: ($cookies.applicationRememberMe == "true"),
            errorDescription: "",
            login: function () {
                appAuthService.login($scope.vm.userName, $scope.vm.password, $scope.vm.rememberMe).catch(function (data) {
                    if (data["error_description"]) {
                        $scope.vm.errorDescription = data["error_description"];
                    }
                    else {
                        $scope.vm.errorDescription = "Login failed";
                    }
                    toastService.error($scope.vm.errorDescription);
                }).then(function (user) {
                    $state.go('baseState.profile', { url: user.Url });
                });
            }
        };
        //<-------------WATCHES------------->//
        $scope.$watch('vm.rememberMe', function (value) {
            if (value !== undefined && value !== null) {
                $cookies.applicationRememberMe = value.toString();
            }
        });
    }
]);
