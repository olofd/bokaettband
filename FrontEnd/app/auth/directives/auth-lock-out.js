angular.module('app.auth').directive('authLockOut', ['$state', 'toastService', '$rootScope', '$location', '$timeout', function ($state, toastService, $rootScope, $location, $timeout) {
    return {
        restrict: 'AC',
        link: function (scope, elem) {
        }
    };
}]);
//# sourceMappingURL=auth-lock-out.js.map