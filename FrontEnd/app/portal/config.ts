module app.portal {
    var authModule = angular.module('app.portal',
        [

            'app.startPage',
            'app.pageComponents',
            'app.profile'

        ]);

    authModule.config([
        '$stateProvider', 'profileRoutesProvider', ($stateProvider: ng.ui.IStateProvider, profileRoutes: app.profile.IPortalRouteProvider) => {
            var profileRoutesObject = profileRoutes.$get();
            var leftMenuObject = {
                templateUrl: "app/portal/views/portal-left-menu.html",
                controller: 'portalLeftMenuCtrl',
                resolve: {
                    viewModel: [
                        '$stateParams', '$state', 'portalService',
                        ($stateParams, $state, portalService: app.portal.PortalService) => {
                            //return portalService.getLeftMenuViewModel($stateParams.user);
                        }
                    ]
                }
            };


            $stateProvider.state("baseState.portal", {
                abstract: true,
                views: {
                    "@": {
                        templateUrl: "app/portal/views/portal-menu-wrapper.html",
                        controller: 'leftMenuWrapperCtrl',
                        resolve: {
                            viewModel: ['$stateParams',
                                ($stateParams) => {
                                    return null;
                                }]
                        }
                    },


                }
            });

            $stateProvider.state("baseState.portal.page", {
                abstract: true,
                url: '/portal/{user}',
                views: {
                    "portal-wrapper-left-menu": leftMenuObject
                }
            });
            $stateProvider.state("baseState.portal.page.create", {
                url: '/create/:type',
                views: {
                    "portal-wrapper-content-view@baseState.portal": {
                        templateUrl: 'app/portal/views/portal-create-page.html',
                        controller: 'portalCreatePageCtrl',
                        resolve: {
                            viewModel: ['$stateParams', 'portalService', ($stateParams, portalService: app.portal.PortalService) => {
                                return portalService.getCreatePageViewModel($stateParams.type, $stateParams.user);
                            }],
                            entityService: ['artistService', '$stateParams', (artistService, $stateParams) => {
                                if ($stateParams.type === "band") {
                                    return artistService;
                                }
                            }]
                        }
                    }
                }
            });
            $stateProvider.state("baseState.portal.page.settings", {
                url: '/settings',
                views: {
                    "portal-wrapper-content-view@baseState.portal": {
                        templateUrl: 'app/portal/views/portal-settings.html',
                        controller: 'portalSettingsCtrl',
                        resolve: {
                            viewModel: ['portalService', (portalService: app.portal.PortalService) => {
                                return null;
                            }]
                        }
                    }
                }
            });
            $stateProvider.state("baseState.portal.page.start", {
                url: '/start',
                views: {
                    "portal-wrapper-content-view@baseState.portal": {
                        templateUrl: 'app/portal/views/portal-start.html',
                        controller: 'portalStartCtrl',
                        resolve: {
                            viewModel: ['$stateParams', 'portalService', ($stateParams, portalService: app.portal.PortalService) => {
                                return portalService.getStartPageViewModel($stateParams.url);
                            }]
                        }
                    }
                }
            });

            $stateProvider.state("baseState.portal.page.edit", {
                url: '/edit',
                views: {
                    "portal-wrapper-content-view@baseState.portal": profileRoutesObject.profileRouteEditObject,
                    "portal-wrapper-top-menu@baseState.portal": {
                        templateUrl: 'app/portal/views/portal-top-menu.html',
                        controller: 'portalTopMenuCtrl',
                        resolve: {
                            viewModel: () => {
                                return null;
                            }
                        }
                    }
                }
            });


            profileRoutesObject.registerProfileStates($stateProvider, "baseState.portal.page", "portal-wrapper-content-view@baseState.portal", '/{url}');

        }
    ]);
}  