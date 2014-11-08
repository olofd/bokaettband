var app;
(function (app) {
    var portal;
    (function (portal) {
        var authModule = angular.module('app.portal', [
            'app.startPage',
            'app.pageComponents',
            'app.profile'
        ]);
        authModule.config([
            '$stateProvider',
            'profileRoutesProvider',
            function ($stateProvider, profileRoutes) {
                var profileRoutesObject = profileRoutes.$get();
                var leftMenuObject = {
                    templateUrl: "app/portal/views/portal-left-menu.html",
                    controller: 'portalLeftMenuCtrl',
                    resolve: {
                        viewModel: [
                            '$stateParams',
                            '$state',
                            'portalService',
                            function ($stateParams, $state, portalService) {
                                return portalService.getLeftMenuViewModel($stateParams.url);
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
                                viewModel: ['$stateParams', function ($stateParams) {
                                    return null;
                                }]
                            }
                        },
                    }
                });
                $stateProvider.state("baseState.portal.page", {
                    abstract: true,
                    url: '/portal/{url}',
                    views: {
                        "portal-wrapper-left-menu": leftMenuObject
                    }
                });
                $stateProvider.state("baseState.portal.page.settings", {
                    url: '/settings',
                    views: {
                        "portal-wrapper-content-view@baseState.portal": {
                            templateUrl: 'app/portal/views/portal-settings.html',
                            controller: 'profileSettingsCtrl',
                            resolve: {
                                viewModel: [function () {
                                    return {};
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
                            controller: 'profileStartCtrl',
                            resolve: {
                                viewModel: [function () {
                                    return {};
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
                                viewModel: function () {
                                    return null;
                                }
                            }
                        }
                    }
                });
                profileRoutesObject.registerProfileStates($stateProvider, "baseState.portal.page", "portal-wrapper-content-view@baseState.portal", '');
            }
        ]);
    })(portal = app.portal || (app.portal = {}));
})(app || (app = {}));
