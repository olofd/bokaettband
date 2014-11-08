angular.module('app.pageComponents').controller('mainMenuCtrl', [
    '$scope',
    'appAuthService',
    '$state',
    function ($scope, appAuthService, $state) {
        $scope.vm = {
            logOut: function () {
                appAuthService.logOut();
                appAuthService.getUserInfo();
                $state.go($state.current, {}, { reload: true });
            }
        };
        //<-------------WATCHES------------->//
    }
]);
