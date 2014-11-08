var app;
(function (app) {
    var shared;
    (function (shared) {
        var sharedModule = angular.module('app.shared', [
            'ui.router'
        ]);
        sharedModule.constant('appConfigShared', app.config);
        sharedModule.config(['$urlRouterProvider', '$stateProvider', 'appConfigShared', function ($urlRouterProvider, $stateProvider, appConfig) {
            $stateProvider.state(appConfig.uiRouterErrorHandling.errorState.name, appConfig.uiRouterErrorHandling.errorState.config);
            $stateProvider.state(appConfig.uiRouterErrorHandling.notFoundState.name, appConfig.uiRouterErrorHandling.notFoundState.config);
        }]);
    })(shared = app.shared || (app.shared = {}));
})(app || (app = {}));
//# sourceMappingURL=config.js.map