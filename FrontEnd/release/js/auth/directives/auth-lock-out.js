angular.module('app.auth').directive('authLockOut', ['$state', 'log', '$rootScope', '$location', '$timeout', function ($state, log, $rootScope, $location, $timeout) {
    return {
        restrict: 'AC',
        link: function (scope, elem) {
            var lockOff;
            var togglePreventNavigation = function () {
                lockOff = $rootScope.$on('$stateChangeStart', function (event) {
                    event.preventDefault();
                });
            };
            scope.$on('event:auth-loginRequired', function () {
                elem.addClass('waiting-for-angular');
                log.error("Access denied, please Login");
                if (lockOff !== undefined) {
                    lockOff();
                    lockOff = undefined;
                }
                var returnUrlObject = $location.search();
                var returnUrl;
                if (returnUrlObject.returnUrl) {
                    returnUrl = returnUrlObject.returnUrl;
                }
                else {
                    returnUrl = window.location.hash;
                }
                $location.path('login').search({ returnUrl: returnUrl });
                $location.replace();
                $timeout(function () {
                    togglePreventNavigation();
                }, 0);
            });
            scope.$on('event:auth-loginConfirmed', function (ev, user) {
                if (lockOff) {
                    lockOff();
                }
                var returnUrlObject = $location.search();
                if (returnUrlObject.returnUrl) {
                    window.location.hash = returnUrlObject.returnUrl;
                }
                if (elem.hasClass('waiting-for-angular')) {
                    elem.removeClass('waiting-for-angular');
                }
            });
        }
    };
}]);
