angular.module('app.auth').controller('loginCtrl', [
    '$scope', '$state', '$rootScope', 'appAuthService', '$cookies', 'toastService',
    ($scope, $state, $rootScope, appAuthService, $cookies, toastService: app.toast.ToastService) => {
        $scope.vm = {
            rememberMe: ($cookies.applicationRememberMe == "true"),
            errorDescription: "",
            login: () => {
                appAuthService.login($scope.vm.userName, $scope.vm.password, $scope.vm.rememberMe)
                    .catch((data) => {
                        if (data["error_description"]) {
                            $scope.vm.errorDescription = data["error_description"];
                        } else {
                            $scope.vm.errorDescription = "Login failed";
                        }
                        toastService.error($scope.vm.errorDescription);
                    }).then((user) => {
                        $state.go('baseState.portal.page.start', { user: user.Url });
                    });
            }
        };

        //<-------------WATCHES------------->//
        $scope.$watch('vm.rememberMe', (value) => {
            if (value !== undefined && value !== null) {
                $cookies.applicationRememberMe = value.toString();
            }
        });
    }
]);