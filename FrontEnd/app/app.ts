
module app {
    var appModule = angular.module('app',
        [
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

    appModule.config(['$stateProvider', '$urlRouterProvider', '$anchorScrollProvider', '$locationProvider', 'cfpLoadingBarProvider', 'appConfig',
        ($stateProvider, $urlRouterProvider, $anchorScrollProvider, $locationProvider, cfpLoadingBarProvider, appConfig : app.IAppConfig) => {
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
            cfpLoadingBarProvider.includeSpinner = false;
            $urlRouterProvider.otherwise("/");

        }]);

    appModule.run([
        '$state', '$rootScope', 'appAuthService', 'errorHandlerService',
        ($state, $rootScope, appAuthService: app.auth.AuthService, errorHandlerService: app.shared.ErrorHandler) => {
            errorHandlerService.setupErrorHandling();
            appAuthService.setupLockout();


        }
    ]);
    export function initApp() {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
        });
    }
}

