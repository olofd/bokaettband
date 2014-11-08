var app;
(function (app) {
    var appModule = angular.module('app', [
        'angular-crop',
        'angular-loading-bar',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'app.pageComponents',
        'app.raphael',
        'app.shared',
        'app.startPage',
        'app.auth',
        'app.identity',
        'app.log',
        'app.profile',
        'app.portal',
    ]);
    appModule.config(['$stateProvider', '$urlRouterProvider', '$anchorScrollProvider', '$locationProvider', 'cfpLoadingBarProvider', function ($stateProvider, $urlRouterProvider, $anchorScrollProvider, $locationProvider, cfpLoadingBarProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        cfpLoadingBarProvider.includeSpinner = false;
        console.log("olof");
    }]);
    appModule.run([
        '$state',
        '$rootScope',
        function ($state, $rootScope) {
            $rootScope.$state = $state;
            $rootScope.notfound = function () {
                $state.go('baseState.404', {}, { location: false });
            };
        }
    ]);
    function initApp() {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
        });
    }
    app.initApp = initApp;
})(app || (app = {}));
