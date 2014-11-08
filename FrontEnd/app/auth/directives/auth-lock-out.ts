angular.module('app.auth').directive('authLockOut', ['$state', 'toastService', '$rootScope', '$location', '$timeout', function ($state, toastService : app.toast.ToastService, $rootScope, $location, $timeout) {
    return {
        restrict: 'AC',
        link: function (scope, elem) {
           
        }
    };
}]);