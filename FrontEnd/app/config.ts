﻿module app {
    export var config: IAppConfig = {
        configuration: ConfigurationType.Debug,
        uiRouterErrorHandling: {
            clearLogBetweenState: true,
            displayLoadingTime : true,
            logStateChangeStart: true,
            logViewContentLoading: true,
            logViewContentLoaded : true,
            logStateChangeSuccess : true,
            logStateChangeError: true,
            logStateNotFound: true,
            logTemplateFetch: true,
            logXHRRequests: true,
            redirectOnRegularJSError : true,
            redirectToNotFoundState : true,
            redirectToErrorState: true,
            redirectOnRoutingError : true,
            showErrorPageOnRegularJSError : true,
            notFoundState : {
                name: "baseState.404",
                config: {
                    url: "/404?to",
                    views: {
                        '@': {
                            templateUrl: 'app/page-components/views/404.html',
                            controller: ['$scope', 'viewModel', ($scope, viewModel) => {
                                $scope.vm = viewModel;
                            }],
                            resolve: {
                                viewModel: ['$stateParams', ($stateParams) => {
                                    return {
                                        to: $stateParams.to
                                    };

                                }]
                            }
                        }
                    }
                }
            }, 
            errorState : {
                name: "baseState.error",
                config: {
                    url: "/error?errorCode&friendlyError&technicalError",
                    views: {
                        '@': {
                            templateUrl: 'app/page-components/views/error.html',
                            controller: ['$scope', 'viewModel', ($scope, viewModel) => {
                
                                $scope.vm = viewModel;
                            }],
                            resolve: {
                                viewModel: ['$stateParams', ($stateParams) => {
              
                                    return {
                                        errorCode: $stateParams.errorCode,
                                        friendlyError: $stateParams.friendlyError,
                                        technicalError: $stateParams.technicalError
                                    };

                                }]
                            }

                        }

                    }
                }
            }
        }
    };
}