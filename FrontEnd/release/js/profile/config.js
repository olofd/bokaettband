var app;
(function (app) {
    var profile;
    (function (profile) {
        var profileModule = angular.module('app.profile', [
            'app.startPage',
            'app.pageComponents'
        ]);
        profileModule.provider('profileRoutes', function () {
            return {
                $get: function () {
                    var routeObject = {
                        profileRouteObject: {
                            templateUrl: "app/profile/views/profile.html",
                            controller: 'profileCtrl',
                            resolve: {
                                viewModel: [
                                    '$stateParams',
                                    'profileService',
                                    function ($stateParams, profileService) {
                                        console.log("LOADING PROFILE", $stateParams);
                                        return profileService.getProfileViewModel($stateParams.url);
                                    }
                                ]
                            }
                        },
                        profileRouteEditObject: {
                            templateUrl: "app/profile/views/profile-edit.html",
                            controller: 'profileCtrl',
                            resolve: {
                                viewModel: [
                                    '$stateParams',
                                    function ($stateParams) {
                                        return $stateParams.url;
                                    }
                                ]
                            }
                        },
                        registerProfileStates: function ($stateProvider, stateBase, outerView, url) {
                            $stateProvider.state(stateBase + ".profile", {
                                url: url,
                                views: (function () {
                                    var viewObject = {};
                                    viewObject[outerView] = routeObject.profileRouteObject;
                                    return viewObject;
                                }())
                            });
                            $stateProvider.state(stateBase + ".profile.edit", {
                                url: '/edit',
                                views: (function () {
                                    var viewObject = {};
                                    viewObject[outerView] = routeObject.profileRouteEditObject;
                                    return viewObject;
                                }())
                            });
                            $stateProvider.state(stateBase + ".profile.images", {
                                url: "/images",
                                views: (function () {
                                    var viewObject = {};
                                    viewObject["profile-content"] = {
                                        templateUrl: 'app/profile/views/profile-images.html'
                                    };
                                    return viewObject;
                                }())
                            });
                        }
                    };
                    return routeObject;
                }
            };
        });
        profileModule.config([
            '$stateProvider',
            'profileRoutesProvider',
            function ($stateProvider, profileRoutes) {
                var profileRoutesObject = profileRoutes.$get();
                profileRoutesObject.registerProfileStates($stateProvider, "baseState", "@", '/{url}');
                //registerProfileStates("baseState.portal.page", "left-menu-wrapper-view@baseState.portal", '');
            }
        ]);
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
