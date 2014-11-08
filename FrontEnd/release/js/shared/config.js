var app;
(function (app) {
    var shared;
    (function (shared) {
        var sharedModule = angular.module('app.shared', [
            'ui.router'
        ]);
        sharedModule.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
            $stateProvider.state("baseState.404", {
                url: "/404",
                views: {
                    '@': {
                        templateUrl: 'app/page-components/views/404.html'
                    }
                }
            });
            $urlRouterProvider.otherwise("/");
        }]);
    })(shared = app.shared || (app.shared = {}));
})(app || (app = {}));
