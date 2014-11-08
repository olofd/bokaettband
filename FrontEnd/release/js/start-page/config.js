/// <reference path="../../scripts/typings/angular-ui/angular-ui-router.d.ts" />
angular.module('app.startPage', [
]);
angular.module('app.startPage').config(['$stateProvider', '$urlRouterProvider', 'pageComponentsConfig', function ($stateProvider, $urlRouterProvider) {
    console.log("Startpage");
    $stateProvider.state("baseState.startPage", {
        url: "/",
        views: {
            '@': {
                templateUrl: 'app/start-page/views/start-page.html',
                controller: 'startPageCtrl',
                resolve: {
                    viewModel: [
                        '$stateParams',
                        function ($stateParams) {
                            return null;
                        }
                    ]
                }
            }
        }
    });
}]);
