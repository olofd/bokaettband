module app.auth {
    var authModule = angular.module('app.auth',
        [
            'ui.router',
            'http-auth-interceptor',
            'app.identity',
            'ngCookies',
            'ngSanitize',
            'app.toast',
            'app.pageComponents',
            'app.shared'

        ]);

    authModule.config([
        '$stateProvider', 'pageComponentsConfig', ($stateProvider: ng.ui.IStateProvider, pageComponentsConfig: app.pageComponents.IPageComponentsConfig) => {

            $stateProvider.state(pageComponentsConfig.baseStateName + ".login", {
                url: '/loggain',
                views: {
                    "@": {
                        templateUrl: "app/auth/views/login.html",
                        controller: 'loginCtrl'
                    }

                }

            });
            $stateProvider.state(pageComponentsConfig.baseStateName + ".register", {
                url: '/regristrera',
                views: {
                    "@": {
                        templateUrl: "app/auth/views/register.html",
                        controller: 'registerCtrl'
                    }

                }

            });
        }
    ]);
    authModule.run(['appAuthService', '$timeout', (appAuthService: app.auth.AuthService, $timeout) => {
        appAuthService.updateRequestHeaderFromCookie();

        appAuthService.getUserInfo().then((res) => {
        });
    }]);
}