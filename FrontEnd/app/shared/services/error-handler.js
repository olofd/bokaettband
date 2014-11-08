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