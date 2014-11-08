var app;
(function (app) {
    var auth;
    (function (auth) {
        var authModule = angular.module('app.auth', [
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
            '$stateProvider',
            'pageComponentsConfig',
            function ($stateProvider, pageComponentsConfig) {
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
        authModule.run(['appAuthService', '$timeout', function (appAuthService, $timeout) {
            appAuthService.updateRequestHeaderFromCookie();
            appAuthService.getUserInfo().then(function (res) {
            });
        }]);
    })(auth = app.auth || (app.auth = {}));
})(app || (app = {}));
