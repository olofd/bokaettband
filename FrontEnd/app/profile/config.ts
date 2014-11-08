module app.profile {
    export interface IPortalRouteObject {
        profileRouteObject: ng.ui.IState;
        profileRouteEditObject: ng.ui.IState;
        registerProfileStates: ($stateProvider, stateBase, outerView, url) => void;
    }
    export interface IPortalRouteProvider {
        $get: () => IPortalRouteObject;
    }
    var profileModule = angular.module('app.profile',
        [

            'app.startPage',
            'app.pageComponents'

        ]);
    profileModule.provider('profileRoutes', () => {
        return {
            $get: () => {
                var routeObject = {
                    profileRouteObject: {
                        templateUrl: "app/profile/views/profile.html",
                        controller: 'profileCtrl',
                        resolve: {
                            viewModel: [
                                '$stateParams','profileService',
                                ($stateParams, profileService : app.profile.ProfileService) => {
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
                                ($stateParams) => {
                                    return $stateParams.url;
                                }
                            ]
                        }
                    },
                    registerProfileStates: ($stateProvider, stateBase, outerView, url) => {
                        $stateProvider.state(stateBase + ".profile", {
                            url: url,
                            views: (function () {
                                var viewObject = {};
                                viewObject[outerView] = routeObject.profileRouteObject;
                                return viewObject;

                            } ())

                        });
                        $stateProvider.state(stateBase + ".profile.edit", {
                            url: '/edit',
                            views: (function () {
                                var viewObject = {};
                                viewObject[outerView] = routeObject.profileRouteEditObject;
                                return viewObject;

                            } ())

                        });
                        $stateProvider.state(stateBase + ".profile.images", {
                            url: "/images",
                            views: (function () {
                                var viewObject = {};
                                viewObject["profile-content"] = {
                                    templateUrl: 'app/profile/views/profile-images.html'
                                };
                                return viewObject;

                            } ())

                        });
                    }

                }
                     return routeObject;
            }
        };
    });
    profileModule.config([
        '$stateProvider', 'profileRoutesProvider', ($stateProvider: ng.ui.IStateProvider, profileRoutes: IPortalRouteProvider) => {


            var profileRoutesObject = profileRoutes.$get();
            profileRoutesObject.registerProfileStates($stateProvider, "baseState", "@", '/{url}');
           
            //registerProfileStates("baseState.portal.page", "left-menu-wrapper-view@baseState.portal", '');

        }
    ]);
} 