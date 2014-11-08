module app.shared {
    var sharedModule = angular.module('app.shared', [
        'ui.router'
    ]);
    sharedModule.constant('appConfigShared', app.config);
    sharedModule.config(['$urlRouterProvider', '$stateProvider','appConfigShared',
        ($urlRouterProvider, $stateProvider: ng.ui.IStateProvider, appConfig) => {
            $stateProvider.state(appConfig.uiRouterErrorHandling.errorState.name, appConfig.uiRouterErrorHandling.errorState.config);
            $stateProvider.state(appConfig.uiRouterErrorHandling.notFoundState.name, appConfig.uiRouterErrorHandling.notFoundState.config);
        }]);
}
