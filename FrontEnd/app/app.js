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
        'app.portal'
    ]);
    appModule.constant('appConfig', app.config);
    appModule.config(['$stateProvider', '$urlRouterProvider', '$anchorScrollProvider', '$locationProvider', 'cfpLoadingBarProvider', 'appConfig', function ($stateProvider, $urlRouterProvider, $anchorScrollProvider, $locationProvider, cfpLoadingBarProvider, appConfig) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        cfpLoadingBarProvider.includeSpinner = false;
        $urlRouterProvider.otherwise("/");
    }]);
    appModule.run([
        '$state',
        '$rootScope',
        'appAuthService',
        'errorHandlerService',
        function ($state, $rootScope, appAuthService, errorHandlerService) {
            errorHandlerService.setupErrorHandling();
            appAuthService.setupLockout();
        }
    ]);
    function initApp() {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
        });
    }
    app.initApp = initApp;
})(app || (app = {}));
//# sourceMappingURL=app.js.map