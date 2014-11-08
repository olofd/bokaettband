angular.module('app.pageComponents').controller('mainMenuCtrl', [
    '$scope', 'appAuthService','$state',
    ($scope, appAuthService: app.auth.AuthService, $state) => {

        $scope.vm = {
            logOut : () => {
                appAuthService.logOut();
                appAuthService.getUserInfo(false);
                $state.go($state.current, {}, { reload: true });
            }
        };

        //<-------------WATCHES------------->//
    }
]);