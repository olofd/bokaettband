var app;
(function (app) {
    (function (ConfigurationType) {
        ConfigurationType[ConfigurationType["Debug"] = 0] = "Debug";
        ConfigurationType[ConfigurationType["Release"] = 1] = "Release";
    })(app.ConfigurationType || (app.ConfigurationType = {}));
    var ConfigurationType = app.ConfigurationType;
})(app || (app = {}));
//# sourceMappingURL=iconfig.js.map
var app;
(function (app) {
    app.config = {
        configuration: 0 /* Debug */,
        uiRouterErrorHandling: {
            clearLogBetweenState: true,
            displayLoadingTime: true,
            logStateChangeStart: true,
            logViewContentLoading: true,
            logViewContentLoaded: true,
            logStateChangeSuccess: true,
            logStateChangeError: true,
            logStateNotFound: true,
            logTemplateFetch: true,
            logXHRRequests: true,
            redirectOnRegularJSError: true,
            redirectToNotFoundState: true,
            redirectToErrorState: true,
            redirectOnRoutingError: true,
            showErrorPageOnRegularJSError: true,
            notFoundState: {
                name: "baseState.404",
                config: {
                    url: "/404?to",
                    views: {
                        '@': {
                            templateUrl: 'app/page-components/views/404.html',
                            controller: ['$scope', 'viewModel', function ($scope, viewModel) {
                                $scope.vm = viewModel;
                            }],
                            resolve: {
                                viewModel: ['$stateParams', function ($stateParams) {
                                    return {
                                        to: $stateParams.to
                                    };
                                }]
                            }
                        }
                    }
                }
            },
            errorState: {
                name: "baseState.error",
                config: {
                    url: "/error?errorCode&friendlyError&technicalError",
                    views: {
                        '@': {
                            templateUrl: 'app/page-components/views/error.html',
                            controller: ['$scope', 'viewModel', function ($scope, viewModel) {
                                $scope.vm = viewModel;
                            }],
                            resolve: {
                                viewModel: ['$stateParams', function ($stateParams) {
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
})(app || (app = {}));
//# sourceMappingURL=config.js.map
var app;
(function (app) {
    var appModule = angular.module('app', [
        'angular-crop',
        'angular-loading-bar',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'app.pageComponents',
        'app.raphael',
        'app.shared',
        'app.startPage',
        'app.auth',
        'app.identity',
        'app.log',
        'app.profile',
        'app.portal'
    ]);
    appModule.constant('appConfig', app.config);
    appModule.config(['$stateProvider', '$urlRouterProvider', '$anchorScrollProvider', '$locationProvider', 'cfpLoadingBarProvider', 'appConfig', function ($stateProvider, $urlRouterProvider, $anchorScrollProvider, $locationProvider, cfpLoadingBarProvider, appConfig) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        cfpLoadingBarProvider.includeSpinner = false;
        $urlRouterProvider.otherwise("/");
    }]);
    appModule.run([
        '$state',
        '$rootScope',
        'appAuthService',
        'errorHandlerService',
        function ($state, $rootScope, appAuthService, errorHandlerService) {
            errorHandlerService.setupErrorHandling();
            appAuthService.setupLockout();
        }
    ]);
    function initApp() {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
        });
    }
    app.initApp = initApp;
})(app || (app = {}));
//# sourceMappingURL=app.js.map
var app;
(function (app) {
    var toast;
    (function (toast) {
        var toastModule = angular.module('app.toast', ['toastr']);
        toastModule.config(['toastrConfig', function (toastrConfig) {
            angular.extend(toastrConfig, {
                allowHtml: true,
                closeButton: false,
                closeHtml: '<button>&times;</button>',
                containerId: 'toast-container',
                extendedTimeOut: 1000,
                iconClasses: {
                    error: 'toast-error',
                    info: 'toast-info',
                    success: 'toast-success',
                    warning: 'toast-warning'
                },
                messageClass: 'toast-message',
                positionClass: 'toast-bottom-right',
                tapToDismiss: false,
                timeOut: 2000,
                titleClass: 'toast-title',
                toastClass: 'toast'
            });
        }]);
    })(toast = app.toast || (app.toast = {}));
})(app || (app = {}));
//# sourceMappingURL=config.js.map
var app;
(function (app) {
    var toast;
    (function (toast) {
        var ToastMessage = (function () {
            function ToastMessage(message, level) {
                this.message = message;
                this.level = level;
            }
            return ToastMessage;
        })();
        toast.ToastMessage = ToastMessage;
        var ToastService = (function () {
            function ToastService(toastr) {
                this.toastr = toastr;
                this.toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "positionClass": "toast-bottom-right",
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                this.toastRows = [];
            }
            ToastService.prototype.toast = function (toastRow) {
                this.toastRows.push(toastRow);
                this.toastr[toastRow.level](toastRow.message);
            };
            ToastService.prototype.info = function (message) {
                this.toast(new ToastMessage(message, "info"));
            };
            ToastService.prototype.success = function (message) {
                this.toast(new ToastMessage(message, "success"));
            };
            ToastService.prototype.error = function (message) {
                if (typeof message === "string") {
                    this.toast(new ToastMessage(message, "error"));
                }
                if (typeof message === "object") {
                    if (message.hasOwnProperty("data")) {
                        if (message.data.hasOwnProperty("ExceptionMessage")) {
                            this.toast(new ToastMessage(message.data.ExceptionMessage, "error"));
                        }
                    }
                }
            };
            ToastService.prototype.warning = function (message) {
                this.toast(new ToastMessage(message, "warning"));
            };
            ToastService.$inject = ['toastr'];
            return ToastService;
        })();
        toast.ToastService = ToastService;
    })(toast = app.toast || (app.toast = {}));
})(app || (app = {}));
angular.module('app.toast').service("toastService", app.toast.ToastService);
//# sourceMappingURL=toast-service.js.map
angular.module('app.log', [
    'toastr'
]);
angular.module('app.log').constant('logConfig', {
    loggerUrl: 'api/log'
});
//# sourceMappingURL=config.js.map
var app;
(function (app) {
    var log;
    (function (log) {
        var LogRow = (function () {
            function LogRow(message, level) {
                this.message = message;
                this.level = level;
            }
            return LogRow;
        })();
        log.LogRow = LogRow;
        var LogService = (function () {
            function LogService(logConfig) {
                this.logConfig = logConfig;
                this.logRows = [];
                this.loggerUrl = 'api/log';
            }
            LogService.prototype.sendLog = function (messageIn, levelIn) {
                //return this.$http.post(this.logConfig.loggerUrl,
                //    {
                //        message: messageIn,
                //        level: levelIn,
                //        source: this.GetFileName(),
                //    });
                return null;
            };
            LogService.prototype.log = function (msg, color) {
                color = color || "black";
                var bgc = "White";
                switch (color) {
                    case "success":
                        color = "Black";
                        bgc = "LimeGreen";
                        break;
                    case "info":
                        color = "DodgerBlue";
                        bgc = "Turquoise";
                        break;
                    case "error":
                        color = "Red";
                        bgc = "White";
                        break;
                    case "start":
                        color = "OliveDrab";
                        bgc = "PaleGreen";
                        break;
                    case "warning":
                        color = "Tomato";
                        bgc = "Black";
                        break;
                    case "end":
                        color = "Orchid";
                        bgc = "MediumVioletRed";
                        break;
                    default:
                        color = color;
                }
                if (typeof msg == "object") {
                    console.log(msg);
                }
                else if (typeof color == "object") {
                    console.log("%c" + msg, "color: PowderBlue;font-weight:bold; background-color: RoyalBlue;");
                    console.log(color);
                }
                else {
                    console.log("%c" + msg, "color:" + color + ";font-weight:bold; background-color: " + bgc + ";");
                }
            };
            LogService.prototype.navigatedTo = function (message) {
                this.sendLog(message, "NavigatedTo");
            };
            LogService.prototype.debug = function (message) {
                this.sendLog(message, "Debug");
            };
            LogService.prototype.info = function (message) {
                this.sendLog(message, "Info");
            };
            LogService.prototype.success = function (message) {
                this.sendLog(message, "Info");
            };
            LogService.prototype.error = function (message) {
                if (typeof message === "string") {
                    this.sendLog(message, "Error");
                }
                if (typeof message === "object") {
                    if (message.hasOwnProperty("data")) {
                        if (message.data.hasOwnProperty("ExceptionMessage")) {
                            this.sendLog(message.data.ExceptionMessage, "Error");
                        }
                    }
                }
            };
            LogService.prototype.warning = function (message) {
                this.sendLog(message, "Warn");
            };
            LogService.prototype.fatal = function (message) {
                this.sendLog(message, "Fatal");
            };
            LogService.prototype.GetFileName = function () {
                var url = document.location.href;
                return url;
            };
            LogService.$inject = ['logConfig'];
            return LogService;
        })();
        log.LogService = LogService;
    })(log = app.log || (app.log = {}));
})(app || (app = {}));
angular.module('app.log').service("logService", app.log.LogService);
//# sourceMappingURL=log-service.js.map
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
//# sourceMappingURL=config.js.map
angular.module('app.auth').controller('loginCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    'appAuthService',
    '$cookies',
    'toastService',
    function ($scope, $state, $rootScope, appAuthService, $cookies, toastService) {
        $scope.vm = {
            rememberMe: ($cookies.applicationRememberMe == "true"),
            errorDescription: "",
            login: function () {
                appAuthService.login($scope.vm.userName, $scope.vm.password, $scope.vm.rememberMe).catch(function (data) {
                    if (data["error_description"]) {
                        $scope.vm.errorDescription = data["error_description"];
                    }
                    else {
                        $scope.vm.errorDescription = "Login failed";
                    }
                    toastService.error($scope.vm.errorDescription);
                }).then(function (user) {
                    $state.go('baseState.portal.page.start', { user: user.Url });
                });
            }
        };
        //<-------------WATCHES------------->//
        $scope.$watch('vm.rememberMe', function (value) {
            if (value !== undefined && value !== null) {
                $cookies.applicationRememberMe = value.toString();
            }
        });
    }
]);
//# sourceMappingURL=login-ctrl.js.map
angular.module('app.auth').controller('registerCtrl', [
    '$scope',
    'appAuthService',
    'toastService',
    'urlService',
    '$state',
    function ($scope, appAuthService, toastService, urlService, $state) {
        $scope.vm = {
            baseUrl: 'http://www.bokaettband.se/',
            isLoading: false,
            profileHelpIsCollapsed: true,
            encodedUrl: "",
            user: {},
            registerUser: function () {
                $scope.vm.user.Url = $scope.vm.encodedUrl.replace($scope.vm.baseUrl, '');
                appAuthService.registerUser($scope.vm.user).then(function (user) {
                    toastService.success("Registreringen gick bra!");
                    $state.go('baseState.profile', { url: user.Url });
                }).catch(function (error) {
                    toastService.error(error);
                });
            }
        };
    }
]);
//# sourceMappingURL=register-ctrl.js.map
angular.module('app.auth').directive('authLockOut', ['$state', 'toastService', '$rootScope', '$location', '$timeout', function ($state, toastService, $rootScope, $location, $timeout) {
    return {
        restrict: 'AC',
        link: function (scope, elem) {
        }
    };
}]);
//# sourceMappingURL=auth-lock-out.js.map
angular.module('app.auth').directive('autoFillableField', [
    '$timeout',
    function ($timeout) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                $timeout(function () {
                    if (ngModel.$viewValue !== element.val()) {
                        ngModel.$setViewValue(element.val());
                    }
                }, 500);
            }
        };
    }
]);
//# sourceMappingURL=auto-fillable-field.js.map
/// <reference path="../../../scripts/typings/cryptojs/cryptojs.d.ts" />
var app;
(function (app) {
    var auth;
    (function (auth) {
        var AuthService = (function () {
            function AuthService($http, $rootScope, $cookies, logService, $q, $sanitize, authService, $location) {
                this.$http = $http;
                this.$rootScope = $rootScope;
                this.$cookies = $cookies;
                this.logService = logService;
                this.$q = $q;
                this.$sanitize = $sanitize;
                this.authService = authService;
                this.$location = $location;
            }
            AuthService.prototype.registerUser = function (user) {
                var _this = this;
                var defered = this.$q.defer();
                this.logOut();
                var newUserObject = {};
                for (var prop in user) {
                    if (prop === "Password" || prop === "ConfirmPassword") {
                        newUserObject[prop + "Encrypted"] = this.encryptString(this.$sanitize(user[prop]));
                    }
                    else {
                        newUserObject[prop] = user[prop];
                    }
                }
                this.$http({
                    url: "/api/User/Register",
                    data: newUserObject,
                    dataType: "json",
                    method: "POST",
                }).then(function () {
                    _this.login(user.Email, user.Password, false).then(function (loggedInUser) {
                        defered.resolve(loggedInUser);
                    }).catch(function (error) {
                        debugger;
                        defered.reject(error.error_description);
                    });
                }).catch(function (error) {
                    if (error.data.ExceptionMessage) {
                        defered.reject(error.data.ExceptionMessage);
                    }
                    if (error.data.ModelState) {
                        defered.reject(error.data.ModelState[""][0]);
                    }
                });
                return defered.promise;
            };
            AuthService.prototype.login = function (userName, password, rememberMe) {
                var _this = this;
                var defered = this.$q.defer();
                this.$http({
                    url: "/Token",
                    data: "grant_type=password&username=" + userName + "&password=" + this.$sanitize(password),
                    dataType: "json",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).success(function (data, status, headers, config) {
                    if (data.access_token) {
                        var barer = 'Bearer ' + data.access_token;
                        if (rememberMe) {
                            _this.$cookies.applicationAuthorization = barer;
                        }
                        _this.$http.defaults.headers.common.Authorization = barer;
                        _this.getUserInfo().then(function (user) {
                            defered.resolve(user);
                            _this.authService.loginConfirmed(user);
                        });
                    }
                }).error(function (data, status, headers, config) {
                    defered.reject(data);
                });
                return defered.promise;
            };
            AuthService.prototype.updateRequestHeaderFromCookie = function () {
                if (this.$cookies.applicationAuthorization) {
                    this.$http.defaults.headers.common.Authorization = this.$cookies.applicationAuthorization;
                }
            };
            AuthService.prototype.encryptString = function (stringToEncrypt) {
                var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
                var encrypted = CryptoJS.AES.encrypt(stringToEncrypt, "Secret", {
                    keySize: 128,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                return encrypted.toString();
            };
            AuthService.prototype.logOut = function () {
                this.loggedInUser = undefined;
                this.$rootScope.loggedInUser = undefined;
                delete this.$http.defaults.headers.common.Authorization;
                delete this.$cookies.applicationAuthorization;
            };
            AuthService.prototype.getUserInfo = function (usecache) {
                var _this = this;
                if (usecache === void 0) { usecache = true; }
                var defered = this.$q.defer();
                if (this.loggedInUser && usecache) {
                    defered.resolve(this.loggedInUser);
                }
                this.$http.get("/api/User/GetExtraUserInfo").success(function (data, status, headers, config) {
                    if (data && data.UserName) {
                        _this.loggedInUser = data;
                        _this.$rootScope.$broadcast('event:auth-loginConfirmed');
                        _this.$rootScope.loggedInUser = data;
                    }
                    defered.resolve(_this.loggedInUser);
                }).error(function (data, status, headers, config) {
                    defered.reject(status);
                });
                return defered.promise;
            };
            AuthService.prototype.setupLockout = function () {
                var _this = this;
                this.$rootScope.$on('event:auth-loginRequired', function () {
                    var returnUrlObject = _this.$location.search();
                    var returnUrl;
                    if (returnUrlObject.returnUrl) {
                        returnUrl = returnUrlObject.returnUrl;
                    }
                    else {
                        returnUrl = window.location.pathname;
                    }
                    _this.$location.path('loggain').search({ returnUrl: returnUrl });
                    _this.$location.replace();
                });
                this.$rootScope.$on('event:auth-loginConfirmed', function (ev, user) {
                    var returnUrlObject = _this.$location.search();
                    if (returnUrlObject.returnUrl) {
                        _this.$location.path(returnUrlObject.returnUrl).search({});
                        _this.$location.replace();
                    }
                });
            };
            AuthService.$inject = ['$http', '$rootScope', '$cookies', 'logService', '$q', '$sanitize', 'authService', '$location'];
            return AuthService;
        })();
        auth.AuthService = AuthService;
    })(auth = app.auth || (app.auth = {}));
})(app || (app = {}));
angular.module('app.auth').service("appAuthService", app.auth.AuthService);
//# sourceMappingURL=auth-service.js.map
angular.module('app.auth').directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val() === $(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    };
}]);
//# sourceMappingURL=pw-check.js.map
var app;
(function (app) {
    var shared;
    (function (shared) {
        var sharedModule = angular.module('app.shared', [
            'ui.router'
        ]);
        sharedModule.constant('appConfigShared', app.config);
        sharedModule.config(['$urlRouterProvider', '$stateProvider', 'appConfigShared', function ($urlRouterProvider, $stateProvider, appConfig) {
            $stateProvider.state(appConfig.uiRouterErrorHandling.errorState.name, appConfig.uiRouterErrorHandling.errorState.config);
            $stateProvider.state(appConfig.uiRouterErrorHandling.notFoundState.name, appConfig.uiRouterErrorHandling.notFoundState.config);
        }]);
    })(shared = app.shared || (app.shared = {}));
})(app || (app = {}));
//# sourceMappingURL=config.js.map
var app;
(function (app) {
    var shared;
    (function (shared) {
        var UrlService = (function () {
            function UrlService($http, $rootScope) {
                this.$http = $http;
                this.$rootScope = $rootScope;
            }
            UrlService.prototype.checkProfileUrlAvaliablity = function (url) {
                return this.$http.get('/api/Url/UrlAvaliablity?url=' + url).then(function (res) {
                    return res.data;
                });
            };
            UrlService.$inject = ['$http', '$rootScope'];
            return UrlService;
        })();
        shared.UrlService = UrlService;
    })(shared = app.shared || (app.shared = {}));
})(app || (app = {}));
angular.module('app.shared').service("urlService", app.shared.UrlService);
//# sourceMappingURL=url-service.js.map
var _this = this;
angular.module('app.shared').directive('blueImpImageGallery', [
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function (event) {
                    event = event || window.event;
                    var target = event.target || event.srcElement, link = target.src ? target.parentNode : target, options = { index: link, event: event }, links = _this.getElementsByTagName('a');
                    window.blueimp.Gallery(links, options);
                });
            }
        };
    }
]);
//# sourceMappingURL=blueimp-image-gallery.js.map
angular.module('app.shared').directive('circularImage', [function () {
    return {
        link: function (scope, element, attrs) {
        },
        templateUrl: 'app/shared/views/circular-image.html',
        replace: true
    };
}]);
//# sourceMappingURL=circular-image.js.map
var AppError = (function () {
    function AppError(technicalError, friendlyError, errorCode) {
        if (technicalError === void 0) { technicalError = "No extra info"; }
        if (friendlyError === void 0) { friendlyError = "Ops, något gick fel, testa att ladda om sidan!"; }
        if (errorCode === void 0) { errorCode = 0; }
        this.technicalError = technicalError;
        this.friendlyError = friendlyError;
        this.errorCode = errorCode;
        this.message = technicalError;
        this.stack = (new Error()).stack;
    }
    AppError.prototype.toString = function () {
        return this.friendlyError + ": <" + this.technicalError + ">";
    };
    return AppError;
})();
var app;
(function (app) {
    var shared;
    (function (shared) {
        var Timer = (function () {
            function Timer() {
                if (window.performance.now) {
                    this.hasPerformanceMeasure = true;
                }
            }
            Timer.prototype.guid = function () {
                function _p8(s) {
                    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
                }
                return _p8() + _p8(true) + _p8(true) + _p8();
            };
            Timer.prototype.registerTimer = function (timerName) {
                this.timers = this.timers || {};
                var startTime = window.performance.now();
                this.timers[timerName] = startTime;
            };
            Timer.prototype.timeSinceLast = function (timerName, removeFromMemory) {
                if (removeFromMemory === void 0) { removeFromMemory = false; }
                var result = 0.0, startTime;
                if (this.timers) {
                    startTime = this.timers[timerName];
                    if (!startTime)
                        startTime = window.performance.now();
                }
                var endTime = window.performance.now();
                result = endTime - startTime;
                if (result) {
                    if (removeFromMemory)
                        delete this.timers[timerName];
                    return result.toFixed(2).toString() + "ms";
                }
            };
            return Timer;
        })();
        shared.Timer = Timer;
        var ErrorHandler = (function () {
            function ErrorHandler($rootScope, logService, $state, appConfig, errorDelegater, timer) {
                this.$rootScope = $rootScope;
                this.logService = logService;
                this.$state = $state;
                this.appConfig = appConfig;
                this.errorDelegater = errorDelegater;
                this.timer = timer;
                this.firstNavigation = true;
                this.viewsFirstLoad = 0;
                this.viewsFirstLoaded = 0;
            }
            ErrorHandler.prototype.getPerformanceString = function () {
                var startString = "";
                if (this.appConfig.uiRouterErrorHandling.displayLoadingTime) {
                    var time = this.timer.timeSinceLast("$stateChangeStart");
                    if (time) {
                        startString += time + " => ";
                    }
                }
                return startString;
            };
            ErrorHandler.prototype.redirectToErrorPage = function (appError) {
                if (this.appConfig.uiRouterErrorHandling.redirectToErrorState) {
                    this.$state.go('baseState.error', this.buildException(appError), { location: 'replace' });
                }
            };
            ErrorHandler.prototype.redirectToNotFoundPage = function (unfoundState) {
                if (this.appConfig.uiRouterErrorHandling.redirectToNotFoundState) {
                    this.$state.go('baseState.404', this.buildNotFound(unfoundState), { location: 'replace' });
                }
            };
            ErrorHandler.prototype.buildNotFound = function (unfoundState) {
                unfoundState = unfoundState || {};
                unfoundState.to = unfoundState.to || "unknown state";
                return unfoundState;
            };
            ErrorHandler.prototype.buildException = function (appException) {
                appException = appException || {};
                if (appException instanceof AppError) {
                    return appException;
                }
                appException.errorCode = appException.errorCode || 999;
                appException.friendlyError = appException.friendlyError || "Okänt fel";
                if (appException.technicalError) {
                    appException.technicalError = appException.technicalError;
                }
                else if (appException.status) {
                    appException.technicalError = appException.status.toString();
                    if (appException.status === 404) {
                        appException.friendlyError = "Kunde inte hitta resursen";
                        appException.errorCode = 404;
                        if (appException.config && appException.config.url) {
                            appException.technicalError += ", probably missing template " + appException.config.url;
                        }
                    }
                }
                else if (appException.message) {
                    appException.technicalError = appException.message;
                }
                return appException;
            };
            ErrorHandler.prototype.setupErrorHandling = function () {
                var _this = this;
                this.$rootScope.$on('$stateChangeStart', function () {
                    _this.$stateChangeStart.apply(_this, arguments);
                });
                this.$rootScope.$on('$viewContentLoading', function () {
                    _this.$viewContentLoading.apply(_this, arguments);
                });
                this.$rootScope.$on('$viewContentLoaded', function () {
                    _this.$viewContentLoaded.apply(_this, arguments);
                });
                this.$rootScope.$on('$stateChangeSuccess', function () {
                    _this.$stateChangeSuccess.apply(_this, arguments);
                });
                this.$rootScope.$on('$stateChangeError', function () {
                    _this.$stateChangeError.apply(_this, arguments);
                });
                this.$rootScope.$on('$stateNotFound', function () {
                    _this.$stateNotFound.apply(_this, arguments);
                });
                this.$rootScope.notfound = function (errorMessage) {
                    var unfoundState = {
                        to: errorMessage
                    };
                    _this.$stateNotFound(undefined, unfoundState);
                };
                this.errorDelegater.listenForError(function (appError) {
                    _this.redirectToErrorPage(appError);
                });
            };
            ErrorHandler.prototype.$stateChangeStart = function (event, toState, toParams, fromState, fromParams) {
                if (app.config.uiRouterErrorHandling.displayLoadingTime) {
                    this.timer.registerTimer("$stateChangeStart");
                }
                if (this.appConfig.configuration == 0 /* Debug */ && this.appConfig.uiRouterErrorHandling.logStateChangeStart) {
                    if (this.appConfig.uiRouterErrorHandling.clearLogBetweenState && toState.name !== this.appConfig.uiRouterErrorHandling.errorState.name && toState.name !== this.appConfig.uiRouterErrorHandling.notFoundState.name) {
                        console.clear();
                    }
                    var toParamsString = this.paramsToString(toParams);
                    var fromParamsString = this.paramsToString(fromParams);
                    if (fromState.name)
                        this.logService.log(this.getPerformanceString() + "Leaving state: " + fromState.name + ", params: ( " + fromParamsString + " )", "info");
                    this.logService.log(this.getPerformanceString() + "Started transition to state: " + toState.name + ", params: ( " + toParamsString + " )", "start");
                }
            };
            ErrorHandler.prototype.$viewContentLoading = function (event, viewConfig) {
                if (this.appConfig.configuration == 0 /* Debug */ && this.appConfig.uiRouterErrorHandling.logViewContentLoading) {
                    this.logService.log(this.getPerformanceString() + "Loading view " + viewConfig.view.templateUrl + " with ctrl " + viewConfig.view.controller, "info");
                }
                if (this.firstNavigation && window.appStartTime) {
                    this.viewsFirstLoad++;
                }
            };
            ErrorHandler.prototype.$viewContentLoaded = function (event) {
                if (this.appConfig.configuration == 0 /* Debug */ && this.appConfig.uiRouterErrorHandling.logViewContentLoaded) {
                    var performance = this.getPerformanceString();
                    if (performance) {
                        this.logService.log(performance + "View rendered", "info");
                        if (this.firstNavigation && window.appStartTime) {
                            this.viewsFirstLoaded++;
                            if (this.viewsFirstLoad === this.viewsFirstLoaded) {
                                this.firstNavigation = false;
                                var difference = (window.performance.now() - window.appStartTime).toFixed(2);
                                this.logService.log("App started and fully rendered in " + difference + "ms", "warning");
                            }
                        }
                    }
                }
            };
            ErrorHandler.prototype.$stateChangeSuccess = function (event, toState, toParams, fromState, fromParams) {
                if (this.appConfig.configuration == 0 /* Debug */ && this.appConfig.uiRouterErrorHandling.logStateChangeSuccess) {
                    var toParamsString = this.paramsToString(toParams);
                    this.logService.log(this.getPerformanceString() + "Successfully transitioned to state: " + toState.name + ", params: ( " + toParamsString + " )", "success");
                }
            };
            ErrorHandler.prototype.$stateChangeError = function (event, toState, toParams, fromState, fromParams, error) {
                if (this.appConfig.configuration == 0 /* Debug */ && this.appConfig.uiRouterErrorHandling.logStateChangeError) {
                    var toParamsString = this.paramsToString(toParams);
                    this.logService.log(this.getPerformanceString() + "Error in transition to state: " + toState.name + ", params: ( " + toParamsString + " ). Error::: " + error, "error");
                }
                if (this.appConfig.uiRouterErrorHandling.redirectOnRoutingError) {
                    this.redirectToErrorPage(error);
                }
            };
            ErrorHandler.prototype.$stateNotFound = function (event, unfoundState, fromState, fromParams) {
                if (this.appConfig.configuration == 0 /* Debug */ && this.appConfig.uiRouterErrorHandling.logStateNotFound) {
                    var toState = !!unfoundState ? unfoundState.to : "unknown";
                    this.logService.log(this.getPerformanceString() + "Error in transition to state " + toState, "error");
                }
                this.redirectToNotFoundPage(unfoundState);
            };
            ErrorHandler.prototype.paramsToString = function (params) {
                var result = "none";
                if (params) {
                    var keys = Object.keys(params);
                    if (keys.length) {
                        result = Object.keys(params).reduce(function (previousParam, key) {
                            var thisParam = key + ' : ' + params[key];
                            if (!previousParam)
                                return thisParam;
                            return previousParam + ', ' + thisParam;
                        }, null);
                    }
                }
                return result;
            };
            ErrorHandler.$inject = ['$rootScope', 'logService', '$state', 'appConfig', 'errorDelegater', 'timer'];
            return ErrorHandler;
        })();
        shared.ErrorHandler = ErrorHandler;
        var ErrorDelegater = (function () {
            function ErrorDelegater() {
            }
            ErrorDelegater.prototype.listenForError = function (errorHandler) {
                this.errorHandler = errorHandler;
            };
            ErrorDelegater.prototype.emitError = function (appError) {
                if (this.errorHandler)
                    this.errorHandler(appError);
            };
            return ErrorDelegater;
        })();
        shared.ErrorDelegater = ErrorDelegater;
        angular.module('app.shared').config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(['$q', 'timer', 'logService', 'appConfig', function ($q, timer, logService, appConfig) {
                var logConfig = function (config) {
                    if (appConfig.configuration === 0 /* Debug */) {
                        var isTemplate = (config.url && config.url.indexOf(".html") === -1);
                        if (isTemplate && appConfig.uiRouterErrorHandling.logXHRRequests) {
                            //XHR
                            config.guid = config.guid || timer.guid();
                            return {
                                type: "XHR",
                                guid: config.guid
                            };
                        }
                        else if (!isTemplate && app.config.uiRouterErrorHandling.logTemplateFetch) {
                            //TEMPLATE
                            config.guid = config.guid || timer.guid();
                            return {
                                type: "TEMPLATE",
                                guid: config.guid
                            };
                        }
                    }
                };
                var logResonse = function (response) {
                    var logConf = logConfig(response.config);
                    if (logConf) {
                        var logString = "Did not have text for this statustype";
                        var logType = response.status === 200 ? "success" : (response.status === 500 || response.status === 400) ? "error" : "info";
                        if (response.status === 200) {
                            logString = "Successfully";
                            if (logConf.type === "XHR") {
                                logString += " completed XHR request for resource " + response.config.url;
                            }
                            if (logConf.type === "TEMPLATE") {
                                logString += " fetched template " + response.config.url;
                            }
                        }
                        if (response.status === 500) {
                            logString = "Error";
                            if (logConf.type === "XHR") {
                                logString += " making XHR request for resource " + response.config.url;
                            }
                            if (logConf.type === "TEMPLATE") {
                                logString += " fetching template " + response.config.url;
                            }
                            if (response.data && response.data.ExceptionMessage) {
                                logString += " (EXCEPTION)=> " + response.data.ExceptionMessage;
                            }
                        }
                        if (response.status === 400) {
                            logString = "Bad request";
                            if (logConf.type === "XHR") {
                                logString += " making XHR request for resource " + response.config.url;
                            }
                            if (logConf.type === "TEMPLATE") {
                                logString += " fetching template " + response.config.url;
                            }
                            if (response.data && response.data.ModelState) {
                                var modelState = response.data.ModelState[""];
                                if (modelState && modelState.length) {
                                    logString += " (ERROR)=> " + modelState[0];
                                }
                            }
                            if (response.data && response.data.error_description) {
                                logString += " (ERROR)=> " + response.data.error_description;
                            }
                        }
                        logService.log(logString + ', ' + timer.timeSinceLast(logConf.guid, true), logType);
                    }
                };
                return {
                    'request': function (config) {
                        var logConf = logConfig(config);
                        if (logConf) {
                            timer.registerTimer(logConf.guid);
                        }
                        return config;
                    },
                    'requestError': function (rejection) {
                        return $q.reject(rejection);
                    },
                    'response': function (response) {
                        logResonse(response);
                        return response;
                    },
                    'responseError': function (rejection) {
                        logResonse(rejection);
                        return $q.reject(rejection);
                    }
                };
            }]);
        }]);
        angular.module('app.shared').service("errorDelegater", ErrorDelegater);
        angular.module('app.shared').factory('$exceptionHandler', ['errorDelegater', function (errorDelegater) {
            return function (exception, cause) {
                console.error(exception.stack, cause);
                errorDelegater.emitError(exception);
            };
        }]);
        angular.module('app.shared').service("errorHandlerService", app.shared.ErrorHandler);
        angular.module('app.shared').service("timer", app.shared.Timer);
    })(shared = app.shared || (app.shared = {}));
})(app || (app = {}));
//# sourceMappingURL=error-handler.js.map
var app;
(function (app) {
    var shared;
    (function (shared) {
        (function (EntityType) {
            EntityType[EntityType["None"] = 0] = "None";
            EntityType[EntityType["User"] = 1] = "User";
            EntityType[EntityType["Artist"] = 2] = "Artist";
            EntityType[EntityType["Arranger"] = 3] = "Arranger";
        })(shared.EntityType || (shared.EntityType = {}));
        var EntityType = shared.EntityType;
    })(shared = app.shared || (app.shared = {}));
})(app || (app = {}));
//# sourceMappingURL=EntityType.js.map
var app;
(function (app) {
    var shared;
    (function (shared) {
        var ArtistService = (function () {
            function ArtistService($http, $rootScope) {
                this.$http = $http;
                this.$rootScope = $rootScope;
            }
            ArtistService.prototype.post = function (viewModel) {
                return this.$http.post("/api/artist", viewModel).then(function (res) {
                    return res.data;
                });
            };
            ArtistService.$inject = ['$http', '$rootScope'];
            return ArtistService;
        })();
        shared.ArtistService = ArtistService;
        angular.module('app.shared').service("artistService", ArtistService);
    })(shared = app.shared || (app.shared = {}));
})(app || (app = {}));
//# sourceMappingURL=artist-service.js.map
var app;
(function (app) {
    var identity;
    (function (identity) {
        var UserService = (function () {
            function UserService($http) {
                this.$http = $http;
            }
            UserService.prototype.getUserPagesDescription = function (url) {
                return this.$http.get('/api/User/' + url + '/GetUserPagesDescriptions');
            };
            UserService.$inject = ['$http'];
            return UserService;
        })();
        identity.UserService = UserService;
    })(identity = app.identity || (app.identity = {}));
})(app || (app = {}));
angular.module('app.auth').service("userService", app.identity.UserService);
//# sourceMappingURL=user-service.js.map
angular.module('app.identity', []);
//# sourceMappingURL=config.js.map
var app;
(function (app) {
    var identity;
    (function (identity) {
        (function (PageType) {
            PageType[PageType["None"] = 0] = "None";
            PageType[PageType["UserProfile"] = 1] = "UserProfile";
            PageType[PageType["ArtistProfile"] = 2] = "ArtistProfile";
        })(identity.PageType || (identity.PageType = {}));
        var PageType = identity.PageType;
    })(identity = app.identity || (app.identity = {}));
})(app || (app = {}));
//# sourceMappingURL=PageType.js.map
var app;
(function (app) {
    var pageComponents;
    (function (pageComponents) {
        (function () {
            var pcModule = angular.module('app.pageComponents', [
                'ui.router'
            ]);
            pcModule.service('materialDesignUpdater', function () {
                return {
                    updatedMaterialDesign: function () {
                        var updateMaterialStyleFunc = app.pageComponents["updateMaterialStyle"];
                        if (updateMaterialStyleFunc) {
                            updateMaterialStyleFunc();
                        }
                    }
                };
            });
            angular.module('app.pageComponents').constant('pageComponentsConfig', {
                baseStateName: 'baseState',
                contentAreaViewName: '@'
            });
            pcModule.config(['$stateProvider', 'pageComponentsConfig', function ($stateProvider, pageComponentsConfig) {
                $stateProvider.state(pageComponentsConfig.baseStateName, {
                    views: {
                        mainmenu: {
                            templateUrl: 'app/page-components/views/main-menu.html',
                            controller: 'mainMenuCtrl'
                        }
                    }
                });
            }]);
            pcModule.constant('pageComponentsConfig', {
                baseStateName: 'baseState',
                contentAreaViewName: '@'
            });
        })();
    })(pageComponents = app.pageComponents || (app.pageComponents = {}));
})(app || (app = {}));
//# sourceMappingURL=config.js.map
angular.module('app.pageComponents').controller('mainMenuCtrl', [
    '$scope',
    'appAuthService',
    '$state',
    function ($scope, appAuthService, $state) {
        $scope.vm = {
            logOut: function () {
                appAuthService.logOut();
                appAuthService.getUserInfo(false);
                $state.go($state.current, {}, { reload: true });
            }
        };
        //<-------------WATCHES------------->//
    }
]);
//# sourceMappingURL=main-menu-ctrl.js.map
angular.module('app.pageComponents').directive('mdUpdate', ['materialDesignUpdater', function (materialDesignUpdater) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            $.material.init();
        }
    };
}]);
//# sourceMappingURL=material-style-udater.js.map
angular.module('app.pageComponents').controller('leftMenuWrapperCtrl', [
    '$scope',
    function ($scope) {
        //<-------------WATCHES------------->//
    }
]);
//# sourceMappingURL=left-menu-wrapper-ctrl.js.map
angular.module('app.pageComponents').directive('holder', function () {
    return {
        link: function (scope, element, attrs) {
            attrs.$set('data-src', attrs['holder']);
            window.Holder.run({ images: element[0] });
        }
    };
});
//# sourceMappingURL=holder.js.map
angular.module('app.pageComponents').directive('urlCreator', ['urlService', function (urlService) {
    return {
        restrict: 'AEC',
        scope: {
            firstParam: "=",
            secondParam: "=",
            baseUrl: "=",
            profileUrlEncoded: "="
        },
        replace: true,
        templateUrl: 'app/page-components/views/url-creator.html',
        controller: ['$scope', function ($scope) {
            var checkAvaliability = function () {
                var url = $scope.profileUrlEncoded.replace($scope.baseUrl, '');
                if (url) {
                    $scope.urlform.profileUrl.$setValidity('loading', false);
                    urlService.checkProfileUrlAvaliablity(url).then(function (isAvaliable) {
                        if (isAvaliable) {
                            $scope.urlform.profileUrl.$setValidity('isAvaliable', true);
                        }
                        else {
                            $scope.urlform.profileUrl.$setValidity('isAvaliable', false);
                        }
                        $scope.urlform.profileUrl.$setValidity('loading', true);
                    });
                }
            };
            var encodeString = function (inputString) {
                var resString = (inputString || '').trim().toLowerCase();
                resString = resString.replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o');
                return resString;
            };
            $scope.vm = {
                ProfileUrl: $scope.profileUrlEncoded,
                nameUpdated: function () {
                    var url = "";
                    if ($scope.firstParam) {
                        url += encodeString($scope.firstParam);
                    }
                    if ($scope.secondParam) {
                        url += encodeString($scope.secondParam);
                    }
                    $scope.profileUrlEncoded = $scope.baseUrl + encodeURIComponent(url);
                    $scope.vm.ProfileUrl = $scope.baseUrl + url;
                    checkAvaliability();
                },
                profileUrlUpdated: function () {
                    if (!$scope.vm.ProfileUrl || $scope.vm.ProfileUrl.indexOf($scope.baseUrl) === -1) {
                        $scope.vm.nameUpdated();
                    }
                    else {
                        var urlPart = $scope.vm.ProfileUrl.replace($scope.baseUrl, '');
                        $scope.profileUrlEncoded = $scope.baseUrl + encodeURIComponent(encodeString(urlPart));
                        checkAvaliability();
                    }
                }
            };
            $scope.$watch('firstParam', function (newVal, oldVal) {
                $scope.vm.nameUpdated();
            });
            $scope.$watch('secondParam', function (newVal, oldVal) {
                $scope.vm.nameUpdated();
            });
        }],
        link: function (scope, element, attrs) {
        }
    };
}]);
//# sourceMappingURL=url-creator.js.map
angular.module('app.pageComponents').directive('userMenu', ['urlService', function (urlService) {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'app/page-components/views/user-menu.html',
        controller: ['$scope', 'portalService', '$rootScope', function ($scope, portalService, $rootScope) {
            $scope.vm = {
                menuItems: [],
                loggedInUser: undefined
            };
            $rootScope.$watch('loggedInUser', function (newVal, oldVal) {
                delete $scope.vm.menuItems;
                delete $scope.vm.loggedInUser;
                if (newVal) {
                    $scope.vm.loggedInUser = newVal;
                    portalService.getUserPagesDescriptionModel(newVal.Url).then(function (res) {
                        if (res) {
                            $scope.vm.menuItems = res.pages;
                        }
                    });
                }
            });
        }],
        link: function (scope, element, attrs) {
        }
    };
}]);
//# sourceMappingURL=user-menu.js.map
/// <reference path="../../scripts/typings/angular-ui/angular-ui-router.d.ts" />
angular.module('app.startPage', [
]);
angular.module('app.startPage').config(['$stateProvider', '$urlRouterProvider', 'pageComponentsConfig', function ($stateProvider, $urlRouterProvider) {
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
//# sourceMappingURL=config.js.map
angular.module('app.startPage').controller('startPageCtrl', ['$scope', 'toastService', function ($scope, toastService) {
    $scope.vm = {
        regions: [
            {
                regionId: "AB",
                count: 10
            }
        ]
    };
    toastService.success('Hello world!');
}]);
//# sourceMappingURL=start-page-ctrl.js.map
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
                                viewModel: ['$stateParams', function ($stateParams) {
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
                                viewModel: ['$stateParams', 'portalService', function ($stateParams, portalService) {
                                    return portalService.getCreatePageViewModel($stateParams.type, $stateParams.user);
                                }],
                                entityService: ['artistService', '$stateParams', function (artistService, $stateParams) {
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
                                viewModel: ['portalService', function (portalService) {
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
                                viewModel: ['$stateParams', 'portalService', function ($stateParams, portalService) {
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
                                viewModel: function () {
                                    return null;
                                }
                            }
                        }
                    }
                });
                profileRoutesObject.registerProfileStates($stateProvider, "baseState.portal.page", "portal-wrapper-content-view@baseState.portal", '/{url}');
            }
        ]);
    })(portal = app.portal || (app.portal = {}));
})(app || (app = {}));
//# sourceMappingURL=config.js.map
angular.module('app.portal').controller('portalLeftMenuCtrl', ['$scope', 'toastService', 'viewModel', function ($scope, toastService, viewModel) {
    $scope.vm = viewModel;
}]);
//# sourceMappingURL=portal-left-menu-ctrl.js.map
angular.module('app.portal').controller('portalTopMenuCtrl', ['$scope', 'toastService', 'viewModel', function ($scope, toastService, viewModel) {
    $scope.vm = viewModel;
}]);
//# sourceMappingURL=portal-top-menu-ctrl.js.map
var app;
(function (app) {
    var portal;
    (function (portal) {
        (function (PageType) {
            PageType[PageType["None"] = 0] = "None";
            PageType[PageType["UserProfile"] = 1] = "UserProfile";
            PageType[PageType["ArtistProfile"] = 2] = "ArtistProfile";
            PageType[PageType["ArrangerPofile"] = 3] = "ArrangerPofile";
            PageType[PageType["Settings"] = 4] = "Settings";
            PageType[PageType["StartPage"] = 5] = "StartPage";
        })(portal.PageType || (portal.PageType = {}));
        var PageType = portal.PageType;
    })(portal = app.portal || (app.portal = {}));
})(app || (app = {}));
//# sourceMappingURL=PortalPageType.js.map
var app;
(function (app) {
    var portal;
    (function (portal) {
        var PortalService = (function () {
            function PortalService($http, userService) {
                this.$http = $http;
                this.userService = userService;
                this.leftProtalMenuViewModels = {};
            }
            PortalService.prototype.getStartPageViewModel = function (url) {
                return this.$http.get("/api/Portal/StartPage/" + url).then(function (res) {
                    return res.data;
                });
            };
            PortalService.prototype.getUserPagesDescriptionModel = function (userUrl) {
                var _this = this;
                return this.userService.getUserPagesDescription(userUrl).then(function (res) {
                    var pages = new Array();
                    _.forEach(res.data, function (pageDesc, index) {
                        pages.push({
                            Name: pageDesc.Name,
                            PageType: _this.translatePageTypeToPortalPageType(pageDesc.PageType),
                            Group: 1,
                            SortOrder: index,
                            Url: pageDesc.Url
                        });
                    });
                    var viewModel = {
                        pages: pages
                    };
                    _this.leftProtalMenuViewModels[userUrl] = viewModel;
                    return viewModel;
                });
            };
            PortalService.prototype.addLeftHandMenuItem = function (url, pageDesc) {
                var vm = this.leftProtalMenuViewModels[url];
                if (vm) {
                    vm.pages.push(pageDesc);
                }
            };
            PortalService.prototype.getCreatePageViewModel = function (type, url) {
                var viewModel = {
                    entity: {
                        EntityType: type === "band" ? 2 /* Artist */ : type === "arranger" ? 3 /* Arranger */ : 0 /* None */,
                    },
                    type_sv: type === "band" ? "band" : type === "arranger" ? "arrangör" : "inget",
                    url: url
                };
                if (viewModel.entity.EntityType === 0 /* None */) {
                    throw new AppError("getCreatePageViewModel => could not find entitytype", "Kunde inte hitta den typ av sida du ville skapa", 2);
                }
                return viewModel;
            };
            PortalService.prototype.translatePageTypeToPortalPageType = function (pageType) {
                switch (pageType) {
                    case 1 /* UserProfile */:
                        return 1 /* UserProfile */;
                    case 2 /* ArtistProfile */:
                        return 2 /* ArtistProfile */;
                    default:
                        return null;
                }
            };
            PortalService.$inject = ['$http', 'userService'];
            return PortalService;
        })();
        portal.PortalService = PortalService;
    })(portal = app.portal || (app.portal = {}));
})(app || (app = {}));
angular.module('app.portal').service("portalService", app.portal.PortalService);
//# sourceMappingURL=portal-service.js.map
angular.module('app.portal').controller('portalStartCtrl', ['$scope', 'viewModel', function ($scope, viewModel) {
    $scope.vm = viewModel;
}]);
//# sourceMappingURL=portal-start-ctrl.js.map
angular.module('app.portal').controller('portalSettingsCtrl', ['$scope', function ($scope) {
    $scope.vm = {};
}]);
//# sourceMappingURL=portal-settings-ctrl.js.map
angular.module('app.portal').controller('portalCreatePageCtrl', ['$scope', 'viewModel', 'entityService', 'portalService', '$state', function ($scope, viewModel, entityService, portalService, $state) {
    $scope.vm = _.extend(viewModel, {
        baseUrl: 'http://www.bokaettband.se/',
        helpIsCollapsed: true,
        createPage: function (entity) {
            entity.Url = entity.Url.replace($scope.vm.baseUrl, '');
            entityService.post(entity).then(function (res) {
                portalService.addLeftHandMenuItem(viewModel.url, {
                    Name: entity.Name,
                    Url: entity.Url,
                    PageType: 2 /* ArtistProfile */
                });
                $state.go('baseState.portal.page.profile', { url: entity.Url });
            });
        }
    });
}]);
//# sourceMappingURL=portal-create-page-ctrl.js.map
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
//# sourceMappingURL=config.js.map
angular.module('app.profile').controller('profileCtrl', ['$scope', 'toastService', 'viewModel', '$state', function ($scope, toastService, viewModel, $state) {
    $scope.vm = viewModel;
    $scope.imageCrop = function (coords) {
        if (parseInt(coords.w) <= 0 || parseInt(coords.h) <= 0)
            return;
        var innerPreview = $('.inner-preview');
        if (innerPreview.length) {
            console.log("Resizing");
            innerPreview.css({
                width: Math.ceil(400) + 'px',
                height: Math.ceil(400) + 'px',
                marginTop: (400 - 400) / 2 + 'px',
                marginLeft: (400 - 400) / 2 + 'px',
            });
            var scalex = 400 / coords.w;
            var scaley = 400 / coords.h;
            innerPreview.find('img').css({
                width: Math.round(scalex * 400) + 'px',
                height: Math.round(scaley * 300) + 'px',
                marginLeft: '-' + Math.round(scalex * coords.x) + 'px',
                marginTop: '-' + Math.round(scaley * coords.y) + 'px'
            });
            var query = '?';
            query += 'crop=(' + coords.x + ',' + coords.y + ',' + coords.x2 + ',' + coords.y2 + ')&cropxunits=' + 400 + '&cropyunits=' + 300;
            console.log(query);
        }
    };
}]);
//# sourceMappingURL=profile-ctrl.js.map
angular.module('app.profile').controller('userMenuCtrl', [
    '$scope', 'toastService', 'viewModel',
    function ($scope, toastService, viewModel) {
        $scope.vm = viewModel;
    }
]);
//# sourceMappingURL=user-menu-ctrl.js.map

angular.module('app.profile').controller('profileStartCtrl', [
    '$scope', 'viewModel',
    function ($scope, viewModel) {
        $scope.vm = viewModel;
    }
]);
//# sourceMappingURL=profile-start-ctrl.js.map

angular.module('app.profile').controller('profileSettingsCtrl', [
    '$scope', 'viewModel',
    function ($scope, viewModel) {
        $scope.vm = viewModel;
    }
]);
//# sourceMappingURL=profile-settings-ctrl.js.map

var app;
(function (app) {
    var profile;
    (function (profile) {
        var ProfileService = (function () {
            function ProfileService($http, $q, $rootScope) {
                this.$http = $http;
                this.$q = $q;
                this.$rootScope = $rootScope;
            }
            ProfileService.prototype.getProfileViewModel = function (url) {
                var _this = this;
                var d = this.$q.defer();
                this.$http.get("/api/profile/" + url).then(function (res) {
                    if (res.data !== null) {
                        d.resolve(res.data);
                    }
                    else {
                        _this.$rootScope.notfound("profileUrl " + url);
                    }
                });
                return d.promise;
            };
            ProfileService.prototype.createProfile = function (url) {
                //this.$http.post("/api/profile/" + url).then((res) => {
            };
            ProfileService.prototype.postProfileViewModel = function (url) {
            };
            ProfileService.$inject = ['$http', '$q', '$rootScope'];
            return ProfileService;
        })();
        profile.ProfileService = ProfileService;
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
angular.module('app.profile').service("profileService", app.profile.ProfileService);
//# sourceMappingURL=profile-service.js.map
angular.module('app.raphael', []);
//# sourceMappingURL=config.js.map
/// <reference path="../../../scripts/typings/angularjs/angular.d.ts" />
var app;
(function (app) {
    var raphael;
    (function (raphael) {
        angular.module('app.raphael').value('raphaelMaps', [
            {
                name: "Region2007",
                pathNames: {
                    "A": "Stockholms stad",
                    "AC": "Västerbottens län",
                    "B": "Stockholms län",
                    "AB": "Stockholms län",
                    "BD": "Norrbottens län",
                    "C": "Uppsala län",
                    "D": "Södermanlands län",
                    "E": "Östergötlands län",
                    "F": "Jönköpings län",
                    "G": "Kronobergs län",
                    "H": "Kalmar län",
                    "I": "Gotlands län",
                    "K": "Blekinge län",
                    "L": "Kristianstads län",
                    "M": "Malmöhus län",
                    "N": "Hallands län",
                    "O": "Göteborgs och Bohus län",
                    "P": "Älvsborgs län",
                    "R": "Skaraborgs län",
                    "S": "Värmlands län",
                    "T": "Örebro län",
                    "U": "Västmanlands län",
                    "W": "Dalarnas län",
                    "X": "Gävleborgs län",
                    "Y": "Västernorrlands län",
                    "Z": "Jämtlands län"
                },
                func: function (paper, options) {
                    var Lan = paper.set();
                    var AB = paper.path("m 189.375,423.6875 -0.1875,2.375 -0.6875,1.5 -1.5,-0.4375 -2.3125,-0.5 -0.4375,2.3125 -0.5,2.25 -1.875,0.625 1.5,1.875 -0.9375,0.375 L 182,440 l -1.6875,1.75 -3.6875,1 -1.0625,3.625 -0.5,0 -0.5,0.125 -0.1875,-0.125 -0.625,0.5625 -0.5,0 -0.75,0.625 -0.4375,0.25 -0.4375,0.0625 -1.875,0.75 0.125,0.3125 -0.4375,0.25 -0.25,-0.1875 -0.5,-0.0625 -0.5625,0.3125 -0.25,0.6875 -0.4375,-0.0625 -0.1875,-0.5625 -0.5625,-0.125 -0.3125,-0.4375 -0.6875,0 -0.6875,-0.125 0.125,0.875 -0.625,0.3125 -0.6875,0.6875 0.1875,0.25 -0.3125,0.5625 -0.375,0.0625 -0.3125,0.375 -0.3125,0.75 0.0625,0.8125 0.9375,0.875 -0.125,0.625 0.0625,0.3125 0.0625,0.3125 -0.25,0.75 -0.3125,0.25 -0.375,0.3125 -0.0625,0.25 0.125,0.3125 0.875,1 0.1875,-0.0625 -0.125,-0.3125 0.125,-0.3125 0.3125,-0.0625 0.1875,0.25 0,0.9375 0.125,0.375 0.375,0 0.125,-0.3125 -0.1875,-0.3125 -0.0625,-0.25 0.3125,-0.4375 0.5,0.0625 0.5,0.375 0.4375,0.25 0.0625,0.4375 0.25,0.3125 0.0625,0.75 0.375,0.1875 0.3125,0.0625 0,0.25 0.25,0.0625 0.25,-0.375 0,-0.9375 0.1875,-0.8125 0.25,-0.0625 0.25,0.6875 0.375,-0.25 0.25,0.25 -0.125,0.3125 -0.0625,0.125 -0.0625,0.125 -0.4375,1.5 -0.0625,0.5625 0.125,0.375 0.25,0.25 0.25,0.375 0.8125,0.875 0.625,0.625 0.9375,0.5 0.1875,0.4375 0.25,0.1875 0.4375,0.125 0.4375,0.4375 0.25,-0.0625 0.375,-0.125 0.125,-0.5 0.0625,-0.5 0.0625,-0.1875 0.125,0.0625 0.4375,0.5 0.4375,0.1875 0.375,0 0.5,-0.125 -0.0625,0.375 -0.0625,0.0625 -0.5,0.125 -0.5625,0.1875 -0.5,0 -0.1875,0.1875 -0.5625,0.125 -0.5,0.25 -0.4375,0.1875 -0.375,0.3125 -0.5625,0.3125 -0.125,0.5 0.1875,0.25 0,1.3125 -0.1875,0.375 -0.1875,-0.375 -0.1875,-0.5 -0.4375,-0.25 -0.875,0 -0.5625,0.125 -0.5,-0.1875 -0.5,0.4375 -0.5,-0.5 -0.25,-0.5 -0.5625,-0.3125 -0.6875,-0.1875 0,0.3125 -0.5,0.0625 -0.25,-0.1875 -0.4375,0.1875 -0.125,0.4375 0.125,0.25 0.1875,0.1875 0.0625,0.3125 0.1875,1 0.3125,0.875 -0.0625,0.3125 -0.375,-0.0625 -0.1875,-0.375 -0.4375,-1 -0.3125,-0.9375 -0.25,-0.375 -0.5625,0 -1.875,-1 -0.6875,-0.8125 -0.3125,0 -0.5625,-0.4375 -0.25,-0.0625 -0.1875,-0.3125 -0.375,0.125 0.0625,0.375 0.25,0.25 -0.0625,1.1875 0.125,0.3125 0.8125,1.3125 0.125,0.375 -0.8125,-0.375 -0.5625,-0.25 -0.6875,0 -0.6875,0.25 -0.4375,-0.75 -1.0625,1.25 0.375,2.375 1.25,2.25 -0.25,4.25 1.875,2.625 3.75,-0.0625 0.125,1.125 1.8125,0.875 0.5,2 0.375,-1.8125 0.5,0.125 0.4375,0.1875 0.25,-0.25 0.1875,-0.875 -0.0625,-1.4375 -0.1875,-2.25 -0.0625,-0.5625 -0.375,-0.25 -0.3125,0.25 -0.125,0.8125 -0.0625,0.625 -0.375,0.875 -0.25,0.1875 -0.1875,-0.625 -0.0625,-1.875 0.4375,-0.75 -0.0625,-0.25 -0.3125,-0.25 0,-0.375 0.1875,-0.1875 0.625,-0.5 -0.125,-0.1875 0.1875,-0.3125 0.1875,0.0625 0.25,-0.0625 0.125,-0.1875 0,-0.5 -0.125,-0.6875 -0.4375,-0.75 -0.0625,-0.375 0.25,-0.25 0.1875,0.1875 0.125,0.375 0.125,0.5 0.1875,0.25 0.25,1.3125 -0.25,0.8125 0,0.625 0.0625,0.75 0.375,0.0625 0.6875,-0.25 0.0625,-0.5625 -0.1875,-0.875 0.125,-0.3125 0.875,-0.5625 -0.0625,0.4375 0.1875,0.625 -0.3125,0.1875 -0.1875,0.5625 0.125,0.5 -0.25,0.375 -0.3125,0.5625 0,0.5 0.3125,0.6875 0.25,1.375 -0.1875,0.5 -0.0625,0.375 0.3125,0.375 -0.0625,1.75 -0.125,0.3125 0.1875,0.4375 0.5625,0.5625 0.5625,1.125 0.5625,1.1875 -0.0625,0.75 -0.3125,0.5 -0.4375,0.5625 0,0.5 1.5,-0.5 0.5625,-2.25 0.375,-0.375 0.375,-1.1875 0.5,-0.625 0.5625,-0.375 0.25,-1.0625 -0.25,-1.5 0.375,-1.125 0.0625,-0.4375 0.125,-0.5 0.1875,0.25 0.125,0.4375 0.1875,-0.0625 0.125,-0.1875 -0.0625,-0.375 -0.25,-1.1875 0.0625,-0.25 0.3125,0.0625 0.0625,0.375 0.25,0.125 0.1875,-0.25 0,-0.375 0.1875,-0.4375 0.375,-0.1875 0.5625,-0.0625 0.3125,-0.125 0.125,-0.4375 0.1875,-0.3125 0.625,-0.1875 0.125,-0.25 1.125,-0.4375 0.375,-0.3125 0.125,-0.25 -0.1875,-0.1875 0.1875,-0.375 0.3125,-0.1875 0.5,-0.0625 0.25,0.1875 0.0625,0.1875 -0.25,0.25 -0.25,0 -0.25,0.1875 -0.125,0.3125 0.1875,0.1875 -0.0625,0.1875 -0.25,0.125 -0.375,0.375 0,0.25 0.0625,0.25 0.3125,-0.125 0.3125,-0.375 0.5625,-0.3125 1.1875,-0.4375 0.375,-0.375 -0.0625,-0.3125 -1.125,0.125 0.375,-0.6875 0.6875,-0.3125 0.3125,-0.1875 0.375,0.0625 0.1875,0 0.5625,-0.625 0.25,0.0625 0.0625,0.1875 0.25,0 0.3125,-0.1875 0.3125,-0.1875 0.5,-1.1875 -0.1875,-0.125 -0.375,0.125 -0.375,0.125 -0.75,-0.3125 -0.3125,-0.3125 0.1875,-0.5625 0.5,-0.3125 0.1875,-0.25 -0.4375,-0.8125 -0.375,-0.0625 -0.375,-0.125 -0.4375,-0.5 -1.25,-0.875 -0.5625,-0.0625 -0.1875,-0.1875 -0.0625,-0.125 0.125,-0.1875 0.375,0 0.875,0.1875 0.4375,0.125 0.25,-0.125 -0.0625,-0.3125 -0.375,-0.125 -0.5625,-0.125 -0.125,-0.3125 -0.1875,-0.4375 -0.375,-0.125 -0.5,0.0625 -0.875,0 -0.1875,-0.25 -0.0625,-0.75 0,-0.5625 -0.1875,0 -0.4375,0.25 -0.875,0.4375 -0.5,0.125 -0.4375,-0.0625 L 176,465.75 l -0.3125,-0.1875 0,-0.0625 0.25,-0.125 -0.125,-0.25 0.4375,-0.0625 0.4375,0.4375 0.375,0.0625 0.3125,-0.1875 0,-0.3125 -0.3125,-0.5 -0.6875,-0.5 L 175.5,463 l 0.625,-0.6875 0.125,-0.5625 0,-0.6875 0.125,-0.25 0.3125,-0.3125 -0.125,-0.25 0.75,-0.5625 0.25,-0.125 0.125,0.4375 0.0625,0.25 0.3125,0 0.5625,-0.3125 0.125,0.125 0,0.25 0,0.4375 -0.1875,0.125 -0.4375,-0.1875 -0.1875,0.3125 -0.0625,0.5625 0,0.5 0.5,0.125 0.375,0.0625 0.375,0.1875 1.3125,-0.125 0.5625,-0.1875 0.1875,-0.25 -0.1875,-0.1875 -0.5625,0 -0.0625,-0.125 0.25,-0.1875 0.125,-0.1875 -0.375,-0.5 -0.1875,-0.25 -0.4375,0.0625 -0.25,-0.0625 -0.125,-0.1875 0.125,-0.25 0.4375,-0.0625 0.375,0.1875 0.5,-0.125 0.25,-0.25 0.125,-0.375 -0.125,-0.25 -0.3125,-0.0625 -0.3125,-0.1875 0.1875,-0.25 0.375,-0.0625 0.1875,0.25 0.1875,0.125 0.3125,-0.125 0.3125,0 0.125,0.3125 0.375,-0.0625 0.3125,0.0625 0.3125,-0.0625 0.4375,-0.8125 0,-0.25 0.125,-0.1875 0.5,-0.125 0.375,-0.375 0.3125,-0.5625 0.1875,-0.125 0.9375,-1.0625 0.4375,-0.0625 0.1875,-0.3125 0.75,-0.5625 0.6875,-0.5 0.5,-0.3125 0.875,-0.5625 1.25,-2.1875 0.3125,-2.5 2.6875,-1.5 3.6875,0.25 1.3125,-0.9375 -0.25,-2.0625 -2.3125,-0.6875 -0.125,-2 1.6875,0 0.875,-2.5 -1.5,-1.25 -2.25,-1.625 -1.75,-2.9375 -1.125,-4.125 L 191,428.5 l 0.3125,-3 -1.9375,-1.8125 z m 5.75,25.6875 -1.375,0.8125 -1.0625,1.875 -1.1875,1.0625 0.4375,0.375 1.9375,-1.5 1.125,0.1875 0.125,-1.1875 1.3125,-0.125 0,-0.9375 -1.3125,-0.5625 z m -5.8125,4.5625 -0.375,0.25 -0.1875,0.25 -1.0625,0.625 -0.125,0.4375 -0.3125,0.375 -0.1875,0.1875 0,0.3125 -0.1875,0.25 0,0.125 0.375,0.0625 0.1875,0.0625 -0.125,0.375 -0.25,0.375 -0.3125,-0.125 -0.0625,-0.3125 -0.25,-0.0625 -0.3125,0.125 -0.125,0.4375 0.1875,0.125 0.125,0.1875 -0.0625,0.5 0.0625,0.3125 0.375,0.25 0.125,0.3125 0,0.5625 0,0.3125 0.375,-0.0625 0.25,-0.4375 0.0625,-0.5625 0.0625,-0.25 0.3125,0 0.1875,-0.1875 0,-0.625 -0.1875,-0.5625 0.125,-0.375 0.1875,-0.1875 0.3125,0.0625 0.375,-0.1875 0.1875,-0.5 0.375,-0.625 0.1875,-0.3125 0.375,-0.0625 0,-0.25 -0.25,-0.125 -0.0625,-0.5 -0.3125,0 0,-0.1875 0.1875,-0.25 -0.25,-0.125 z M 195,459 l -0.4375,0.1875 -0.3125,0.375 -0.1875,0.3125 0,0.3125 0.125,0.4375 -0.0625,0.3125 -0.25,0.375 -0.0625,0.375 0.1875,0.125 0.375,-0.25 0.0625,-0.25 0.125,-0.25 0.375,-0.3125 0.3125,-0.375 0.0625,-0.5 0.25,-0.0625 0.1875,-0.1875 0,-0.375 -0.125,-0.25 -0.3125,0 -0.3125,0 z m -13.4375,0.6875 -0.1875,0.25 -0.0625,0.3125 -0.125,0.4375 0.3125,0.25 0.4375,-0.5 0.5625,-0.125 -0.0625,-0.1875 -0.375,-0.125 -0.25,-0.3125 -0.25,0 z m -16.75,0.125 L 164.5,460 l -0.0625,0.125 0.125,0.25 0.0625,0.5 0.625,1.3125 0.1875,0.75 0.4375,1 0.625,0.9375 0.4375,0.75 0.375,0 0.1875,0.1875 0.3125,0.5 0.6875,0.1875 0.4375,-0.125 0.1875,-0.375 -0.0625,-0.375 -0.25,-0.25 0.0625,-0.3125 0,-0.6875 -0.125,-0.5625 -0.25,-0.4375 -0.0625,-0.25 -0.6875,-0.6875 -0.125,0.125 0.0625,0.3125 L 167.5,463 167.25,462.875 166.9375,462.3125 167,462 l 0.25,-0.125 0.25,0 0.125,-0.125 -0.5,-0.5 -0.4375,-0.1875 L 166.375,461.25 166,461 l -0.5,-0.5625 -0.3125,-0.1875 -0.375,-0.4375 z m 31.25,0.5 -0.25,0.1875 -0.0625,0.375 -0.3125,0.1875 0.1875,0.3125 -0.0625,0.875 0.125,0.25 0.4375,0 0.125,-0.25 -0.125,-0.8125 0.4375,-0.6875 -0.0625,-0.3125 -0.4375,-0.125 z m -11.0625,0.375 -0.25,0.1875 -0.25,-0.0625 -0.1875,0.125 0.0625,0.1875 0.125,0.25 0.3125,0.125 0.125,0.25 0.125,0.4375 0,0.375 -0.125,0.4375 -0.0625,0.375 0.0625,0.1875 0.125,0.25 0.125,0.1875 0,0.4375 -0.1875,1.1875 0,0.375 0.3125,0.1875 0.3125,0 0.8125,0.5 0.5,-0.125 1.1875,-0.25 0.5625,-0.125 0.3125,-0.375 0.125,-0.5 0.0625,-0.4375 -0.25,-0.4375 -0.5,-0.25 -0.6875,-0.25 -0.5,0.125 -0.1875,-0.3125 0.5,-0.125 0.5,-0.0625 0.25,0.0625 0.25,-0.0625 0.25,-0.1875 0,-0.3125 -0.1875,-0.25 -0.3125,0 -0.4375,0.25 -1.5625,-1 -0.375,-1.125 -0.125,-0.125 -0.5,-0.0625 L 185,460.6875 z M 164.0625,461 l -0.4375,0.125 -0.3125,0.125 -0.375,0.3125 0.0625,0.5 0.125,0.4375 0.125,0.3125 0.25,0.125 0.1875,-0.0625 0.25,0 0.375,0.9375 0.25,0.25 0.375,-0.0625 0.0625,0.375 -0.125,0.3125 0.3125,0.125 0.125,0.6875 -0.0625,0.3125 0,0.375 0.1875,0.25 0.375,0.1875 0.875,0.4375 1,0.8125 0.875,-0.0625 0.3125,0.0625 0.1875,0.1875 0.6875,0.1875 0.625,-0.3125 0.125,-0.125 -0.125,-0.3125 -0.75,-0.375 0.0625,-0.1875 -0.3125,-0.0625 -0.5625,0.25 -0.3125,-0.0625 -0.625,-0.25 -0.8125,-0.5 -0.5,-0.375 -0.625,-0.125 -0.5,-1.75 -1.0625,-3.0625 -0.3125,0 z m -2.0625,0.4375 -0.5,0.1875 -0.0625,0.375 0.0625,0.25 0,0.3125 -0.0625,0.25 0.0625,0.1875 0.4375,0.4375 0.1875,0.375 -0.0625,0.375 0.25,0.5 0.375,0.375 0.3125,0.0625 0.1875,-0.3125 -0.125,-0.5 0.0625,-0.3125 0.125,-0.25 0,-0.375 -0.25,-0.25 -0.3125,-0.9375 -0.3125,-0.375 L 162.3125,461.5 162,461.4375 z m 14.6875,0.875 -0.1875,0.125 0,0.1875 0.0625,0.1875 0.3125,0.125 0.1875,0.25 0,0.3125 0.0625,0.25 0.375,0.5625 0.5,0.1875 0.5625,0 0.375,-0.1875 0.3125,-0.1875 0.125,-0.3125 -0.125,-0.1875 -0.0625,-0.125 0.125,-0.125 0.375,-0.0625 0.1875,-0.0625 -0.0625,-0.25 -0.375,-0.125 -0.3125,0.1875 -0.25,-0.0625 -0.6875,-0.125 -0.625,-0.3125 -0.5,-0.1875 -0.375,-0.0625 z m 13.1875,0.125 -0.75,0.3125 0.6875,1.125 0.1875,0.625 0,0.5 -0.0625,0.8125 0.1875,0.125 0.25,-0.125 0.5625,-0.375 0.375,-0.3125 0.125,-0.4375 0,-0.625 -0.0625,-0.5 -0.25,-0.5 -0.625,-0.4375 -0.25,0.25 -0.375,-0.4375 z m 5.375,0.6875 -0.1875,0.0625 -0.25,0.3125 -0.125,0.3125 -0.125,0.625 -0.0625,0.625 -0.1875,0.25 0.8125,0.0625 0.1875,-0.1875 -0.25,-0.375 -0.0625,-0.25 0.25,-0.5625 0,-0.3125 0.3125,-0.1875 -0.0625,-0.25 -0.25,-0.125 z m -13.9375,0.4375 -1,0.0625 -0.0625,0.375 -0.25,0.125 -0.5625,0.3125 -0.0625,1.125 0.0625,0.3125 0,0.1875 0.3125,0.1875 0.5625,0.0625 0.5,-0.25 0.3125,-0.3125 0.125,-0.3125 0.0625,-0.75 0.625,0.125 0.3125,0.125 0.4375,-0.0625 0.25,0.125 -0.1875,0.3125 -0.375,0.25 -0.125,0.1875 0.1875,0.6875 -0.1875,0.1875 -0.1875,0.1875 0.3125,0.1875 0.8125,0.0625 0.4375,0.6875 0.4375,0.1875 0.25,0.6875 0.625,0.375 0.5,0.0625 0.3125,0.6875 1,0.25 0.25,-0.1875 0.3125,-0.3125 0.375,-0.1875 0,-0.5 0.625,-0.1875 0.25,-0.3125 0.375,-0.125 0.4375,-0.125 -0.0625,-0.25 1.125,-1.375 -0.125,-0.25 -1.625,0.5 -1.6875,0.25 0,0.25 0.3125,0.25 -0.125,0.25 -0.1875,0 -0.75,-0.3125 -0.25,-0.3125 -0.5,-0.375 -0.625,-0.1875 -0.6875,0.1875 -0.25,-0.25 0.125,-0.4375 0.4375,-0.6875 0.0625,-0.1875 -0.1875,-0.1875 0.3125,-0.1875 0,-0.3125 -0.75,-0.6875 -0.5,-0.1875 -0.875,0.125 -0.3125,-0.125 -0.5,0.0625 -0.4375,-0.0625 z m -11,0.6875 -0.5,0.0625 -0.125,0.25 L 169.5,465 l 0.0625,0.3125 0.625,0.75 0.3125,0.5 0.375,0.0625 0.375,-0.3125 0.0625,-0.5 0.0625,-0.1875 0.1875,-0.125 -0.0625,-0.3125 -0.25,0 L 171,465 l -0.3125,-0.5625 -0.375,-0.1875 z m 22.3125,1.6875 -0.3125,0.125 -0.625,0.5 -0.3125,0.25 -0.1875,0.5625 0,0.4375 0.25,0 0.375,-0.125 0.375,0.1875 0.3125,-0.3125 0.125,-0.625 0.5,-0.5625 -0.5,-0.4375 z m -1.8125,3.875 -0.25,0.3125 -0.1875,0.3125 -0.5,0.9375 -0.0625,0.3125 0.375,-0.3125 0.375,-0.25 0.5,-0.1875 0.375,-0.125 0.3125,-0.1875 0.125,-0.4375 -0.3125,0 -0.625,0.3125 0.125,-0.5625 -0.25,-0.125 z m -5.25,4.75 -0.0625,0.0625 -1.1875,1.4375 -1,0.4375 -0.0625,0.1875 0.1875,0.0625 0,0.1875 -0.625,0.875 0.0625,0.1875 0.3125,-0.0625 0.0625,0.1875 -0.125,0.125 -0.1875,0.25 -0.1875,0.25 0.0625,0.5625 0.5,0.25 0.5625,-0.1875 0.125,0.375 0.3125,0 0.25,-0.375 0.125,-1.6875 0.625,-0.625 0,-0.625 0.5625,-0.5 0.1875,-0.4375 -0.5,-0.9375 z m -7.125,4.25 -0.6875,0.375 -0.75,0 -0.25,0.125 -0.1875,0.3125 0,0.0625 0.0625,0.375 -0.0625,0.3125 -0.5,0.5 -0.0625,0.1875 0.0625,0.5625 -0.125,0.3125 0.125,0.0625 0.375,-0.125 0.1875,-0.1875 0.1875,-0.5 0.25,-0.125 0.1875,0.1875 0.0625,0.375 0.25,0.1875 0.4375,-0.125 0.25,-0.25 -0.3125,-0.5625 -0.0625,-0.375 0.25,-0.1875 0.25,0.125 0.1875,-0.1875 -0.0625,-0.375 0.1875,-0.375 0.375,-0.0625 0.3125,-0.1875 0.125,-0.25 -0.3125,0 -0.75,-0.1875 z m 4.5,2.125 -0.3125,0.1875 -0.25,0.375 -0.75,0.5 -0.4375,-0.125 -1.4375,0.875 -0.25,0.1875 -0.6875,0.5625 -0.5625,0.5 0.0625,0.375 0.1875,-0.0625 0.375,-0.1875 0.375,-0.375 0.125,0.1875 0,0.375 0.6875,0.0625 0.25,-0.1875 0.25,-0.25 0.3125,-0.1875 0.4375,0.125 0.75,-0.4375 -0.25,-0.3125 -0.375,-0.25 0.1875,-0.3125 1.25,-0.75 0.1875,-0.1875 0,-0.5 -0.125,-0.1875 z").attr({ class: 'AB', id: 'AB', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'AB');
                    var C = paper.path("m 157.3125,404.375 -0.9375,8.4375 -2.1875,2 0,5.5625 -2.25,1.9375 -4.5,-0.75 -0.9375,1.125 0.4375,1 -1.9375,1.875 -1.75,0.0625 0.375,3.8125 -0.9375,0.375 0.6875,3.1875 -0.6875,1.4375 2.3125,1.875 0.25,2.1875 -0.5,1.0625 1.3125,1.8125 -0.75,1.9375 -1.25,1.75 1.1875,2.25 1.8125,2.6875 0.9375,4.9375 1.625,1.625 1.625,-1 1.4375,-0.375 2.6875,1.1875 2.9375,2.5625 2.0625,0.0625 -0.125,-2.4375 -1.6875,-3.5 0.25,-0.4375 0.75,-0.375 0.125,0.8125 0.25,0.625 0.6875,0.9375 0.75,1 0.8125,0.5625 0.4375,-0.0625 0.3125,-0.5 0.3125,-0.6875 0.3125,-0.125 0.125,-0.625 -0.9375,-0.875 -0.0625,-0.8125 0.3125,-0.75 0.3125,-0.375 0.375,-0.0625 L 164,450.75 163.8125,450.5 164.5,449.8125 165.125,449.5 165,448.625 l 0.6875,0.125 0.6875,0 0.3125,0.4375 0.5625,0.125 0.1875,0.5625 0.4375,0.0625 0.25,-0.6875 0.5625,-0.3125 0.5,0.0625 0.25,0.1875 0.4375,-0.25 -0.125,-0.3125 1.875,-0.75 0.4375,-0.0625 0.4375,-0.25 0.75,-0.625 0.5,0 0.625,-0.5625 0.1875,0.125 0.5,-0.125 0.5,0 1.0625,-3.625 3.6875,-1 L 182,440 l 0.4375,-5.9375 0.9375,-0.375 -1.5,-1.875 1.875,-0.625 0.5,-2.25 0.4375,-2.3125 -0.1875,-2.5625 1.4375,0 0.625,-1.25 -0.9375,-1.8125 -1.9375,-1.5625 1.9375,-0.1875 0.3125,-1.5 -1.625,-0.5 -1.6875,-2.75 -0.9375,-4.0625 -0.8125,0.4375 -0.0625,2 1,4 -0.8125,1 -2.25,-0.625 -4,-3.4375 -2.5,-3.25 -0.3125,-3 -1.875,-1.25 -2.6875,1.25 -1.25,2.1875 -1.75,0.375 -1.25,-3.25 0,-2.5 -5.8125,0 z").attr({ class: 'C', id: 'C', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'C');
                    var D = paper.path("m 150.625,458.0625 -1.0625,0.5 -0.375,1.625 L 146.5,459 l -1.25,0.5625 -1.9375,0.1875 -2.3125,0.75 -2.125,-0.4375 -2.3125,0.5 -4.4375,0.3125 -0.125,1.3125 1.125,0.875 -0.25,1.125 -2.9375,0.6875 -2,-0.3125 -1.3125,-0.5 -1.6875,1.5 -1.6875,2 3.375,0.25 1.6875,1.25 4.5,-1.5 1,0.125 -0.875,1.5 L 131,470 l -2.5625,0.25 -1.625,0.6875 -2.625,0.9375 -0.1875,1.6875 -1.125,1.125 -1.625,-0.1875 0.0625,1.375 -2.25,0.3125 -1.25,2.0625 -0.5,2.0625 0.625,1 2.625,1.0625 1.25,-2.6875 1.1875,0.625 0.4375,1.1875 2.3125,1.5625 2.3125,1.0625 1.0625,2.0625 1.6875,1.875 1.4375,0.375 0.625,0.9375 2.8125,5.5 4.25,0.125 3.5,1.1875 1.5,2.1875 1.6875,0.1875 2,0.1875 2.625,-0.9375 -0.0625,-1 -2,-0.5625 1.0625,-0.5625 1.375,0.1875 1.5,1 1,-1.6875 -1.1875,-1.125 -1.75,-1.5625 1.625,-0.625 1.1875,1.25 1.25,-0.0625 2.4375,0.5625 1,-1.1875 1.5625,0.3125 0.3125,-2.0625 0.6875,0.125 0.4375,0.125 1.25,-0.1875 -0.6875,-0.75 0.375,-2.9375 1.625,1.3125 0.75,-0.5625 -0.5625,-1.25 1.1875,-1.25 -0.5,-2 -1.8125,-0.875 -0.125,-1.125 -3.75,0.0625 -1.875,-2.625 0.25,-4.25 -1.25,-2.25 -0.375,-2.375 1.0625,-1.25 -0.6875,-1.6875 1.25,-0.9375 -0.25,-1.4375 -0.6875,-0.1875 1.1875,-1.5625 L 157,460.5 l -3.1875,-0.75 -0.625,1 0.8125,2.8125 -1.75,0.125 -0.9375,-3 0.6875,-1.625 -1.375,-1 z").attr({ class: 'D', id: 'D', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'D');
                    var E = paper.path("m 121.8125,479.6875 -1.25,2.6875 -2.625,-1.0625 L 115.5,484 l 0.875,1.5625 -1.0625,1.625 -2,-0.0625 -0.5,2.125 -0.75,-1.3125 -1.1875,0.5625 -2.1875,-1.3125 -1.4375,1.75 -1.3125,0.0625 -1.125,1.4375 -0.9375,1.8125 -0.5,1.75 -2.1875,1.25 -0.3125,3.0625 -1.6875,2 1.6875,1.375 1.4375,0.3125 0.8125,0.75 -1.5,0.9375 -0.9375,2.3125 -1.5,0.6875 -1.0625,-1.125 L 97.0625,506 97,507.5 l -2.8125,2.3125 -0.375,1.5625 -0.5,1.5625 0.3125,1 -0.625,1 -0.625,3.125 -1.375,4.5625 1.625,0.6875 3.5,-0.5625 0.1875,1.4375 3.4375,-0.6875 0.9375,-1.875 1.1875,0.625 1.0625,4 0.5625,1.5 -0.875,1.0625 -0.8125,1.9375 0.5,1.8125 1.75,2.125 -0.3125,1.125 0.875,3.125 1,2.375 3.5625,-0.375 3.25,0.75 0.3125,-2.125 0.6875,-0.9375 1.5,0.25 0.5,-1.625 1.375,-1.25 -0.25,-1.375 2.1875,-0.5 2.6875,0.875 0.375,1.5 1.8125,-0.9375 1.3125,0.9375 2.4375,-2.25 1.1875,-0.125 -1.1875,-4.125 1.125,-0.875 -2,-2.9375 0.375,-2.4375 2.25,-0.0625 0.625,1.1875 1.4375,-0.1875 -0.625,-1.875 0.6875,-0.75 1.8125,-1.5625 1,1.125 1.9375,-0.875 2.4375,3.125 0.75,-1.5 1.5,0.75 1.3125,5.0625 1.875,0.3125 1.4375,-1 -1,-2.125 1.5625,-1 -2,-2 -0.375,-1.4375 2.25,1 1.1875,-3.0625 -1.3125,-2 -2.125,-1.5 4.0625,-0.875 0.875,-2.1875 -1.875,-1.4375 -2.3125,-0.1875 -0.625,-1.5625 -2.25,-0.6875 -0.8125,-1.1875 1.1875,0.125 2.625,0.5 2.625,-1 1.75,-2.875 -1.875,-1.875 -2.8125,-2.1875 -3.4375,-1.5625 -3.625,-0.25 -0.5,2.125 -1.3125,-1.625 -1.9375,0.8125 -0.8125,-0.375 0.0625,-1.5625 0.9375,-0.875 2.4375,0.375 1.6875,0 3.25,0.8125 2.5,0.4375 1.625,0.125 -1.5,-2.1875 -3.5,-1.1875 -4.25,-0.125 -2.8125,-5.5 -0.625,-0.9375 -1.4375,-0.375 -1.6875,-1.875 -1.0625,-2.0625 -2.3125,-1.0625 -2.3125,-1.5625 -0.4375,-1.1875 -1.1875,-0.625 z").attr({ class: 'E', id: 'E', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'E');
                    var F = paper.path("m 80.625,520.3125 -0.0625,3.5 -1.0625,1.3125 -0.125,0.8125 -2.6875,0.8125 -0.1875,-1.125 -1.8125,-0.8125 -0.75,0.5 -1.1875,-0.6875 -0.5625,0.125 -0.5,1.6875 -1.25,1.4375 -0.0625,2.0625 0.9375,2.5625 -0.25,1.8125 L 71,538 70.125,539.3125 70,540.625 l 0.6875,1.8125 -0.375,1.25 -1.1875,0.5625 -0.125,1 0.1875,2.125 -0.4375,1.25 -1.125,0.8125 -3,4.5 -0.625,1.625 -1.4375,0.75 0,1.125 -1.125,0.25 L 61,558.5625 59.0625,559 l -0.625,2.5625 -1.125,-0.4375 -0.75,1 -0.5625,2.25 -1.25,1.625 -1.25,0.9375 0.0625,1.5 0.9375,3 2.3125,-2 0.25,-1.4375 1.0625,0.5625 2.25,-0.9375 2.5625,0.5 0.625,-0.625 0.25,1.5 0.75,-0.1875 2.0625,1.3125 -0.5,1.75 0.6875,1.5 1.625,0.625 0.5625,-3.0625 1.125,-0.6875 1.8125,0.25 1,2.625 1.5,-0.75 0.3125,-1.125 2.25,-0.5625 1.375,0.4375 0.9375,1.0625 0.5625,-0.4375 1.4375,2.4375 0.1875,1.9375 1.0625,2.5 1.125,0.625 1.25,-0.6875 1.375,-3.3125 -1.5,-1.9375 -0.25,-1.625 0.5,-0.75 0.125,-4.3125 1.1875,0 2.5,-0.0625 1.4375,-0.3125 0.25,-1.5 1,0.1875 L 92,564.3125 93.5625,564.125 95,563.25 l 1.5,0 1.625,0.875 1,1.125 0.375,2.3125 1.4375,-0.125 0.5,-1.125 1.0625,-0.25 1,-0.6875 0.5,-0.75 1.75,0.125 -1.0625,-1.625 1.5,0 1.125,0.875 4,-0.625 3.875,1.5625 -0.8125,-2.125 -0.8125,-0.625 -0.125,-2.4375 1.1875,-0.8125 -0.4375,-2.0625 0.375,-0.875 -0.125,-2.5 1.1875,-0.9375 1.375,1 0.125,-2.125 0.75,-0.75 -0.375,-1.3125 -1.0625,-0.9375 1.875,-2.375 -3.5,-2.75 -1.75,-0.375 -0.625,-1.25 -3.25,-0.75 -3.5625,0.375 -1,-2.375 -0.875,-3.125 0.3125,-1.125 -1.75,-2.125 -0.5,-1.8125 0.8125,-1.9375 0.875,-1.0625 -0.5625,-1.5 -1.0625,-4 -1.1875,-0.625 -0.9375,1.875 -3.4375,0.6875 -0.1875,-1.4375 -3.5,0.5625 -1.625,-0.6875 -1.75,2.8125 -0.5,1.9375 -2.4375,1.5625 -1.75,3.0625 -0.5,2.1875 -0.25,2.6875 -1.25,0.125 -0.75,0.5625 -0.6875,-0.5 0.25,-1.875 L 81,533.25 80.3125,532.625 80.5,529.25 l 1.0625,-1.8125 0.9375,-3.125 0.5625,-3.6875 -2.4375,-0.3125 z").attr({ class: 'F', id: 'F', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'F');
                    var G = paper.path("m 104.6875,563.125 1.0625,1.625 -1.75,-0.125 -0.5,0.75 -1,0.6875 -1.0625,0.25 -0.5,1.125 -1.4375,0.125 -0.375,-2.3125 -1,-1.125 -1.625,-0.875 -1.5,0 -1.4375,0.875 -1.5625,0.1875 -0.4375,0.625 -1,-0.1875 -0.25,1.5 -1.4375,0.3125 -2.5,0.0625 -1.1875,0 -0.125,4.3125 -0.5,0.75 0.25,1.625 1.5,1.9375 -1.375,3.3125 -1.25,0.6875 -1.125,-0.625 -1.0625,-2.5 -0.1875,-1.9375 -1.4375,-2.4375 -0.5625,0.4375 -0.9375,-1.0625 -1.375,-0.4375 -2.25,0.5625 -0.3125,1.125 -1.5,0.75 -1,-2.625 L 70.125,570.25 69,570.9375 68.4375,574 l 0.1875,1.125 -0.9375,2.75 -1,-0.3125 -0.25,0.75 -2,0.0625 -1.1875,1 -0.4375,-0.5625 -2.5,0.75 -0.8125,-0.5 -1.125,1.0625 0.5,3.5 0,3.6875 1.125,1.4375 0.6875,2.3125 0.3125,1.3125 0.6875,0.75 0.6875,2.625 -0.75,1.9375 0.5625,0.875 -0.4375,1 1,1 2.0625,0.125 3.3125,-0.75 2.1875,-0.9375 2.0625,0.0625 1.5625,-0.8125 2.25,0 1,-1.625 0.25,-1.25 1,-0.0625 0.8125,1.1875 2.625,0.8125 0.4375,-0.5625 4.125,1.1875 2.75,1.125 1.875,0.3125 1.8125,2.375 1.0625,0.5 2.375,0.4375 2,0.875 1,-0.875 1.25,-2.5625 1.375,-1 2.75,0 0.1875,1 1.5,0 0.25,-1.1875 1.25,-0.8125 1.125,1 1.0625,-1.1875 0.1875,-2.625 0.75,-0.6875 -0.25,-2.125 1.5,-1.9375 -0.3125,-1.1875 0.3125,-2 -1.5625,-2.9375 2.0625,-0.875 2.625,-0.3125 0.25,-1.4375 -1,-2.875 0,-0.9375 1.125,-0.5 2.4375,0.875 1.0625,-0.25 2.9375,-0.25 0.8125,-2.5625 -1.0625,-2.1875 -1.5625,-2.1875 -1.875,-0.75 -0.875,-2.0625 -2.3125,-1 0.5,-1.5 -0.625,-0.6875 -3.875,-1.5625 -4,0.625 -1.125,-0.875 -1.5,0 z").attr({ class: 'G', id: 'G', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'G');
                    var H = paper.path("m 133.0625,520.5 -1.8125,1.5625 -0.6875,0.75 0.625,1.875 -1.4375,0.1875 -0.625,-1.1875 -2.25,0.0625 -0.375,2.4375 2,2.9375 -1.125,0.875 1.1875,4.125 -1.1875,0.125 -2.4375,2.25 -1.3125,-0.9375 -1.8125,0.9375 -0.375,-1.5 -2.6875,-0.875 -2.1875,0.5 0.25,1.375 -1.375,1.25 -0.5,1.625 -1.5,-0.25 -0.6875,0.9375 -0.3125,2.125 0.625,1.25 1.75,0.375 3.5,2.75 -1.875,2.375 1.0625,0.9375 0.375,1.3125 -0.75,0.75 -0.125,2.125 -1.375,-1 -1.1875,0.9375 0.125,2.5 -0.375,0.875 0.4375,2.0625 -1.1875,0.8125 0.125,2.4375 0.8125,0.625 0.8125,2.125 0.625,0.6875 -0.5,1.5 2.3125,1 0.875,2.0625 1.875,0.75 1.5625,2.1875 1.0625,2.1875 -0.8125,2.5625 -2.9375,0.25 -1.0625,0.25 -2.4375,-0.875 -1.125,0.5 0,0.9375 1,2.875 -0.25,1.4375 -2.625,0.3125 -2.0625,0.875 1.5625,2.9375 -0.3125,2 0.3125,1.1875 -1.5,1.9375 0.25,2.125 -0.75,0.6875 -0.1875,2.625 1.5625,-0.5625 2.1875,0.8125 0.25,-1.5 1.875,0.6875 0.625,1.4375 1.25,-0.0625 0.4375,1.25 0.5625,1.125 1.375,0.4375 1.625,3.125 1.4375,1 2.4375,-0.125 1.125,0.8125 1.625,-0.8125 0.8125,-3.6875 0.9375,-3.125 1.0625,-1.125 0.625,-2.125 0.9375,-0.375 -0.0625,-2.1875 0.3125,-1.375 1.125,-2.25 1.875,-0.4375 1.0625,-4.6875 1.0625,0.9375 L 139,584.1875 138.3125,583 l -0.9375,0.5625 0.75,-4.1875 0.5625,-2.5 -0.125,-2.0625 0.875,-2.5 2.25,-3.375 -2.125,-1 -0.9375,-3 0.875,-1.8125 -0.4375,-2.25 1.9375,-1.5 -0.3125,-2.5 1.75,-0.0625 0.9375,-2.5 0.8125,-2.75 -0.5625,-1.6875 -2.25,-2.6875 2.25,-0.25 0.875,-0.8125 0,-1.5 -1.625,0.625 -0.875,-1.1875 0.6875,-1.8125 1.4375,-0.875 -0.0625,-2.25 -1.8125,-1.25 -2.125,-3.0625 1.625,-2.4375 2.125,0.4375 1.4375,1.1875 0.5,-2.75 -0.5,-3.75 -1.4375,1 -1.875,-0.3125 -1.3125,-5.0625 -1.5,-0.75 -0.75,1.5 -2.4375,-3.125 -1.9375,0.875 -1,-1.125 z m 20.5,36.4375 -1,0.875 -1.375,2 -0.1875,2.3125 -0.25,1.5 -1,0.625 0.3125,1.5625 -0.625,2.375 -1.125,2.4375 -0.75,1.9375 -1,1 -0.8125,2.25 -0.75,2.875 -1.5,0 -1,0.875 -0.875,2.75 -1.3125,2.6875 -1.5625,3.9375 -0.4375,2.4375 -1.3125,2.3125 -0.1875,1.875 0.1875,4.75 0.5,0.25 -0.125,7.375 0.5,0.8125 -0.1875,2.375 1.6875,-1.5 0.8125,-2.625 1.625,-3.9375 -0.375,-1.5625 1.0625,-2.5625 0.75,-2.875 0.1875,-2.125 1.3125,-1.375 -0.1875,-1 L 145,589 l 1.875,-6.875 1.1875,-0.3125 0.6875,-1.6875 -0.0625,-1.4375 0.5625,-1.0625 0.0625,-3.1875 1.375,-1.25 -0.625,-1.5 1,0.0625 0.875,-3.1875 1.25,-2.75 0.625,-0.625 0,-2.8125 -0.375,-1.0625 0.625,-1.5625 1.25,-0.6875 -0.4375,-1.8125 -0.75,0.375 -0.5625,-0.6875 z").attr({ class: 'H', id: 'H', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'H');
                    var I = paper.path("m 193.688,529.562 1.687,3.625 1.063,-3.125 1,-1.062 3.5,0.687 1.25,-1.062 0.437,-1.875 1.813,-1.188 2.062,0.688 1.375,-0.188 0.438,1 -0.688,0.813 -1.812,0.062 -1.5,0.563 -0.563,0.687 0.5,1.188 -0.875,1.875 -1.562,1 -0.813,0.562 0.125,1.75 -1.562,0.063 -0.125,2.875 -1.875,0.125 -1.313,-0.875 -0.187,2.5 -0.75,3.312 0.875,0.563 -0.25,2.812 -0.75,1.438 1.125,2.187 1.625,1.125 1.562,0.375 -0.75,2 -1.937,0.688 -1.563,0.5 -1.687,2.75 0.062,1.437 1.063,0.688 -0.875,1.687 -2.813,1.063 -0.375,1 -3.5,2.75 1,0.5 -2.562,2 0.125,3 1.375,0.562 -1.75,2.563 -2.75,1.937 -1.688,-0.125 1.375,-3.25 0.188,-1.937 1.625,-1.063 0.625,-1.375 -0.313,-1.062 -1.562,1.312 -0.563,-0.312 0.313,-2.75 -1.125,-0.813 -0.75,-0.687 0,-3.563 -1.375,-0.437 0.312,-1.813 1.25,-1.5 0.313,-3 -0.938,-1.187 -0.562,-2.438 -0.563,-2.25 0.375,-1.812 1.938,-2.438 1.375,-0.625 1.625,-2.375 1.75,-3.5 0.75,-2.937 1.312,-1.125 0,0 1.375,-0.5 1.188,-0.375 0.437,-1.938 1.125,-1 z").attr({ class: 'I', id: 'I', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'I');
                    var K = paper.path("m 114.0625,596.6875 -0.25,1.5 -2.1875,-0.8125 -1.5625,0.5625 -1.0625,1.1875 -1.125,-1 -1.25,0.8125 -0.25,1.1875 -1.5,0 -0.1875,-1 -2.75,0 -1.375,1 -1.25,2.5625 -1,0.875 -2,-0.875 -2.375,-0.4375 -1.0625,-0.5 -1.8125,-2.375 -1.875,-0.3125 -1.4375,2.5625 -1.5,0.375 -0.625,2.375 0.5625,1.625 0.5,1.5 0.1875,2.0625 1.3125,0.5625 1.5,-0.25 0.5625,1.1875 0.4375,5.3125 -1,0.5 -0.25,1.3125 L 91,619.5 l 1.4375,0.75 1.625,0.125 1.5,-1.6875 L 94,617 93.0625,614.875 93,612.9375 l 1.375,0.3125 1.0625,0.0625 1.9375,-0.25 2.625,-0.125 1.8125,-0.0625 1,-1.125 0.9375,1.125 1.75,0.0625 2.3125,-0.375 1.0625,-0.375 0.5625,2 1.8125,-1 0.625,-1.1875 1.1875,1.3125 1,-1 1.6875,-0.625 0.875,0.625 2.5625,-0.4375 1.3125,1.125 -0.4375,1.375 -1.625,1.5625 1.1875,0.4375 2,-1.1875 1.6875,1.5 1.5625,-3.4375 1.125,-0.75 1.375,-2.875 1.0625,-4.0625 -1.625,0.8125 -1.125,-0.8125 -2.4375,0.125 -1.4375,-1 -1.625,-3.125 -1.375,-0.4375 -0.5625,-1.125 -0.4375,-1.25 -1.25,0.0625 -0.625,-1.4375 -1.875,-0.6875 z").attr({ class: 'K', id: 'K', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'K');
                    var M = paper.path("m 78.4375,595.3125 -1,0.0625 -0.25,1.25 -1,1.625 -2.25,0 -1.5625,0.8125 -2.0625,-0.0625 -2.1875,0.9375 -3.3125,0.75 -2.0625,-0.125 -1,-1 -0.9375,0.8125 -1.0625,-0.125 -2,1.1875 -1.5625,1.5 -1.125,1.125 -1.25,-1.0625 -4.125,-0.6875 -1.125,-0.3125 0.6875,-2.5 -1.6875,-1.125 -1.5,0.625 -1.25,-0.9375 -1.6875,-0.75 -1.25,0.5 -1.3125,1.0625 0.125,1.8125 1.375,0.4375 1.25,1.125 0.5625,1.6875 1.25,1.3125 0.6875,1.5 -0.5625,1.375 -1,0.6875 -0.625,-0.1875 -0.875,-0.3125 -0.75,0 -0.625,-1 -2,-1.1875 -2.3125,-1.5625 -1.1875,0.125 1.0625,0.875 0.8125,1.5 0.3125,1.4375 0.4375,2.875 0.25,0.8125 0.875,1 1,1.625 1.25,1.5625 1,1.9375 0.4375,2.3125 1.375,4.25 1.8125,0.4375 0.5,1.75 0.125,2.375 -0.3125,0.25 -0.375,0.5 0.375,0.6875 0.75,-0.375 0.3125,0.6875 -0.3125,0.5 0.4375,0.1875 0.625,0 0.9375,0.75 0.4375,0.3125 0.3125,0.9375 0,0.375 -0.375,0.9375 0,0.3125 0,0.5 -0.1875,0.5625 -1.0625,0.25 -0.8125,0.5625 -1.375,0.8125 -0.5,0.5 0,0.875 0.125,1.1875 0.5,1.25 0.3125,0.8125 0.25,0.8125 -0.125,1.0625 -0.375,1.0625 -0.3125,0.5625 -0.625,-0.125 -0.75,-0.3125 -0.25,-1 -0.125,-0.3125 -1.375,2.8125 1.5625,-0.5625 0.5,0.125 0.375,0.4375 0.4375,0 0.125,-0.375 0.375,-0.1875 0.8125,-0.1875 0.9375,0.6875 1.25,0.875 0.625,0 0.9375,-0.1875 2.4375,0.625 1.3125,0.75 0.625,0.25 0.875,-0.125 0.4375,0.5 1.1875,-0.75 1.0625,-0.0625 L 60,648.5 l 0.875,-0.3125 2.875,0.125 1.5,-1.8125 1.375,0 0.9375,-0.5625 3,0.25 1.75,-0.375 1.0625,0.4375 2.6875,2.0625 1.125,-0.125 2.3125,0.375 0.5,-0.875 1.375,-2.5 1.9375,-2.0625 0.875,-1.75 -0.3125,-2.0625 -1.375,-1.25 -0.4375,-2.6875 -1.5625,-1.0625 -0.375,-3.0625 0.3125,-3.1875 1.9375,-3.5 L 83.5,624 l 0.875,-2.0625 2,-1.1875 1,-1.875 2.0625,-0.6875 0.25,-1.3125 1,-0.5 -0.4375,-5.3125 -0.5625,-1.1875 -1.5,0.25 -1.3125,-0.5625 -0.1875,-2.0625 -0.5,-1.5 -0.5625,-1.625 0.625,-2.375 1.5,-0.375 1.4375,-2.5625 -2.75,-1.125 -4.125,-1.1875 -0.4375,0.5625 -2.625,-0.8125 -0.8125,-1.1875 z").attr({ class: 'M', id: 'M', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'M');
                    var N = paper.path("m 34.4375,543.9375 -2,1.1875 -1.6875,0.5625 -2.5625,0.4375 L 27.625,545.5 26,545.4375 26,547 l 0.0625,1.25 -0.6875,1.8125 -0.25,0.875 0.125,0.75 0.8125,2.25 0.375,0.8125 0.625,0.3125 0.4375,-0.25 0.3125,-0.6875 0.625,-2.25 0.375,-1.125 0.5,-0.5 0.5,0.3125 0.1875,1 -0.0625,2.1875 -0.6875,1.6875 0.3125,0.4375 0.875,-0.1875 0.375,0.4375 0.1875,1.5625 0.125,1.25 -1.25,0.625 -0.125,1.8125 1.5,1.9375 1.1875,2.0625 0.1875,2.625 0.75,1.875 1.125,0.8125 0.6875,1.625 0,1.25 L 34.75,575 l 1.25,1.5625 1.875,0.75 1.9375,1.5625 1.4375,1.3125 -0.125,2.25 0.8125,2.5 0.8125,1.9375 1,2.1875 1.4375,0.0625 1.4375,-0.875 1.5,0.875 0.6875,2.375 0.3125,2.0625 -0.1875,2.25 -0.5,1.375 -0.875,1.1875 1.6875,1.125 -0.6875,2.5 1.125,0.3125 4.125,0.6875 1.25,1.0625 1.125,-1.125 1.5625,-1.5 2,-1.1875 1.0625,0.125 0.9375,-0.8125 0.4375,-1 -0.5625,-0.875 0.75,-1.9375 -0.6875,-2.625 L 61,592.375 60.6875,591.0625 60,588.75 l -1.125,-1.4375 0,-3.6875 -0.5,-3.5 1.125,-1.0625 0.8125,0.5 2.5,-0.75 0.4375,0.5625 1.1875,-1 2,-0.0625 0.25,-0.75 1,0.3125 0.9375,-2.75 -0.1875,-1.125 -1.625,-0.625 -0.6875,-1.5 0.5,-1.75 -2.0625,-1.3125 -0.75,0.1875 -0.25,-1.5 -0.625,0.625 -2.5625,-0.5 -2.25,0.9375 -1.0625,-0.5625 -0.25,1.4375 -2.3125,2 -0.9375,-3 -0.0625,-1.5 1.25,-0.9375 -0.8125,-0.625 -0.6875,0.5625 -0.625,-0.4375 0.25,-1 -1.125,-0.375 -1.75,0.375 -0.125,-2.4375 0.5,-0.3125 -0.5,-1.4375 -1.8125,-0.125 -1.4375,-1.0625 -2.25,-2.0625 -1.3125,-0.375 -3.1875,0.5625 -0.625,1.9375 -2,0.3125 0.1875,-2.25 -0.8125,-1.0625 0.5625,-3.125 -0.3125,-1.5625 -0.3125,-0.4375 -0.6875,-0.25 -0.1875,-0.5625 0.25,-1.0625 -0.1875,-0.9375 -0.375,-0.8125 0.4375,-1.75 -1.375,-1.75 z").attr({ class: 'N', id: 'N', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'N');
                    var O = paper.path("m 33.25,466.375 0.3125,3.4375 -3.0625,-3.1875 -3.0625,1.0625 -1.5625,1.1875 -0.3125,3.875 0.4375,0.875 -1.8125,2.6875 -0.9375,2.3125 -0.0625,1.5625 -0.75,1.9375 -3.5625,1.5 -1.1875,-0.875 -0.125,-1.125 0.5,-4.375 -2,-4.5 -1,-0.3125 -0.9375,0.5625 -0.625,0.3125 -1,0.1875 -2.1875,3.5 -0.0625,2.0625 0.1875,0.5625 0.625,0.9375 0,0.4375 -0.3125,0.125 -0.5625,-0.25 -0.125,0.1875 L 10,481.75 l 0.8125,2.4375 0.125,1.0625 -0.375,4.0625 1.6875,3.125 1.0625,4.125 L 12.25,498 l 1.0625,4.5 0.0625,0.6875 0.125,0.625 -0.1875,0.5625 -0.5,0.3125 -0.3125,-0.0625 -0.125,-0.6875 -0.5,0.125 -0.1875,0.625 0,0.8125 0.0625,0.625 0.125,0.5625 -0.6875,0.8125 0.125,0.4375 0.8125,0 0.875,-0.5 0.1875,-0.5 0.375,0.0625 0.25,0.4375 0.5625,0.25 0.75,-0.6875 -0.0625,1.4375 0.75,-0.1875 -0.25,1 -0.25,0.8125 0.4375,0.3125 0.5625,0.125 -0.1875,0.8125 -0.4375,0.4375 0.0625,0.3125 1,-0.125 0.5625,-0.5 0.625,-0.875 0.5625,-0.4375 0,1.25 -0.375,0.5625 -0.625,0.6875 -0.625,0.4375 -0.75,0.125 -0.375,0.5625 -0.6875,1.125 0.1875,0.25 1.0625,0 1.1875,-0.25 0.875,-0.375 0.625,-0.75 0.4375,-0.875 0.75,-0.125 0.625,-0.4375 0.625,-0.6875 0.625,-1.0625 0.9375,0.0625 0.25,-0.5 -0.4375,-0.5625 0.9375,-0.0625 1.0625,0.375 1.5,0 -1,1.125 -0.1875,0.5625 0.75,1.25 0.4375,1 0,1.0625 0.75,0 -0.0625,0.75 -0.625,0.625 -0.5,0.1875 0.125,1.0625 -0.125,1.1875 -0.4375,0.75 -0.5,0.6875 -0.4375,0.5625 0.0625,1 0.125,1.0625 -0.0625,1 -0.375,1.125 -1.25,1.3125 -0.1875,0.5 0,0.625 0.3125,0.5 -0.875,1.5625 -0.25,0.875 -0.3125,0.625 -0.5,0.625 -0.1875,0.625 0.3125,0.5 0.5,0.5 0.1875,0.375 0.125,1 0.25,0.1875 0.75,-0.125 0.5,0 -0.3125,1.5 -0.875,0.25 -0.875,0.375 -0.5,0.6875 0,0.4375 0.125,0.3125 0.375,0.6875 0.4375,0.125 0.3125,0 0.3125,-0.125 0.125,-0.625 0.375,-0.125 0.375,0.1875 0.375,0.75 1.125,-0.25 0.375,0.25 0.75,-0.25 0.5,0 -1.8125,1 -0.1875,0.375 0,0.375 0.6875,2.0625 0.3125,0.0625 0.4375,-0.75 0.1875,0.4375 -0.125,2.0625 -0.125,1.0625 1.625,0.0625 0.5625,0.625 2.5625,-0.4375 1.6875,-0.5625 2,-1.1875 1.375,1.75 -0.4375,1.75 0.375,0.8125 0.1875,0.9375 -0.25,1.0625 0.1875,0.5625 0.6875,0.25 0.3125,0.4375 0.3125,1.5625 -0.5625,3.125 0.8125,1.0625 -0.1875,2.25 2,-0.3125 0.625,-1.9375 3.1875,-0.5625 1.3125,0.375 2.25,2.0625 1.4375,1.0625 1.8125,0.125 0.5,1.4375 -0.5,0.3125 0.125,2.4375 1.75,-0.375 1.125,0.375 -0.25,1 0.625,0.4375 0.6875,-0.5625 0.8125,0.625 1.25,-1.625 0.5625,-2.25 0.75,-1 1.125,0.4375 L 59.0625,559 61,558.5625 l 0.4375,-0.875 1.125,-0.25 0,-1.125 1.4375,-0.75 0.625,-1.625 3,-4.5 1.125,-0.8125 0.4375,-1.25 L 69,545.25 l 0.125,-1 1.1875,-0.5625 0.375,-1.25 L 70,540.625 70.125,539.3125 71,538 l 0.0625,-3.6875 0.25,-1.8125 -0.9375,-2.5625 0.0625,-2.0625 1.25,-1.4375 0.5,-1.6875 0.5625,-0.125 1.1875,0.6875 0.75,-0.5 1.8125,0.8125 0.1875,1.125 2.6875,-0.8125 0.125,-0.8125 1.0625,-1.3125 0.0625,-3.5 2.4375,0.3125 0.1875,-1.875 0.875,-1.875 0.75,-3.375 1.75,-2.125 1.1875,-2.625 1.375,-3.0625 1,-0.5625 1.0625,-2.75 0.1875,-1.8125 0.125,-2 1.125,-1.0625 2,-0.9375 1.25,-1.5 -0.875,-2.0625 -1.4375,0 -0.6875,1.875 -1.25,0.375 -0.1875,-1.3125 -1.625,0 -0.1875,-3.375 -1.375,-0.125 -1.75,-1.6875 1.0625,-1.625 -1.4375,-1.125 -0.875,-4.9375 -1.3125,-2 -2.25,0 -2.8125,1.6875 0.4375,2.25 -0.5,2.5625 -1,2.1875 -1.4375,1.4375 -1.25,-0.875 -4.0625,-0.8125 -0.5,1.5 1.375,1.4375 0.25,1.75 1.0625,-0.75 1.75,-0.625 0.875,0.5 -0.6875,1.125 -2.25,1.875 -1.625,0.4375 -2.1875,0 -2.0625,1.25 -2.375,0.75 -2.1875,1.5 -0.6875,2.375 -0.5,2.125 -1.1875,0.8125 -1.875,-0.3125 -0.9375,-0.75 1.4375,-4.3125 0.9375,-2.9375 -1,-0.875 -1.625,-0.375 -2.6875,4.1875 -1.625,1.625 0.0625,0.875 -1.5,2.375 -2.9375,0.4375 -1.8125,2.125 0.0625,1.0625 -1.75,0.6875 0.5625,-2.75 -1.4375,-0.1875 -2.125,3.125 -1.375,-0.3125 -0.875,0.625 -2.25,-0.4375 0.125,-1.375 1.5,-2.0625 1.9375,-1.1875 1.5625,-1.875 1.125,-2 1.4375,-1.75 1.1875,-1.0625 -0.4375,-0.8125 -2.5,-0.25 -1.0625,-1.3125 -0.0625,-2.6875 1.75,-2.6875 2.0625,-3.125 0.5,-3.5 0.9375,-1.4375 2.1875,-3.75 0,-3.875 -1.25,-1.1875 -1.6875,-0.875 -1.625,2.75 -2.625,-0.625 -0.875,-2.5 -1.8125,0.375 -1.875,-0.8125 -0.6875,-3.3125 -4,-0.125 z m -10.0625,44.8125 -0.5,0.0625 -0.8125,0.4375 -0.125,0.6875 0.0625,0.6875 -0.1875,0.5 -0.3125,0 -0.625,-0.125 -0.5,0.125 -0.5625,0.625 -0.5,0.625 -0.6875,0.375 -0.5,0.3125 -0.75,0.25 -0.375,0.3125 -0.5,0.3125 -0.625,-0.0625 -0.625,-0.1875 -0.6875,0.875 -0.5,1.125 0.3125,-0.125 0.375,-0.5625 0.5,0.125 0.125,0.5 0.4375,0.5 0.5,0.6875 0.375,0.625 -0.1875,0.5625 -0.375,0.5625 -0.25,0.25 0.375,0.375 0.5,-0.4375 0.25,0.375 0.375,0.1875 0.5,-0.125 0.5,-0.5625 0.4375,-0.6875 0.1875,-0.6875 0.375,-0.5 0.8125,-0.5 0.5625,0.3125 0.6875,0.5 0.4375,0.375 -0.125,0.625 0.5625,0.125 0.5,-0.6875 0.5,-0.3125 0.25,-0.0625 0.6875,-0.0625 0.875,-0.0625 0.25,-0.8125 0.125,-1.1875 -0.0625,-0.9375 0.1875,-0.75 0.3125,-0.8125 -0.1875,-0.625 -0.4375,-0.5625 -0.4375,-0.4375 -0.4375,-0.375 -0.1875,-0.8125 0,-0.8125 -0.875,-0.125 z m 0.25,8.8125 -0.0625,0.625 -0.125,0.625 0.25,-0.0625 0.3125,-0.4375 0.0625,-0.5 -0.4375,-0.25 z m -0.5,0.1875 -0.375,0.75 0.5,0.0625 -0.125,-0.8125 z m -2.0625,0.25 -0.25,0.1875 -0.5,1.1875 -0.3125,0.3125 -0.5,0.125 -1.375,-0.25 -0.375,0.125 -0.3125,0.25 -0.3125,0.625 0,0.4375 0.1875,0.375 0.4375,0.125 1,-0.0625 0.0625,0.375 -0.0625,0.3125 -0.6875,0.0625 -0.25,0.125 -0.125,0.4375 0.0625,0.625 0.125,0.3125 0.1875,0.125 0.4375,0.25 0,0.875 0.125,0.375 0.8125,0 0.25,-0.4375 0.25,-0.5 0.3125,-0.25 0.5625,-0.1875 0.375,-0.25 0,-0.3125 0.25,-0.5625 0.1875,-0.8125 0.5,0.0625 0.0625,0.5625 0.375,0 0.375,-0.3125 0.25,-0.6875 0.0625,-1.125 L 23,522.125 l -0.4375,-0.5 -0.75,0.5 -0.4375,-0.25 0.3125,-0.5 0.125,-0.5 -0.5,-0.375 -0.4375,-0.0625 z m -0.8125,8.75 -1,0.1875 -0.875,1.1875 0.75,0.5625 1.8125,-0.875 0.375,-1 -1.0625,-0.0625 z m -1.5,5 -0.6875,2.3125 0.4375,0.1875 1.0625,-1.375 -0.8125,-1.125 z m 1.9375,1.75 -0.4375,0.1875 -0.5,0.375 L 19.5,537.375 19.0625,537.3125 19,537.75 l 0.1875,0.1875 -0.0625,0.4375 -0.625,-0.0625 0.0625,0.4375 1.1875,0.9375 0.25,-0.1875 0.1875,-0.5 0,-0.8125 0.3125,-0.875 0.3125,-0.5625 -0.3125,-0.8125 z").attr({ class: 'O', id: 'O', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'O');
                    var S = paper.path("m 47.4375,384.3125 -5.75,1.25 2.125,6 -0.25,2.0625 1.0625,4.8125 2.5,4.5 -0.1875,2.25 1.9375,3.8125 -0.0625,5.0625 -2.75,3.9375 0.625,6.5625 L 45.75,427 l -1.5625,4.25 -1.625,1.1875 -0.8125,2.0625 -3,1.3125 L 37.1875,437.5 34.75,437.8125 32.8125,437 l -2.6875,2.4375 1.4375,2.9375 0.0625,2.8125 -1.4375,1.5625 -0.75,1.625 -2.6875,0.5 -1.25,2.3125 0.875,4.625 0.5,4.875 0.75,2 -0.1875,5 3.0625,-1.0625 3.0625,3.1875 -0.3125,-3.4375 4,0.125 0.6875,3.3125 1.875,0.8125 1.8125,-0.375 0.875,2.5 2.625,0.625 1.625,-2.75 1.6875,0.875 1.25,1.1875 0,3.875 L 52.75,475.5 52.875,477.375 55,477 l 0.625,1.875 1.25,0.0625 0.5625,4.5625 2.5,1.5 1.125,-1 -0.625,-7.125 -1.1875,-4.75 -1.375,-3.5625 1.3125,-1.3125 0,-3.4375 0.75,1.125 0.875,1 1.5,-0.1875 -0.625,-1.375 0.75,-1 2.25,-0.3125 1.3125,1.625 1.5,3.3125 1.8125,-1.75 0.6875,-2.1875 2.125,-0.9375 1.1875,2 1.625,-1.4375 1.6875,1.4375 1.4375,0.9375 2,-0.0625 0.75,4.25 -1.625,3.1875 -1.4375,2.75 -0.0625,2.5625 0.8125,0.3125 1.0625,-1.8125 1.75,-1.3125 1.25,1.0625 -0.8125,2.0625 2.25,0 1.3125,2 1.5625,-4.5625 -1.0625,-2.8125 0.4375,-1.125 -0.3125,-2.3125 0.9375,-3.6875 0,-0.5 1.375,-3.4375 2.125,-2.25 -1.4375,-3.1875 0.5,-1.1875 1.0625,0.4375 -0.0625,-2.75 -0.8125,-3.75 0.4375,-1.625 -1.25,-2.375 1.3125,-0.8125 -0.4375,-2.5625 0.375,-3.5625 -1.25,-0.5625 -0.75,-1.6875 2.8125,-1 -0.5,-2.1875 -5.125,-3.5 -0.5625,-3.625 -1.0625,-3.1875 -2.25,0.1875 -0.4375,-1.375 -1.625,0 0.375,3.6875 -2.6875,-3.8125 -3.375,-7 -2.8125,-0.3125 -1.625,-1.25 -1.25,-3.75 -2.8125,-5.1875 -0.875,-2.875 L 63,401.5 62.4375,398.3125 52.25,386.625 l -0.5,-2.3125 -1.375,0.4375 -2.9375,-0.4375 z").attr({ class: 'S', id: 'S', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'S');
                    var T = paper.path("m 99.875,429.1875 -1.25,0.125 -1.75,1.125 0.625,4.3125 -7.125,-1.1875 0.5,2.1875 -2.8125,1 0.75,1.6875 1.25,0.5625 -0.375,3.5625 0.4375,2.5625 -1.3125,0.8125 1.25,2.375 -0.4375,1.625 0.8125,3.75 0.0625,2.75 -1.0625,-0.4375 -0.5,1.1875 1.4375,3.1875 -2.125,2.25 -1.375,3.4375 0,0.5 -0.9375,3.6875 0.3125,2.3125 -0.4375,1.125 1.0625,2.8125 -1.5625,4.5625 0.875,4.9375 1.4375,1.125 -1.0625,1.625 1.75,1.6875 1.375,0.125 0.1875,3.375 1.625,0 0.1875,1.3125 1.25,-0.375 0.6875,-1.875 1.4375,0 0.875,2.0625 2.3125,-1.4375 1.4375,-3.25 1.5625,-1 0,2.4375 0.8125,-0.25 0.125,1.625 -1,2.0625 2.1875,-1.25 0.5,-1.75 0.9375,-1.8125 1.125,-1.4375 1.3125,-0.0625 1.4375,-1.75 2.1875,1.3125 1.1875,-0.5625 0.75,1.3125 0.5,-2.125 2,0.0625 1.0625,-1.625 L 115.5,484 l 2.4375,-2.6875 -0.625,-1 0.5,-2.0625 1.25,-2.0625 2.25,-0.3125 -0.0625,-1.375 -2.75,-0.3125 -1.25,-1.8125 0.9375,-1.4375 -1.875,-2.4375 -3.1875,1.125 -3.375,-1.375 -0.0625,-1.1875 3.3125,0.125 3.0625,-1 1.5625,0.3125 0.625,-1.5 -1.5,-3.4375 3.0625,0.1875 -0.0625,-2.5 -0.75,-0.6875 0.8125,-1.6875 -2.25,0.1875 L 117.5,454 l -0.25,-1.9375 -1.5,0.1875 -1.0625,-1.3125 1.0625,-2.375 -1.1875,-4.0625 -1.75,-0.9375 -0.125,-2.0625 -1.75,-3.1875 -2.5,-2.875 -2.125,-1.625 L 105,431.75 l -1.125,0.1875 -0.5625,-0.8125 -1.6875,1 -1.5625,-1.1875 -0.1875,-1.75 z").attr({ class: 'T', id: 'T', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'T');
                    var U = paper.path("m 143.25,425.625 -3.5,0.25 -1.1875,0.5 -0.0625,1.4375 -2.125,1.4375 -1,1.8125 -4.3125,0.4375 -0.875,-0.4375 0.375,-1.875 -1.5,-0.9375 -1.25,-0.1875 -0.75,-1.875 -1.25,-0.375 -1.6875,1.4375 -2.625,-0.625 -0.5625,1.5 -0.9375,0.625 0.0625,1.5625 -1.25,2.4375 1.0625,1.5 -0.75,3.375 -1.5625,-0.625 -1.875,-0.125 -1.125,2.5 -1.875,2.125 0.125,2.0625 1.75,0.9375 1.1875,4.0625 -1.0625,2.375 1.0625,1.3125 1.5,-0.1875 0.25,1.9375 0.0625,3.0625 2.25,-0.1875 -0.8125,1.6875 0.75,0.6875 0.0625,2.5 -3.0625,-0.1875 1.5,3.4375 -0.625,1.5 3.375,0.125 0.875,1.625 1.375,-0.6875 1.6875,-2 1.6875,-1.5 1.3125,0.5 2,0.3125 2.9375,-0.6875 0.25,-1.125 -1.125,-0.875 0.125,-1.3125 -3.375,0.3125 -0.6875,-2 2.75,0.0625 1.5625,-0.9375 2,0.9375 2.8125,-0.6875 0.9375,-1.25 1.5,-1.5625 -0.8125,-1.375 1.625,-0.8125 1.6875,1.1875 1.375,1.875 1.875,-0.8125 0.625,-1.0625 2,0.1875 -0.9375,-4.9375 -1.8125,-2.6875 -1.1875,-2.25 1.25,-1.75 0.75,-1.9375 -1.3125,-1.8125 0.5,-1.0625 -0.25,-2.1875 -2.3125,-1.875 0.6875,-1.4375 -0.6875,-3.1875 0.9375,-0.375 -0.375,-3.8125 z").attr({ class: 'U', id: 'U', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'U');
                    var X = paper.path("m 118.125,325.625 -3.0625,0.25 -3.375,2.9375 0.25,3.0625 1.3125,0.9375 0.3125,3.5 -7.1875,5.5 0.5625,2.125 -0.1875,2.5 0,2.1875 -1.375,-1.125 -3.1875,-0.25 -0.5625,2.375 -1.5625,-2.875 -1.5625,0.875 -0.8125,-1.5 -3.6875,5.5625 -0.6875,7.4375 3.4375,1.4375 0.5625,2.5 -0.875,2.125 2.25,-0.4375 1.1875,0.5 2.5625,-0.1875 3.375,0.625 2,-5.125 1.5625,4.25 9.375,13.5 0.5625,4.25 1.75,3.3125 3.9375,2.25 4.6875,0.5 2.25,5.6875 3.6875,4.125 -0.5625,2.25 -1.625,1.25 0.4375,1.5625 -1.8125,2.8125 -2.1875,0.6875 2,3.9375 1,0.3125 0.5625,1.375 2.375,4.6875 2.75,0.75 1.3125,1.0625 0.25,1.75 0.9375,0.5 0.25,2.5625 1.9375,1.6875 1.75,-0.0625 1.9375,-1.875 -0.4375,-1 0.9375,-1.125 4.5,0.75 2.25,-1.9375 0,-5.5625 2.1875,-2 0.9375,-8.4375 -3.125,-1.6875 2.875,-2.75 -2.5,-2.4375 0.6875,-2.375 -2.5625,-4.5625 1.3125,-2.3125 -1.75,-1.375 0.25,-1.1875 -0.6875,-6.6875 1.5625,-1.5625 0.75,-2.9375 -2.75,-3.1875 -0.375,-2.375 1.5625,-2.75 -1.5,-3.375 1.3125,-2.4375 1.0625,-2.5625 0.9375,-2.25 2.3125,0.9375 0.8125,1.6875 1.375,0.5 0.6875,-3.9375 -2.0625,-0.875 -0.75,-1.25 0.0625,-2.75 -1.5625,-1.6875 0.8125,-4.125 1.625,-2.8125 0.75,-6.3125 -3.3125,-0.875 -1.9375,0.3125 -2.0625,-0.9375 -1.0625,0.625 -2.6875,-0.75 -1.375,0.25 -2.4375,-1.4375 -6.125,-1.5 -5.9375,-0.1875 -3.875,0.1875 -0.8125,-0.9375 -8.6875,-4.0625 z").attr({ class: 'X', id: 'X', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'X');
                    var Y = paper.path("M 174.5625,248 161,253.8125 l -9.1875,-1.4375 -8.5,-1.625 -2.5,-2.6875 -2.6875,6.1875 -0.25,3.375 0.875,4.8125 -5,2.1875 -1.375,-0.75 -1.0625,1.0625 -3.1875,-1.5625 -2.25,1.9375 -2.25,-1.375 -1.6875,0.625 4,5.125 -0.375,2.1875 0.25,3.25 1.5,-0.625 1.625,0.875 -0.125,2.875 10,8.9375 8.8125,10.5625 -7.4375,1.125 -3.9375,5.1875 -1.5625,2.1875 -0.5625,3.125 -2.5,-0.75 -2.625,1.125 -3.5,-0.8125 -7.875,3.875 -7.25,1 -2.5,1.75 -1.3125,-1.4375 -3.4375,-0.4375 -2.625,0.5 0.0625,2.75 0.6875,3.5 -1.1875,0 0.5,2.375 1.375,0.375 1.625,3.875 4.5625,2.6875 2.5,-1.8125 1.0625,0.875 3.375,-2.9375 3.0625,-0.25 8.6875,4.0625 0.8125,0.9375 3.875,-0.1875 5.9375,0.1875 6.125,1.5 2.4375,1.4375 1.375,-0.25 2.6875,0.75 1.0625,-0.625 2.0625,0.9375 1.9375,-0.3125 3.3125,0.875 0.9375,-2.3125 1.875,-0.5 0.625,-2.0625 -3.3125,-0.9375 -1.75,-2.8125 0.375,-1.75 1.6875,-0.5 -0.5,-3.6875 -2.25,-0.8125 -0.0625,-1.25 1.875,-0.75 1.625,3.3125 3.1875,0.6875 -0.5,-2.25 1.5625,-1.4375 2.125,1.1875 1.1875,-3.5625 3.25,-2.625 -1.9375,-1.625 1.5,-1.3125 2.1875,-3.5625 -2.875,0.25 -0.3125,-1.625 2.6875,0.5625 2.9375,-3.125 -1.3125,-1.25 1.0625,-0.9375 2.4375,1.75 2.125,-3.6875 1,-3.25 -3.5,-0.5 0.4375,-1.375 1.75,-0.125 0.25,-2.1875 2.0625,-4.3125 2.375,0.0625 4.375,-3.0625 1.8125,1.1875 1.5625,-2.0625 0.125,-3.875 2.3125,-0.625 0.75,-6.5 -2.3125,-3.9375 -0.0625,-1.9375 -4.8125,-7.25 -1.375,-1.5 -2.0625,0.375 -1.0625,-1.3125 -2.5,-0.5 -2.9375,-0.375 -1.4375,-3.4375 0.875,-2 L 174.5625,248 z").attr({ class: 'Y', id: 'Y', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'Y');
                    var AC = paper.path("M 115.75 140.125 L 116.0625 143 L 107.6875 149.4375 L 106.625 149.5625 L 98.25 149.9375 L 99.875 164.75 L 98 170.3125 L 96.9375 181.5 L 96.75 188.125 L 94.1875 190.625 L 93.25 196.625 L 98.875 201.6875 L 99.9375 202.0625 L 100.8125 203.375 L 102.1875 205 L 102.0625 206.75 L 103.5625 208.6875 L 105.25 208.8125 L 106.8125 211.0625 L 107.0625 213.8125 L 110.75 215.5625 L 112.6875 218.625 L 111.3125 219.5625 L 112.75 220.5 L 113.25 221.8125 L 114.5 221.4375 L 114.5 222.625 L 116.875 224.6875 L 117.4375 228.1875 L 118.8125 228.25 L 118.5625 224.6875 L 120.0625 223.875 L 121 226.6875 L 121.1875 229.5625 L 126.625 233.1875 L 126.6875 236.5625 L 130.1875 236.1875 L 140.8125 248.0625 L 143.3125 250.75 L 151.8125 252.375 L 161 253.8125 L 174.5625 248 L 176.5 249.8125 L 175.625 251.8125 L 177.0625 255.25 L 180 255.625 L 182.5 256.125 L 183.5625 257.4375 L 185.625 257.0625 L 187 258.5625 L 191.8125 265.8125 L 191.875 267.75 L 194.1875 271.6875 L 196.4375 272.1875 L 198.25 271.3125 L 196.8125 268.4375 L 197.75 267.0625 L 200.25 269.3125 L 202.25 272.875 L 203.875 271.625 L 203.125 269.1875 L 203.6875 268.125 L 206.8125 264.0625 L 208.5625 264.125 L 208.8125 261.875 L 211 262.1875 L 214.4375 261.9375 L 214.875 260.5 L 216.6875 260.4375 L 217.0625 257.0625 L 218.6875 254.875 L 221.6875 254.3125 L 223.0625 251.5625 L 224.4375 247.875 L 225.9375 242.6875 L 226.4375 238.1875 L 228.6875 235.125 L 231.3125 231.5 L 235.3125 228.125 L 237.5625 223.8125 L 237.4375 222.1875 L 235.8125 222.4375 L 234.75 218.6875 L 232.875 216.75 L 230.5625 216.4375 L 229.125 214.0625 L 230.0625 212.75 L 229.9375 208.875 L 226.25 208.625 L 225 206.0625 L 227.3125 206.4375 L 229.6875 203.0625 L 228.875 200.6875 L 231.1875 199.6875 L 233.5625 194.25 L 229.625 192.1875 L 229.125 190.4375 L 218.5 189.3125 L 200.9375 182.1875 L 197.0625 190.8125 L 196.0625 191.9375 L 192.5625 194.0625 L 190.9375 192.3125 L 189.3125 191.3125 L 189.1875 190.1875 L 189.8125 189.1875 L 185.8125 186.4375 L 184.9375 186.6875 L 184.8125 185.5625 L 182.9375 184.875 L 181.125 183.875 L 180.4375 182.8125 L 179.375 182.25 L 179 181.125 L 178 180.75 L 175.6875 180.75 L 174.3125 179.25 L 172.625 178.3125 L 170 177.6875 L 168.75 176.6875 L 167.75 174.6875 L 165.625 174.0625 L 160.1875 172.375 L 157.625 171.375 L 140.5 154 L 136.6875 153.9375 L 122.4375 142.625 L 115.75 140.125 z ").attr({ class: 'AC', id: 'AC', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'AC');
                    var Z = paper.path("m 93.25,196.625 -2.375,3.125 -11.5,21.5625 4.9375,3.6875 3.25,1.125 0.875,1.125 0.0625,2.875 0.375,9.5625 -4.3125,8.5625 -5.125,-1.8125 -8.5625,-2.0625 -2.0625,-0.5 -6.375,1.875 -4.5,3.4375 -6.5625,9.8125 -1.4375,1.6875 -0.625,2.5625 -3.125,3.3125 L 47.25,271.875 41.8125,281 46,293.9375 l -2.8125,4.125 0.75,7.125 -2.0625,6.125 4.5,16.75 6.6875,2.1875 3.875,-0.1875 3,4.0625 2,2.875 2.5,2.8125 3.0625,-1.5 0.5,2.125 1,0.375 -3.625,3.3125 4.3125,5.25 2,4.25 -0.25,2.0625 1.25,1.75 1.0625,-0.75 6.125,1.125 2,0.8125 4.8125,0.25 3.4375,1 1.25,1.25 1.9375,-2 0.6875,-7.4375 3.6875,-5.5625 0.8125,1.5 1.5625,-0.875 1.5625,2.875 0.5625,-2.375 3.1875,0.25 1.375,1.125 0,-2.1875 0.1875,-2.5 -0.5625,-2.125 7.1875,-5.5 -0.3125,-3.5 -1.3125,-0.9375 -0.25,-3.0625 -1.0625,-0.875 -2.5,1.8125 -4.5625,-2.6875 -1.625,-3.875 -1.375,-0.375 -0.5,-2.375 1.1875,0 -0.6875,-3.5 -0.0625,-2.75 2.625,-0.5 3.4375,0.4375 1.3125,1.4375 2.5,-1.75 7.25,-1 7.875,-3.875 3.5,0.8125 2.625,-1.125 2.5,0.75 0.5625,-3.125 1.5625,-2.1875 3.9375,-5.1875 7.4375,-1.125 -8.8125,-10.5625 -10,-8.9375 0.125,-2.875 -1.625,-0.875 -1.5,0.625 -0.25,-3.25 0.375,-2.1875 -4,-5.125 1.6875,-0.625 2.25,1.375 2.25,-1.9375 3.1875,1.5625 1.0625,-1.0625 1.375,0.75 5,-2.1875 -0.875,-4.8125 0.25,-3.375 2.6875,-6.1875 -10.625,-11.875 -3.5,0.375 -0.0625,-3.375 -5.4375,-3.625 -0.1875,-2.875 -0.9375,-2.8125 -1.5,0.8125 0.25,3.5625 -1.375,-0.0625 -0.5625,-3.5 -2.375,-2.0625 0,-1.1875 -1.25,0.375 -0.5,-1.3125 -1.4375,-0.9375 1.375,-0.9375 -1.9375,-3.0625 -3.6875,-1.75 -0.25,-2.75 -1.5625,-2.25 -1.6875,-0.125 -1.5,-1.9375 0.125,-1.75 -1.375,-1.625 -0.875,-1.3125 -1.0625,-0.375 -5.625,-5.0625 z m -8.6875,83.6875 3.4375,1.0625 2.8125,1.1875 2.125,1.875 1.4375,-0.4375 2.3125,1.4375 -2.5,-0.3125 -0.3125,1.25 1.375,1.1875 1.0625,0.5 -1.25,0.625 L 93.5,289.25 93.75,292 94.3125,295.3125 95,300.25 94,303.875 92.6875,303.0625 91.5,299.5 l 1.375,-0.3125 0.0625,-3.25 -1.0625,-3.625 -0.4375,-2.25 -2,-1.625 -2.5,-0.9375 -1.625,-1.5625 2.125,-0.0625 -2.875,-5.5625 z").attr({ class: 'Z', id: 'Z', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'Z');
                    var BD = paper.path("m 201.625,11.9375 -7.875,1.4375 3.8125,5.25 0.75,5.0625 -1.375,6.0625 -2.3125,3.75 -2.0625,2 5.125,2.4375 -5.1875,6.5625 -16.3125,-5.625 -6.4375,1.0625 -3.5625,-3.125 -4.8125,2.3125 -0.125,6.125 1.6875,9.8125 -3.5,9.0625 -0.4375,1.5 -4.625,-3.4375 -6.375,-3.25 -1.625,3.125 L 139,67.625 138,68.5625 134.9375,82 133,85.8125 l -3.875,0.75 -1.5,4 5,8.75 0.6875,2.9375 -0.875,6.9375 -4.875,4.25 -1.9375,2.375 -6.6875,13 -4.5625,5.25 1.375,6.0625 6.6875,2.5 14.25,11.3125 3.8125,0.0625 17.125,17.375 2.5625,1 5.4375,1.6875 2.125,0.625 1,2 1.25,1 2.625,0.625 1.6875,0.9375 1.375,1.5 2.3125,0 1,0.375 0.375,1.125 1.0625,0.5625 0.6875,1.0625 1.8125,1 1.875,0.6875 0.125,1.125 0.875,-0.25 4,2.75 -0.625,1 0.125,1.125 1.625,1 1.625,1.75 3.5,-2.125 1,-1.125 3.875,-8.625 17.5625,7.125 10.625,1.125 0.5,1.75 3.9375,2.0625 1.1875,-3.1875 -1.0625,-4.4375 1.6875,-1.3125 0.25,-1.375 -4.5625,-2.875 0.8125,-1.375 2.875,-1.1875 3.125,0.1875 2.125,-0.9375 1.1875,-2.25 -2.625,-2.6875 3.25,-0.1875 2.125,-0.125 -0.125,-1.9375 1.0625,-0.5 2.4375,0.6875 0.9375,-0.5 -1.1875,-2 -0.5625,-2.3125 -0.5625,-2.6875 -0.25,-3.3125 0.4375,-3.0625 1.875,-0.9375 1.625,2.3125 0.0625,1.6875 2.1875,-0.1875 1.875,2.25 1.4375,0.5 -0.125,-1.5625 -2.0625,-2.125 -0.75,-3.875 0.5625,-0.6875 1.625,0.9375 1.375,3.3125 3.625,1.375 2.0625,1.75 0.8125,-3.6875 0.75,-1.375 1.25,0.5 2.9375,0.9375 0.8125,-2.1875 2.1875,1 1.3125,-0.5625 0.25,-1.25 1.3125,0.0625 1.75,1.3125 5.8125,-1.25 -2.9375,-6.9375 -0.8125,-2.75 -1.75,-2.75 0,-1.1875 -0.625,-0.6875 0,-1.5625 -1.4375,-0.0625 -2.625,-0.8125 -2.5,-5.6875 0.625,-4.125 -1.125,-1.625 0,-1.25 1.25,-0.875 0,-1.5 1.4375,-0.5625 -0.1875,-1.5 1.125,-1.4375 -0.375,-3.1875 0.25,-1.625 -0.5,-3.6875 0.1875,-1.3125 1.125,0.3125 0.125,-1.75 -0.8125,-1.625 -2,-2.3125 -0.25,-1.875 -1.125,-0.5625 -0.3125,-1.375 -1,-0.1875 -1.875,-2.0625 -0.375,-2.3125 -2.25,-3.0625 0.375,-1.5625 -0.625,-1.125 0.3125,-2.0625 2.1875,-0.875 0.625,-2.5 -0.875,-0.3125 -0.1875,-1.9375 0.4375,-1.625 -1.25,-1.25 -0.625,0.8125 -2.6875,-1.125 -0.5625,0.8125 -1.8125,-1.5 1.125,-2.375 -0.625,-1.25 0.875,0 0.3125,-2.9375 -1.625,-2.5625 L 257.125,65 l -0.5,-1.75 0.4375,-3.125 1.9375,-1.0625 -0.5,-2.625 -1.5,-0.1875 -0.5625,-1.75 -1.0625,0 -0.375,-1.25 -1.25,0 -1.4375,-3.5 -1.1875,-1.25 -1.625,0.9375 -0.75,-1.3125 0.0625,-1.8125 -0.1875,-1.625 -1.5,-1.25 -0.3125,-1.625 -1.9375,-0.9375 -0.5625,-0.0625 -1.875,-0.875 -0.0625,-1.25 -0.9375,-0.625 -0.4375,0.8125 -1.875,-1.125 -0.6875,-0.9375 -0.5625,0.5 -3.375,-1.5 -0.75,0.875 -0.8125,-1.375 -1.375,0.375 -1.8125,0 -1.75,-0.5 L 227.5625,34 227.5,32.5625 l -3,-1.6875 -2.25,0.0625 0.0625,-1.5 L 220.375,28 218.4375,27.4375 217,26.75 l -0.375,-2.9375 -1.0625,-0.5 -0.9375,0.5625 -1.25,-2.3125 -4.0625,-3.5 -1.375,0.25 -1.375,-1.625 0.8125,-1.0625 0.3125,-0.875 -1,-0.4375 -1.5,-1.8125 -3.5625,-0.5625 z M 146,136.625 l 4.375,2.125 2.0625,2.5 2.3125,2.3125 2.0625,2.3125 3,1.5 1.125,2.75 1.8125,1.75 1.6875,-0.8125 1.125,1.3125 -0.6875,1.0625 -2.75,0.5625 0.9375,2.9375 -0.8125,2.5 5,6.125 2.4375,-0.0625 1.5,0.9375 -0.3125,2 1,1.1875 2,1.5 -0.125,1.25 -4.4375,-1.4375 -1.1875,-0.75 -1.75,0.5625 -2,-5.8125 -3,-4.3125 -0.9375,2.625 -1.5625,0.0625 -0.4375,-2.875 0.6875,-1.6875 -0.1875,-1.625 -2.125,-2.9375 2.25,-1.125 1.625,-0.6875 -2.1875,-2.125 -2.375,-2.625 -3,-1.3125 -0.25,-2.125 -2.5,-3.3125 -4.875,-2.9375 0.5,-1.3125 z").attr({ class: 'BD', id: 'BD', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'BD');
                    var W = paper.path("m 46.3755,328.0625 -4.5,24.6875 5.6875,7.625 3.25,-0.125 5.75,10.1875 -1,5.25 -1.1875,2.75 -1.9375,1.4375 -0.6875,4.4375 0.5,2.3125 10.1875,11.6875 0.5625,3.1875 1.25,0.0625 0.875,2.875 2.8125,5.1875 1.25,3.75 1.625,1.25 2.8125,0.3125 3.375,7 2.6875,3.8125 -0.375,-3.6875 1.625,0 0.4375,1.375 2.25,-0.1875 1.0625,3.1875 0.5625,3.625 5.125,3.5 7.125,1.1875 -0.625,-4.3125 1.75,-1.125 1.25,-0.125 0.1875,1.75 1.5625,1.1875 1.6875,-1 0.5625,0.8125 1.125,-0.1875 1.3125,2.0625 2.125,1.625 2.5,2.875 1.75,3.1875 1.875,-2.125 1.125,-2.5 1.875,0.125 1.5625,0.625 0.75,-3.375 -1.0625,-1.5 1.25,-2.4375 -0.0625,-1.5625 0.9375,-0.625 0.5625,-1.5 2.625,0.625 1.6875,-1.4375 1.25,0.375 0.75,1.875 1.25,0.1875 1.5,0.9375 -0.375,1.875 0.875,0.4375 4.3125,-0.4375 1,-1.8125 2.125,-1.4375 0.0625,-1.4375 1.1875,-0.5 3.5,-0.25 -1.9375,-1.6875 -0.25,-2.5625 -0.9375,-0.5 -0.25,-1.75 -1.3125,-1.0625 -2.75,-0.75 -2.375,-4.6875 -0.5625,-1.375 -1,-0.3125 -2,-3.9375 2.1875,-0.6875 1.8125,-2.8125 -0.4375,-1.5625 1.625,-1.25 0.5625,-2.25 -3.6875,-4.125 -2.25,-5.6875 -4.6875,-0.5 -3.9375,-2.25 -1.75,-3.3125 -0.5625,-4.25 -9.375,-13.5 -1.56295,-4.25 -1.99955,5.125 -3.375,-0.625 -2.5625,0.1875 -1.1875,-0.5 -2.25,0.4375 0.875,-2.125 -0.5625,-2.5 -3.4375,-1.4375 -1.9375,2 -1.25,-1.25 -3.4375,-1 -4.8125,-0.25 -2,-0.8125 -6.125,-1.125 -1.0625,0.75 -1.25,-1.75 0.25,-2.0625 -2,-4.25 -4.3125,-5.25 3.625,-3.3125 -1,-0.375 -0.5,-2.125 -3.0625,1.5 -2.5,-2.8125 -2,-2.875 -3,-4.0625 -3.875,0.1875 -6.6875,-2.1875 z m 48.625,60.5 1.875,2.75 1.3125,0 3.625,3.6875 1.6875,-1.0625 1.25,-1.125 1.875,1.3125 -1.4375,1.625 -1.75,0.6875 -0.375,3.5625 -1.3125,-3.3125 -3.9375,1.9375 -1.375,-2.25 -2.3125,-3.0625 1.75,0.0625 1.0625,-0.5625 -1.125,-1.1875 -1.6875,-0.1875 -0.25,-1.75 1.125,-1.125 z").attr({ class: 'W', id: 'W', parent: 'Lan', 'stroke-width': '0', 'stroke-opacity': '1', 'fill': options.defaultFillColor }).data('id', 'W');
                    Lan.attr({ 'class': 'lan', 'id': 'Lan', 'name': 'Lan' });
                    Lan.geoType = "Region";
                    Lan.push(AB, C, D, E, F, G, H, I, K, M, N, O, S, T, U, X, Y, AC, Z, BD, W);
                    Lan.translate(170, 170);
                    return Lan;
                },
                isRaphaelMap: true
            }
        ]);
    })(raphael = app.raphael || (app.raphael = {}));
})(app || (app = {}));
//# sourceMappingURL=raphael-maps.js.map
/// <reference path="../../../scripts/typings/raphael/raphael.d.ts" />
var app;
(function (app) {
    var raphael;
    (function (raphael) {
        var RaphaelMapCreator = (function () {
            function RaphaelMapCreator() {
            }
            RaphaelMapCreator.prototype.CreateMap = function (element) {
                var that = this;
                this.element = element;
                this.paper = Raphael(this.element);
                this.viewBoxWidth = this.paper.width;
                this.viewBoxHeight = this.paper.height;
                this.canvasID = "#paper";
                var startX, startY;
                var mousedown = false;
                var dX, dY;
                this.viewBox = this.paper.setViewBox(0, 0, this.viewBoxWidth, this.viewBoxHeight, false);
                this.viewBox.X = 0;
                this.viewBox.Y = 0;
                function handle(delta) {
                }
                function wheel(event, delta) {
                    if (delta) {
                        handle(delta);
                    }
                    if (event.preventDefault)
                        event.preventDefault();
                    event.returnValue = false;
                }
                //(<any>$(this.canvasID)).mousewheel(function (e, delta) {
                //    that.wheel(e, delta);
                //});
                //Pane
                var raphaelPaper = this.paper;
                $(this.canvasID).mousedown(function (e) {
                    if (raphaelPaper.getElementByPoint(e.pageX, e.pageY) != null) {
                        return;
                    }
                    mousedown = true;
                    startX = e.pageX;
                    startY = e.pageY;
                    console.log(startX, startY);
                });
                $(this.canvasID).mousemove(function (e) {
                    if (mousedown == false) {
                        return;
                    }
                    dX = startX - e.pageX;
                    dY = startY - e.pageY;
                    var x = that.viewBoxWidth / raphaelPaper.width;
                    var y = that.viewBoxHeight / raphaelPaper.height;
                    dX *= x;
                    dY *= y;
                    raphaelPaper.setViewBox(that.viewBox.X + dX, that.viewBox.Y + dY, that.viewBoxWidth, that.viewBoxHeight, false);
                });
                $(this.canvasID).mouseup(function (e) {
                    if (mousedown == false)
                        return;
                    if (!isNaN(dX)) {
                        that.viewBox.X += dX;
                    }
                    if (!isNaN(dY)) {
                        that.viewBox.Y += dY;
                    }
                    mousedown = false;
                });
                this.resetZoomAndPane();
                return this.paper;
            };
            //restoreZoomAndPane(canavasSettings: CanvasSetting) {
            //    this.viewBox.X = canavasSettings.viewBoxX;
            //    this.viewBox.Y = canavasSettings.viewBoxY;
            //    this.viewBoxWidth = canavasSettings.viewBoxWidth;
            //    this.viewBoxHeight = canavasSettings.viewBoxHeight;
            //    this.paper.setViewBox(canavasSettings.viewBoxX, canavasSettings.viewBoxY, canavasSettings.viewBoxWidth, canavasSettings.viewBoxHeight, false);
            //}
            RaphaelMapCreator.prototype.resetZoomAndPane = function () {
                this.viewBox.X = 98.90872462649901;
                this.viewBox.Y = 169.94626224484375;
                this.viewBoxWidth = 384.182550747002;
                this.viewBoxHeight = 660.1074755103125;
                this.paper.setViewBox(this.viewBox.X, this.viewBox.Y, this.viewBoxWidth, this.viewBoxHeight, false);
            };
            RaphaelMapCreator.prototype.wheel = function (event, delta) {
                if (delta) {
                    this.handleScroll(delta);
                }
                if (event.preventDefault)
                    event.preventDefault();
                event.returnValue = false;
            };
            RaphaelMapCreator.prototype.handleScroll = function (delta) {
                var vBHo = this.viewBoxHeight;
                var vBWo = this.viewBoxWidth;
                if (delta < 0) {
                    this.viewBoxWidth *= 0.95;
                    this.viewBoxHeight *= 0.95;
                }
                else {
                    this.viewBoxWidth *= 1.05;
                    this.viewBoxHeight *= 1.05;
                }
                if (!isNaN(this.viewBox.X) && !isNaN(this.viewBox.Y)) {
                    this.viewBox.X -= (this.viewBoxWidth - vBWo) / 2;
                    this.viewBox.Y -= (this.viewBoxHeight - vBHo) / 2;
                    console.log(this.viewBox.X, this.viewBox.Y, this.viewBoxWidth, this.viewBoxHeight);
                    this.paper.setViewBox(this.viewBox.X, this.viewBox.Y, this.viewBoxWidth, this.viewBoxHeight, false);
                }
            };
            return RaphaelMapCreator;
        })();
        raphael.RaphaelMapCreator = RaphaelMapCreator;
        angular.module('app.raphael').service('raphaelMapCreator', RaphaelMapCreator);
    })(raphael = app.raphael || (app.raphael = {}));
})(app || (app = {}));
//# sourceMappingURL=raphael-map-creator.js.map
angular.module('app.raphael').directive('raphaelMap', [
    'raphaelMaps',
    'raphaelMapCreator',
    'raphaelColorScale',
    function (raphaelMaps, raphaelMapCreator, raphaelColorScaleFactory) {
        return {
            scope: {
                regionData: "="
            },
            link: function (scope, element, attrs) {
                function buildMap() {
                    return raphaelMapCreator.CreateMap(element[0]);
                }
                var map = _.find(raphaelMaps, function (b) {
                    return b.name === 'Region2007';
                });
                buildMap();
                var pathGroup = map.func(raphaelMapCreator.paper, {
                    defaultFillColor: '#bbc8d5'
                });
                var colors = {
                    red: '#F44336',
                    pink: '#E91E63',
                    purple: '#9C27B0',
                    deeppurple: '#673AB7',
                    indigo: '#3F51B5',
                    lightblue: '#03A9F4',
                    cyan: '#00BCD4',
                    teal: '#009688',
                    lightgreen: '#8BC34A',
                    lime: '#CDDC39',
                    lightyellow: '#FFEB3B',
                    orange: '#FF9800',
                    deeporange: '#FF5722',
                    grey: '#9E9E9E',
                    bluegrey: '#607D8B',
                    brown: '#795548',
                    lightgrey: '#ECECEC'
                };
                var colorsArray = [];
                for (var prop in colors) {
                    colorsArray.push(colors[prop]);
                }
                for (var j = 0; j < pathGroup.length; j++) {
                    var path = pathGroup[j];
                    if (j < colorsArray.length) {
                    }
                    path.attr({ 'fill': '#009688' });
                    (function (hPath) {
                        hPath.hover(function () {
                            if (!hPath.isClicked) {
                                hPath.attr({ "stroke": '#FFEB3B', 'stroke-width': '2', 'cursor': 'pointer' });
                            }
                        }, function () {
                            if (!hPath.isClicked) {
                                hPath.attr({ "stroke": "none" });
                            }
                        });
                    }(path));
                }
                //var minColor = "#DEDEDE";
                //var maxColor = "#F0F716";
                //var max = Number.MIN_VALUE,
                //    min = Number.MAX_VALUE;
                //for (var cc in scope.regionData) {
                //    var val = parseFloat(scope.regionData[cc].count);
                //    if (val > max) max = scope.regionData[cc].count;
                //    if (val < min) min = val;
                //}
                //var colorScale = raphaelColorScaleFactory.createColorScale([minColor, maxColor], "polynomial", 0, max);
                //_.forEach(pathGroup, (path: RaphaelPath) => {
                //    var id = path.data('id');
                //    var dataWithId = _.where(scope.regionData, (region: app.raphael.Region) => {
                //        return region.regionId === id;
                //    });
                //    var value = dataWithId.reduce(function(a: app.raphael.Region, b: app.raphael.Region) {
                //         return (a.count || 0) + (b.count || 0);
                //    }, 0);
                //    if (value > 0) {
                //        path.attr({ 'fill': colorScale.getValue(value) });
                //    }
                //});
            }
        };
    }
]);
//# sourceMappingURL=raphael-map.js.map
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var raphael;
    (function (raphael) {
        var NumericScale = (function () {
            function NumericScale(scale, normalizeFunction, minValue, maxValue) {
                this.scale = [];
                normalizeFunction = normalizeFunction || 'linear';
                if (scale) {
                    this.setScale(scale);
                }
                if (normalizeFunction)
                    this.setNormalizeFunction(normalizeFunction);
                if (minValue !== undefined) {
                    this.setMin(minValue);
                }
                if (maxValue !== undefined) {
                    this.setMax(maxValue);
                }
            }
            NumericScale.prototype.setMin = function (min) {
                this.clearMinValue = min;
                if (typeof this.normalize === 'function') {
                    this.minValue = this.normalize(min);
                }
                else {
                    this.minValue = min;
                }
            };
            NumericScale.prototype.setMax = function (max) {
                this.clearMaxValue = max;
                if (typeof this.normalize === 'function') {
                    this.maxValue = this.normalize(max);
                }
                else {
                    this.maxValue = max;
                }
            };
            NumericScale.prototype.setScale = function (scale) {
                var i;
                for (i = 0; i < scale.length; i++) {
                    this.scale[i] = [scale[i]];
                }
            };
            NumericScale.prototype.setNormalizeFunction = function (f) {
                if (f === 'polynomial') {
                    this.normalize = function (value) {
                        return Math.pow(value, 0.2);
                    };
                }
                else if (f === 'linear') {
                    delete this.normalize;
                }
                else {
                    this.normalize = f;
                }
                this.setMin(this.clearMinValue);
                this.setMax(this.clearMaxValue);
            };
            NumericScale.prototype.getValue = function (value) {
                var lengthes = [], fullLength = 0, l, i = 0, c;
                if (typeof this.normalize === 'function') {
                    value = this.normalize(value);
                }
                for (i = 0; i < this.scale.length - 1; i++) {
                    l = this.vectorLength(this.vectorSubtract(this.scale[i + 1], this.scale[i]));
                    lengthes.push(l);
                    fullLength += l;
                }
                c = (this.maxValue - this.minValue) / fullLength;
                for (i = 0; i < lengthes.length; i++) {
                    lengthes[i] *= c;
                }
                i = 0;
                value -= this.minValue;
                while (value - lengthes[i] >= 0) {
                    value -= lengthes[i];
                    i++;
                }
                if (i == this.scale.length - 1) {
                    value = this.vectorToNum(this.scale[i]);
                }
                else {
                    value = (this.vectorToNum(this.vectorAdd(this.scale[i], this.vectorMult(this.vectorSubtract(this.scale[i + 1], this.scale[i]), (value) / (lengthes[i])))));
                }
                return value;
            };
            NumericScale.prototype.vectorToNum = function (vector) {
                var num = 0, i;
                for (i = 0; i < vector.length; i++) {
                    num += Math.round(vector[i]) * Math.pow(256, vector.length - i - 1);
                }
                return num;
            };
            NumericScale.prototype.vectorSubtract = function (vector1, vector2) {
                var vector = [], i;
                for (i = 0; i < vector1.length; i++) {
                    vector[i] = vector1[i] - vector2[i];
                }
                return vector;
            };
            NumericScale.prototype.vectorAdd = function (vector1, vector2) {
                var vector = [], i;
                for (i = 0; i < vector1.length; i++) {
                    vector[i] = vector1[i] + vector2[i];
                }
                return vector;
            };
            NumericScale.prototype.vectorMult = function (vector, num) {
                var result = [], i;
                for (i = 0; i < vector.length; i++) {
                    result[i] = vector[i] * num;
                }
                return result;
            };
            NumericScale.prototype.vectorLength = function (vector) {
                var result = 0, i;
                for (i = 0; i < vector.length; i++) {
                    result += vector[i] * vector[i];
                }
                return Math.sqrt(result);
            };
            return NumericScale;
        })();
        raphael.NumericScale = NumericScale;
        var ColorScale = (function (_super) {
            __extends(ColorScale, _super);
            function ColorScale(colors, normalizeFunction, minValue, maxValue) {
                _super.call(this, colors, normalizeFunction, minValue, maxValue);
            }
            ColorScale.prototype.setScale = function (scale) {
                var i;
                for (i = 0; i < scale.length; i++) {
                    this.scale[i] = this.rgbToArray(scale[i]);
                }
            };
            ColorScale.prototype.getValue = function (value) {
                return this.numToRgb(_super.prototype.getValue.call(this, value));
            };
            ColorScale.prototype.arrayToRgb = function (ar) {
                var rgb = '#', d, i;
                for (i = 0; i < ar.length; i++) {
                    d = ar[i].toString(16);
                    rgb += d.length == 1 ? '0' + d : d;
                }
                return rgb;
            };
            ColorScale.prototype.numToRgb = function (num) {
                num = num.toString(16);
                while (num.length < 6) {
                    num = '0' + num;
                }
                return '#' + num;
            };
            ColorScale.prototype.rgbToArray = function (rgb) {
                rgb = rgb.substr(1);
                return [parseInt(rgb.substr(0, 2), 16), parseInt(rgb.substr(2, 2), 16), parseInt(rgb.substr(4, 2), 16)];
            };
            return ColorScale;
        })(NumericScale);
        raphael.ColorScale = ColorScale;
        angular.module('app.raphael').factory('raphaelColorScale', function () {
            return {
                createColorScale: function (colors, normalizeFunction, minValue, maxValue) {
                    return new ColorScale(colors, normalizeFunction, minValue, maxValue);
                }
            };
        });
    })(raphael = app.raphael || (app.raphael = {}));
})(app || (app = {}));
//# sourceMappingURL=raphael-color-scale.js.map
angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/auth/views/login.html',
    "<div class=container><div class=login-box><h2 class=logo-font>Bokaettband.se</h2><h4>Logga in på ditt konto</h4><form name=form class=\"form-horizontal md-update\"><fieldset><div class=form-group><div class=col-lg-12><input auto-fillable-field type=email class=form-control id=inputEmail placeholder=Email ng-model=vm.userName name=email required><div ng-show=\"form.email.$dirty && form.email.$invalid\"><span class=form-validation-error ng-show=form.email.$error.required>Fyll i din Email!</span> <span class=form-validation-error ng-show=form.email.$error.email>Fyll i en korrekt Email!</span></div></div></div><div class=form-group><div class=col-lg-12><input auto-fillable-field type=password class=form-control id=inputpassword placeholder=Lösenord ng-model=vm.password name=password required><div ng-show=\"form.password.$dirty && form.password.$invalid\"><span class=form-validation-error ng-show=form.password.$error.required>Fyll i ditt lösenord!</span></div></div></div><div class=checkbox><label><input type=checkbox ng-model=vm.rememberMe id=remember> Kom ihåg mig!</label></div><div class=clearfix></div><button ng-click=vm.login() ng-disabled=form.$invalid class=\"btn btn-primary col-xs-12\">Logga in</button><p style=\"font-size: 10px\">Den här applikationen ska fungera i alla de senaste webbläsarna. Applikationen var dock utvecklad med hjälp av Google Chrome. Ladda ner och installera <a href=\"https://www.google.com/intl/en/chrome/browser/\">Google Chrome här</a> för den bästa upplevelsen.</p></fieldset><span class=form-validation-error>{{vm.errorDescription}}</span></form><hr></div></div>"
  );


  $templateCache.put('app/auth/views/register.html',
    "<div class=container><div class=\"row start-height\"><div class=col-md-6><div class=well><form class=\"form-horizontal md-update\" name=form><fieldset><legend>Regristrera dig!</legend><div class=form-group><label for=inputEmail class=\"col-lg-2 control-label\">E-mail</label><div class=col-lg-10><input type=email class=form-control id=inputEmail placeholder=E-mail ng-model=vm.user.Email name=email required><div ng-show=\"form.email.$dirty && form.email.$invalid\"><span class=form-validation-error ng-show=form.email.$error.required>Fyll i en emial</span> <span class=form-validation-error ng-show=form.email.$error.email>Ogiltig email-adress!</span></div></div></div><div class=form-group><label for=inputEmail class=\"col-lg-2 control-label\">Förnamn</label><div class=col-lg-10><input type=text class=form-control id=inputFistName placeholder=Förnamn ng-model=vm.user.FirstName name=firstName required><div ng-show=\"form.firstName.$dirty && form.firstName.$invalid\"><span class=form-validation-error ng-show=form.firstName.$error.required>Fyll i ditt förnamn</span></div></div></div><div class=form-group><label for=inputEmail class=\"col-lg-2 control-label\">Efternamn</label><div class=col-lg-10><input type=text class=form-control id=inputLastname placeholder=Efternamn ng-model=vm.user.LastName name=lastName required><div ng-show=\"form.lastName.$dirty && form.lastName.$invalid\"><span class=form-validation-error ng-show=form.lastName.$error.required>Fyll i ditt Efternamn</span></div></div></div><div class=form-group><label for=inputPassword class=\"col-lg-2 control-label\">Lösenord</label><div class=col-lg-10><input type=password class=form-control id=inputPassword placeholder=Lösenord ng-model=vm.user.Password name=password ng-minlength=6 required><div ng-show=\"form.password.$dirty && form.password.$invalid\"><span class=form-validation-error ng-show=form.password.$error.required>Skriv i ett lösenord</span> <span class=form-validation-error ng-show=form.password.$error.minlength>Ditt lösenord måste vara minst sex bokstäver/siffror långt</span></div></div></div><div class=form-group><label for=inputPassword class=\"col-lg-2 control-label\">Upprepa lösenord</label><div class=col-lg-10><input type=password class=form-control id=inputConfirmPassword placeholder=\"Upprepa lösenord\" ng-model=vm.user.ConfirmPassword name=passwordConfirm pw-check=inputPassword required><div ng-show=\"form.passwordConfirm.$dirty && form.passwordConfirm.$invalid\"><span class=form-validation-error ng-show=form.passwordConfirm.$error.required>Du måste upprepa ditt lösenord</span> <span class=form-validation-error ng-show=form.passwordConfirm.$error.pwmatch>Löenordet måste vara identiskt med det ovan</span></div></div></div><fieldset><legend>Profil-url <i style=cursor:pointer class=icon-material-help ng-click=\"vm.profileHelpIsCollapsed = !vm.profileHelpIsCollapsed\"></i></legend><div class=\"panel panel-info\" collapse=vm.profileHelpIsCollapsed><div class=panel-heading><h3 class=panel-title>Vad är profilurl?</h3></div><div class=panel-body>Profilurl:en är din adressen till din personliga sida. Om du bara fyller i ditt namn ovan kommer systemet skapa en url som är http://www.bokaettband.se/förnamnefternamn. Om denna är upptagen eller om du vill ha någon annan adress kan du dock ändra adressen i textboxen nedan. Du får dock bara använda tecken som r giltiga i en URL/Adress.<br><strong>OBS! Om du regristrerar en adress som semantiskt är någon annans ex: http://www.brokaettband.se/metallica kan du komma att förlora denna adress vid efterfrågan.</strong></div></div></fieldset><div url-creator base-url=vm.baseUrl profile-url-encoded=vm.encodedUrl first-param=vm.user.FirstName second-param=vm.user.LastName></div><p>När du klickar på Regristrera godkänner du våra användarvillkor och bekräftar att du har läst vår policy för dataanvändning, inklusive vår Cookie-användning.</p><div class=form-actions><div class=col-lg-10><button type=submit ng-click=vm.registerUser() ng-disabled=\"form.$invalid || vm.isLoading\" class=\"btn btn-material-lightgreen\">Regristrera</button></div></div></fieldset></form></div></div><div class=col-md-6><div class=well><fieldset><legend>Logga in med annan tjänst.</legend></fieldset></div></div></div></div>"
  );


  $templateCache.put('app/page-components/views/404.html',
    "<div class=container><div class=\"row start-height\"><h1>404 - Sidan finns inte!</h1><label ng-if=vm.to for=tech>Tekniskt mumbojumbo:</label><p id=tech>{{vm.to}}</p></div></div>"
  );


  $templateCache.put('app/page-components/views/error.html',
    "<div class=container><div class=\"row start-height\"><h1>Oj, något gick fel</h1><h4><strong>Felkod:</strong>{{vm.errorCode}}</h4><label for=friendly>Beskrivning:</label><p id=friendly>{{vm.friendlyError}}</p><label for=tech>Tekniskt mumbojumbo:</label><p id=tech>{{vm.technicalError}}</p></div></div>"
  );


  $templateCache.put('app/page-components/views/main-menu.html',
    "<div class=bs-component><div class=\"navbar navbar-default\"><div class=navbar-header><button type=button class=navbar-toggle data-toggle=collapse data-target=.navbar-responsive-collapse><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button> <i class=icon-></i> <a class=\"navbar-brand withripple\" href=\"/\">Bokaettband.se<div class=ripple-wrapper></div></a></div><div class=\"navbar-collapse collapse navbar-responsive-collapse\"><ul class=\"nav navbar-nav\"><li ng-class=\"{ active: $state.includes('baseState.startPage') }\"><a href=\"/\">Start</a></li></ul><form class=\"navbar-form navbar-left\"><div class=form-control-wrapper><input type=text class=\"form-control col-lg-8 empty\" placeholder=\"Sök band/arrangör\"> <span class=material-input></span></div></form><ul class=\"nav navbar-nav navbar-right\"><li ng-if=!loggedInUser ui-sref-active=active><a ui-sref=baseState.register>Regristrera dig</a></li><li ng-if=!loggedInUser ui-sref-active=active><a ui-sref=baseState.login>Logga in</a></li><user-menu></user-menu></ul></div></div></div>"
  );


  $templateCache.put('app/page-components/views/url-creator.html',
    "<ng-form class=\"form-horizontal md-update\" name=urlform><div class=form-group><label for=inputProfileUrl class=\"col-lg-2 control-label\">Profil-url</label><div class=col-lg-10><input type=text ng-change=vm.profileUrlUpdated() class=form-control id=inputProfileUrl placeholder=\"Din url\" ng-model=vm.ProfileUrl name=profileUrl required></div></div><div class=form-group><label for=inputProfileUrl class=\"col-lg-2 control-label\">Profil-url slutgiltig</label><div class=col-lg-10><h4>{{profileUrlEncoded}}</h4><div ng-show=urlform.profileUrl.$invalid><span class=form-validation-error ng-show=urlform.profileUrl.$error.isAvaliable>Din URL är uppdatagen, modifiera den till en tillgänglig url.</span></div></div></div></ng-form>"
  );


  $templateCache.put('app/page-components/views/user-menu.html',
    "<li class=dropdown ng-if=vm.menuItems><a class=dropdown-toggle data-toggle=dropdown>{{vm.loggedInUser.FirstName}} {{vm.loggedInUser.LastName}}<b class=caret></b></a><ul class=dropdown-menu><li><a ui-sref=\"baseState.portal.page.start({user : loggedInUser.Url})\"><strong>Ny sida</strong><br></a></li><li ng-repeat=\"page in vm.menuItems\"><a ui-sref=\"baseState.profile({url : page.Url})\" ui-sref-active=active><hr style=\"margin-top:5px; margin-bottom:5px\"><strong>{{page.Name}}</strong><br><span>Växla användare</span></a></li><li><a ui-sref=\"baseState.portal.page.start({user : loggedInUser.Url})\"><hr style=\"margin-top:5px; margin-bottom:5px\"><strong>Inställningar</strong><br></a></li><li><a ng-click=vm.logOut() href=javascript:void(0)>Logga ut</a></li></ul></li>"
  );


  $templateCache.put('app/portal/views/portal-create-page.html',
    "<div class=container-fluid><div class=\"row start-height\"><div class=col-md-12><div class=well><form class=\"form-horizontal md-update\" name=form><fieldset><legend>Skapa ny {{vm.type_sv.toLowerCase()}}-sida</legend><div class=form-group><label for=inputName class=\"col-lg-2 control-label\">Namn</label><div class=col-lg-10><input type=text class=form-control id=entityName placeholder=Bandnamn ng-model=vm.entity.Name name=entityName required><div ng-show=\"form.entityName.$dirty && form.entityName.$invalid\"><span class=form-validation-error ng-show=form.firstName.$error.required>Fyll i ditt bandnamn/entitynamn</span></div></div></div><fieldset><legend>Profil-url <i style=cursor:pointer class=icon-material-help ng-click=\"vm.profileHelpIsCollapsed = !vm.profileHelpIsCollapsed\"></i></legend><div class=\"panel panel-info\" collapse=vm.helpIsCollapsed><div class=panel-heading><h3 class=panel-title>Vad är profilurl?</h3></div><div class=panel-body>Profilurl:en är din adressen till din personliga sida. Om du bara fyller i ditt namn ovan kommer systemet skapa en url som är http://www.bokaettband.se/förnamnefternamn. Om denna är upptagen eller om du vill ha någon annan adress kan du dock ändra adressen i textboxen nedan. Du får dock bara använda tecken som r giltiga i en URL/Adress.<br><strong>OBS! Om du regristrerar en adress som semantiskt är någon annans ex: http://www.brokaettband.se/metallica kan du komma att förlora denna adress vid efterfrågan.</strong></div></div></fieldset><div url-creator base-url=vm.baseUrl profile-url-encoded=vm.entity.Url first-param=vm.entity.Name></div><p>När du klickar på Regristrera godkänner du våra användarvillkor och bekräftar att du har läst vår policy för dataanvändning, inklusive vår Cookie-användning.</p><div class=form-actions><div class=col-lg-10><button type=submit ng-click=vm.createPage(vm.entity) ng-disabled=form.$invalid class=\"btn btn-material-lightgreen\">Skapa sida</button></div></div></fieldset></form></div></div></div></div>"
  );


  $templateCache.put('app/portal/views/portal-left-menu.html',
    "<ul class=sidebar-nav><li class=sidebar-brand>Meny</li><li><a ui-sref=\"baseState.portal.page.start({user : loggedInUser.Url})\" ui-sref-active=active>Hem</a></li><li><a ui-sref=\"baseState.portal.page.settings({user : loggedInUser.Url})\" ui-sref-active=active>Inställningar</a></li></ul>s"
  );


  $templateCache.put('app/portal/views/portal-menu-wrapper.html',
    "<div><div id=wrapper><div id=sidebar-wrapper><div ui-view=portal-wrapper-left-menu></div></div><div id=page-content-wrapper><div ui-view=portal-wrapper-top-menu></div><div ui-view=portal-wrapper-content-view></div></div></div></div>"
  );


  $templateCache.put('app/portal/views/portal-settings.html',
    "<div class=container-fluid><h1>Settings</h1></div>"
  );


  $templateCache.put('app/portal/views/portal-start.html',
    "<div class=container-fluid><h1>Välkommen till bokaettband.se {{vm.FirstName}}!</h1><p>I menyn till vänster kan du navigera bland dina egna sidor. Där har du din personliga profil. beroende på vad du kommer använda bokaettband.se till så har du här lite olika valmöjligheter.</p><div class=list-group style=margin-top:50px><div class=list-group-item><div class=row-action-primary><i class=mdi-image-audiotrack></i></div><div class=row-content><div class=least-content></div><h4 class=list-group-item-heading><a ui-sref=\"^.create({type : 'band'})\">Skapa band/artist</a></h4><p class=list-group-item-text>Du är musiker och vill använda sidan för att hitta arrangörer eller andra musiker. Klicka då här för att skapa ett nytt band. Du kommer då få en ny profil för denna artistsida och en inkorg där du kan kommunicera med andra meddlemmar/arrangörer på bokaettband.se. Du kan ha ett flertal artistsidor.</p></div></div><div class=list-group-separator></div><div class=list-group-item><div class=row-action-primary><i class=mdi-action-perm-phone-msg></i></div><div class=row-content><div class=least-content></div><h4 class=list-group-item-heading><a href=#>Skapa arrangörssida</a></h4><p class=list-group-item-text>Du är arrangör av ett publikt liveställe eller kommer använda bokaettband.se under en längre tid för att leta efter artister och boka spelningar. Klicka då här för att skapa en profil för din arrangörssida och en inkorg där du kan kommunicera med band och artister eller andra arrangörer. Du kan ha ett flertal arrangörssidor.</p></div></div><div class=list-group-separator></div><div class=list-group-item><div class=row-action-primary><i class=mdi-action-face-unlock></i></div><div class=row-content><div class=least-content></div><h4 class=list-group-item-heading><a href=#>Skapa personlig profil</a></h4><p class=list-group-item-text>Du använder bokaettband.se som privatperson, antingen för att leta efter ett band för en enstaka spelning eller för att hitta rolig musik att lyssna på. Om du helt enkelt inte stämmer in på valen ovan är detta valet för dig, där du endast kommer ha din egna personliga profil och inkorg. Klicka då här för att påbörja skapandet av din perosnliga profil.</p></div></div></div></div>"
  );


  $templateCache.put('app/portal/views/portal-top-menu.html',
    "<div class=portal-top-menu><h4>Inställningar för sidan</h4></div>"
  );


  $templateCache.put('app/profile/views/profile-edit.html',
    "<div class=container-fluid>{{vm.name}} EDIT</div>"
  );


  $templateCache.put('app/profile/views/profile-images.html',
    "<h1>Images</h1>"
  );


  $templateCache.put('app/profile/views/profile.html',
    "<div class=\"ProfileCanopy ProfileCanopy--withNav ProfileCanopy--large\"><div class=ProfileCanopy-inner><div class=\"ProfileCanopy-header u-bgUserColor\" style=\"margin-top: 0px\"><div class=ProfileCanopy-headerBg><div style=\"text-align:center; vertical-align:middle\"><h3 style=\"color:#BABABA;font-weight: bold\">Huvudbild</h3></div></div><div style=height:200px></div><div class=AppContainer><div class=ProfileCanopy-avatar><div class=ProfileAvatar style=\"width: 200px; height: 200px; -ms-border-radius: 100px; border-radius: 100px; overflow:hidden\"><div><img data-holder=holder.js/200x200/text:Profilbild class=ProfileAvatar-image alt=\"Olof Dahlbom\"></div></div><div class=row><div class=col-lg-4></div></div></div></div></div><div class=ProfileCanopy-navBar><div class=ProfilePage-editingOverlay></div><div class=AppContainer><div class=row><div class=\"col-md-3 col-lg-9\"></div><div class=\"col-md-3 col-lg-9\"><div class=ProfileCanopy-nav><h2>{{vm.Title}}</h2></div></div></div><div class=row><div class=\"col-md-3 col-lg-3\"></div><div class=\"col-md-9 col-lg-9\"><div class=ProfileCanopy-nav><div class=well style=margin-top:20px><h4>Om Dig</h4><p>{{vm.Description}}</p></div></div></div></div><div class=row><div class=\"col-md-3 col-lg-3\"></div><div class=\"col-md-9 col-lg-9\"><div class=ProfileCanopy-nav><div class=well style=margin-top:20px><h4>Bilder</h4><div id=links blue-imp-image-gallery><a data-gallery=\"\" href=https://farm6.static.flickr.com/5611/15422348120_d8fbddb953_b.jpg title=\"Rowing Through Autumn\"><img src=https://farm6.static.flickr.com/5611/15422348120_d8fbddb953_s.jpg></a><a data-gallery=\"\" href=https://farm4.static.flickr.com/3954/15607404752_dc3ed442f2_b.jpg title=\"Typical Lunch Time meal in the Tudor times in Mary Ardens working farm house (Explored)\"><img src=https://farm4.static.flickr.com/3954/15607404752_dc3ed442f2_s.jpg></a><a data-gallery=\"\" href=https://farm4.static.flickr.com/3948/15606911555_495c97a998_b.jpg title=\"Mechelen, Grote Markt\"><img src=https://farm4.static.flickr.com/3948/15606911555_495c97a998_s.jpg></a><a data-gallery=\"\" href=https://farm4.static.flickr.com/3947/15420894338_0cfa79f11c_b.jpg title=\"mood from the wood\"><img src=https://farm4.static.flickr.com/3947/15420894338_0cfa79f11c_s.jpg></a><a data-gallery=\"\" href=https://farm4.static.flickr.com/3949/14993149334_ec6a9b6460_b.jpg title=\"Red stag Richmond park EXPLORED\"><img src=https://farm4.static.flickr.com/3949/14993149334_ec6a9b6460_s.jpg></a><a data-gallery=\"\" href=https://farm4.static.flickr.com/3946/15608125901_b9cff08b87_b.jpg title=\"Memorial Floral Tribute For Slain Soldier .... Cpl. Nathan Cirillo .... Hamilton, Ontario\"><img src=https://farm4.static.flickr.com/3946/15608125901_b9cff08b87_s.jpg></a><a data-gallery=\"\" href=https://farm6.static.flickr.com/5606/15607364771_55c72b141e_b.jpg title=October><img src=https://farm6.static.flickr.com/5606/15607364771_55c72b141e_s.jpg></a><a data-gallery=\"\" href=https://farm6.static.flickr.com/5614/15586360686_83b01a3ccc_b.jpg title=\"Halloween Pennant\"><img src=https://farm6.static.flickr.com/5614/15586360686_83b01a3ccc_s.jpg></a><a data-gallery=\"\" href=https://farm6.static.flickr.com/5602/14986795083_cdecae07e1_b.jpg title=\"La rebelión\"><img src=https://farm6.static.flickr.com/5602/14986795083_cdecae07e1_s.jpg></a><a data-gallery=\"\" href=https://farm6.static.flickr.com/5614/15423549460_c88ceb732a_b.jpg title=\"Blue Light Special on Lake Temagami\"><img src=https://farm6.static.flickr.com/5614/15423549460_c88ceb732a_s.jpg></a></div></div></div></div></div></div></div></div></div>"
  );


  $templateCache.put('app/shared/views/circular-image.html',
    "<div class=ProfileAvatar style=\"width: 200px; height: 200px; -ms-border-radius: 100px; border-radius: 100px; overflow:hidden\"><a class=\"ProfileAvatar-container u-block js-tooltip profile-picture media-thumbnail\" href=https://pbs.twimg.com/profile_images/443340740140093440/YsiS4MjP.jpeg data-resolved-url-large=https://pbs.twimg.com/profile_images/443340740140093440/YsiS4MjP.jpeg data-url=https://pbs.twimg.com/profile_images/443340740140093440/YsiS4MjP.jpeg target=_blank data-original-title=\"Olof Dahlbom\"><img class=ProfileAvatar-image src=https://pbs.twimg.com/profile_images/443340740140093440/YsiS4MjP_400x400.jpeg alt=\"Olof Dahlbom\"></a></div>"
  );


  $templateCache.put('app/start-page/views/start-page.html',
    "<div class=container><div class=\"row start-height\"><div class=col-md-5><h1>Välkommen!</h1><p class=lead>Livemusik är så roligt...</p><p>..och det är dags för en svenk portal för arrangörer och musiker som vill hitta varandra! Har du ett eget band? Är du arrangör för ett liveställe? Ska du gifta dig och letar efter ett band som passar just er?<div><a ui-sref=baseState.register class=\"btn btn-sup btn-material-pink btn-raised\"><i class=icon-material-create></i> <span style=margin-left:5px>Regristrera dig idag!</span></a></div></p></div><div class=col-md-7><div class=well><div class=row><div class=\"col-md-9 col-xs-12\"><div class=form-group><label for=select class=\"col-lg-2 control-label\">Välj</label><div class=col-lg-10><select class=form-control id=select><option>Band/Artister</option><option>Arrangörer</option><option>Spelningar</option></select></div></div><div id=paper style=\"width: 100%; height:700px\" data-raphael-map region-data=vm.regions></div></div><div class=\"col-md-3 hidden-sm hidden-xs\"><ul class=regionslist><li><a class=region_link_list id=area_1 href=http://www.blocket.se/nbl.htm data-region=1>Norrbotten</a></li><li><a class=region_link_list id=area_2 href=\"http://www.blocket.se/vasterbotten?ca=2\" data-region=2>Västerbotten</a></li><li><a class=region_link_list id=area_3 href=\"http://www.blocket.se/jamtland?ca=3\" data-region=3>Jämtland</a></li><li><a class=region_link_list id=area_4 href=\"http://www.blocket.se/vasternorrland?ca=4\" data-region=4>Västernorrland</a></li><li><a class=region_link_list id=area_5 href=\"http://www.blocket.se/gavleborg?ca=5\" data-region=5>Gävleborg</a></li><li><a class=region_link_list id=area_6 href=\"http://www.blocket.se/dalarna?ca=6\" data-region=6>Dalarna</a></li><li><a class=region_link_list id=area_7 href=\"http://www.blocket.se/varmland?ca=7\" data-region=7>Värmland</a></li><li><a class=region_link_list id=area_8 href=\"http://www.blocket.se/orebro?ca=8\" data-region=8>Örebro</a></li><li><a class=region_link_list id=area_9 href=\"http://www.blocket.se/vastmanland?ca=9\" data-region=9>Västmanland</a></li><li><a class=region_link_list id=area_10 href=\"http://www.blocket.se/uppsala?ca=10\" data-region=10>Uppsala</a></li><li><a class=region_link_list id=area_11 href=\"http://www.blocket.se/stockholm?ca=11\" data-region=11>Stockholm</a></li><li><a class=region_link_list id=area_12 href=\"http://www.blocket.se/sodermanland?ca=12\" data-region=12>Södermanland</a></li><li><a class=region_link_list id=area_13 href=\"http://www.blocket.se/skaraborg?ca=13\" data-region=13>Skaraborg</a></li><li><a class=region_link_list id=area_14 href=\"http://www.blocket.se/ostergotland?ca=14\" data-region=14>Östergötland</a></li><li><a class=region_link_list id=area_15 href=\"http://www.blocket.se/goteborg?ca=15\" data-region=15>Göteborg</a></li><li><a class=region_link_list id=area_16 href=\"http://www.blocket.se/alvsborg?ca=16\" data-region=16>Älvsborg</a></li><li><a class=region_link_list id=area_17 href=\"http://www.blocket.se/jonkoping?ca=17\" data-region=17>Jönköping</a></li><li><a class=region_link_list id=area_18 href=\"http://www.blocket.se/kalmar?ca=18\" data-region=18>Kalmar</a></li><li><a class=region_link_list id=area_19 href=\"http://www.blocket.se/gotland?ca=19\" data-region=19>Gotland</a></li><li><a class=region_link_list id=area_20 href=\"http://www.blocket.se/halland?ca=20\" data-region=20>Halland</a></li><li><a class=region_link_list id=area_21 href=\"http://www.blocket.se/kronoberg?ca=21\" data-region=21>Kronoberg</a></li><li><a class=region_link_list id=area_22 href=\"http://www.blocket.se/blekinge?ca=22\" data-region=22>Blekinge</a></li><li><a class=region_link_list id=area_23 href=http://www.blocket.se/skl.htm data-region=23>Skåne</a></li></ul></div></div></div></div></div></div>"
  );

}]);
