angular.module('app.pageComponents').controller('mainMenuCtrl', [
    '$scope',
    'appAuthService',
    '$state',
    function ($scope, appAuthService, $state) {
        $scope.vm = {
            logOut: function () {
                appAuthService.logOut();
                appAuthService.getUserInfo(false);
                $state.go($state.current, {}, { reload: true });
            }
        };
        //<-------------WATCHES------------->//
    }
]);
//# sourceMappingURL=main-menu-ctrl.js.map