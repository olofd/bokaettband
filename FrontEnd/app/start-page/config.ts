/// <reference path="../../scripts/typings/angular-ui/angular-ui-router.d.ts" />
angular.module('app.startPage',
    [




    ]);

angular.module('app.startPage').config(['$stateProvider', '$urlRouterProvider', 'pageComponentsConfig',
    ($stateProvider : ng.ui.IStateProvider, $urlRouterProvider : ng.ui.IUrlRouterProvider) => {
        $stateProvider.state("baseState.startPage", {
            url: "/",
            views: {
                '@': {
                    templateUrl: 'app/start-page/views/start-page.html',
                    controller: 'startPageCtrl',
                    resolve: {
                        viewModel: [
                            '$stateParams', ($stateParams: ng.ui.IStateParamsService) => {
                                return null;

                            }
                        ]
                    }
                }

            }
        });


    }]);
