interface IAppError {
    technicalError: string;
    friendlyError: string;
    errorCode: number;
}
interface Window {
    appStartTime: number;
}
class AppError implements IAppError {
    stack: any;
    message: string;
    name: string;
    constructor(
        public technicalError: string = "No extra info",
        public friendlyError: string = "Ops, något gick fel, testa att ladda om sidan!",
        public errorCode: number = 0) {
        this.message = technicalError;
        this.stack = (<any>(new Error())).stack;
    }

    toString() {
        return this.friendlyError + ": <" + this.technicalError + ">";
    }
}
module app.shared {
    export class Timer {
        timers: any;
        hasPerformanceMeasure: boolean;
        constructor() {
            if (window.performance.now) {
                this.hasPerformanceMeasure = true;
            }
        }
        public guid() {
            function _p8(s?) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        }
        public registerTimer(timerName) {
            this.timers = this.timers || {};
            var startTime = window.performance.now();
            this.timers[timerName] = startTime;
        }
        public timeSinceLast(timerName, removeFromMemory = false) {
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
        }
    }
    export class ErrorHandler {
        firstNavigation: boolean;
        viewsFirstLoad: number;
        viewsFirstLoaded: number;
        static $inject = ['$rootScope', 'logService', '$state', 'appConfig', 'errorDelegater', 'timer'];
        constructor(
            private $rootScope,
            private logService: app.log.LogService,
            private $state: ng.ui.IStateService,
            private appConfig: app.IAppConfig,
            private errorDelegater: ErrorDelegater,
            private timer: app.shared.Timer) {
            this.firstNavigation = true;
            this.viewsFirstLoad = 0;
            this.viewsFirstLoaded = 0;
        }
        private getPerformanceString() {
            var startString = "";
            if (this.appConfig.uiRouterErrorHandling.displayLoadingTime) {
                var time = this.timer.timeSinceLast("$stateChangeStart");
                if (time) {
                    startString += time + " => ";
                }
            }
            return startString;
        }
        private redirectToErrorPage(appError: any) {
            if (this.appConfig.uiRouterErrorHandling.redirectToErrorState) {
                this.$state.go('baseState.error', this.buildException(appError), { location: 'replace' });
            }
        }
        private redirectToNotFoundPage(unfoundState: any) {
            if (this.appConfig.uiRouterErrorHandling.redirectToNotFoundState) {
                this.$state.go('baseState.404', this.buildNotFound(unfoundState), { location: 'replace' });
            }

        }
        private buildNotFound(unfoundState) {
            unfoundState = unfoundState || {};
            unfoundState.to = unfoundState.to || "unknown state";
            return unfoundState;
        }
        private buildException(appException: any) {
            appException = appException || {};
            if (appException instanceof AppError) {
                return appException;
            }
            appException.errorCode = appException.errorCode || 999;
            appException.friendlyError = appException.friendlyError || "Okänt fel";
            if (appException.technicalError) {
                appException.technicalError = appException.technicalError;
            } else if (appException.status) {
                appException.technicalError = appException.status.toString();
                if (appException.status === 404) {
                    appException.friendlyError = "Kunde inte hitta resursen";
                    appException.errorCode = 404;
                    if (appException.config && appException.config.url) {
                        appException.technicalError += ", probably missing template " + appException.config.url;
                    }
                }
            } else if (appException.message) {
                appException.technicalError = appException.message;
            }
            return appException;
        }
        setupErrorHandling() {
            this.$rootScope.$on('$stateChangeStart', () => {
                this.$stateChangeStart.apply(this, arguments);
            });
            this.$rootScope.$on('$viewContentLoading', () => {
                this.$viewContentLoading.apply(this, arguments);
            });
            this.$rootScope.$on('$viewContentLoaded', () => {
                this.$viewContentLoaded.apply(this, arguments);
            });
            this.$rootScope.$on('$stateChangeSuccess', () => {
                this.$stateChangeSuccess.apply(this, arguments);
            });
            this.$rootScope.$on('$stateChangeError', () => {
                this.$stateChangeError.apply(this, arguments);
            });
            this.$rootScope.$on('$stateNotFound', () => {
                this.$stateNotFound.apply(this, arguments);
            });
            this.$rootScope.notfound = (errorMessage) => {
                var unfoundState = {
                    to: errorMessage
                }
                this.$stateNotFound(undefined, unfoundState);
            }
            this.errorDelegater.listenForError((appError: IAppError) => {
                this.redirectToErrorPage(appError);
            });
        }
        private $stateChangeStart(event, toState, toParams, fromState, fromParams) {
            if (app.config.uiRouterErrorHandling.displayLoadingTime) {
                this.timer.registerTimer("$stateChangeStart");
            }
            if (this.appConfig.configuration == app.ConfigurationType.Debug && this.appConfig.uiRouterErrorHandling.logStateChangeStart) {
                if (this.appConfig.uiRouterErrorHandling.clearLogBetweenState &&
                    toState.name !== this.appConfig.uiRouterErrorHandling.errorState.name &&
                    toState.name !== this.appConfig.uiRouterErrorHandling.notFoundState.name) {
                    console.clear();
                }
                var toParamsString = this.paramsToString(toParams);
                var fromParamsString = this.paramsToString(fromParams);
                if (fromState.name)
                    this.logService.log(this.getPerformanceString() + "Leaving state: " + fromState.name + ", params: ( " + fromParamsString + " )", "info");
                this.logService.log(this.getPerformanceString() + "Started transition to state: " + toState.name + ", params: ( " + toParamsString + " )", "start");
            }
        }

        private $viewContentLoading(event, viewConfig) {
            if (this.appConfig.configuration == app.ConfigurationType.Debug && this.appConfig.uiRouterErrorHandling.logViewContentLoading) {
                this.logService.log(this.getPerformanceString() + "Loading view " + viewConfig.view.templateUrl + " with ctrl " + viewConfig.view.controller, "info");
            }
            if (this.firstNavigation && window.appStartTime) {
                this.viewsFirstLoad++;
            }

        }
        private $viewContentLoaded(event) {
            if (this.appConfig.configuration == app.ConfigurationType.Debug && this.appConfig.uiRouterErrorHandling.logViewContentLoaded) {
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
        }
        private $stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            if (this.appConfig.configuration == app.ConfigurationType.Debug && this.appConfig.uiRouterErrorHandling.logStateChangeSuccess) {
                var toParamsString = this.paramsToString(toParams);
                this.logService.log(this.getPerformanceString() + "Successfully transitioned to state: " + toState.name + ", params: ( " + toParamsString + " )", "success");
            }
        }
        private $stateChangeError(event, toState, toParams, fromState, fromParams, error) {
            if (this.appConfig.configuration == app.ConfigurationType.Debug && this.appConfig.uiRouterErrorHandling.logStateChangeError) {
                var toParamsString = this.paramsToString(toParams);
                this.logService.log(this.getPerformanceString() + "Error in transition to state: " + toState.name + ", params: ( " + toParamsString + " ). Error::: " + error, "error");
            }
            if (this.appConfig.uiRouterErrorHandling.redirectOnRoutingError) {
                this.redirectToErrorPage(error);
            }

        }
        private $stateNotFound(event?, unfoundState?, fromState?, fromParams?) {
            if (this.appConfig.configuration == app.ConfigurationType.Debug && this.appConfig.uiRouterErrorHandling.logStateNotFound) {
                var toState = !!unfoundState ? unfoundState.to : "unknown";
                this.logService.log(this.getPerformanceString() + "Error in transition to state " + toState, "error");
            }

            this.redirectToNotFoundPage(unfoundState);
        }

        private paramsToString(params: any) {
            var result = "none";
            if (params) {
                var keys = Object.keys(params);
                if (keys.length) {
                    result = Object.keys(params).reduce((previousParam, key) => {
                        var thisParam = key + ' : ' + params[key];
                        if (!previousParam)
                            return thisParam;
                        return previousParam + ', ' + thisParam;
                    }, null);
                }
            }
            return result;
        }


    }
    export class ErrorDelegater {
        private errorHandler: (appError: IAppError) => void;
        listenForError(errorHandler: (appError: IAppError) => void) {
            this.errorHandler = errorHandler;
        }
        emitError(appError: IAppError) {
            if (this.errorHandler)
                this.errorHandler(appError);
        }

    }
    angular.module('app.shared').config(['$httpProvider', $httpProvider => {
        $httpProvider.interceptors.push(['$q', 'timer', 'logService', 'appConfig', ($q, timer: Timer, logService: app.log.LogService, appConfig: app.IAppConfig) => {
            var logConfig = (config) => {
                if (appConfig.configuration === app.ConfigurationType.Debug) {
                    var isTemplate = (config.url && config.url.indexOf(".html") === -1);
                    if (isTemplate && appConfig.uiRouterErrorHandling.logXHRRequests) {
                        //XHR
                        config.guid = config.guid || timer.guid();
                        return {
                            type: "XHR",
                            guid: config.guid
                        }

                    } else if (!isTemplate && app.config.uiRouterErrorHandling.logTemplateFetch) {
                        //TEMPLATE
                        config.guid = config.guid || timer.guid();
                        return {
                            type: "TEMPLATE",
                            guid: config.guid
                        }
                    }
                }
            }

            var logResonse =  (response) => {
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
            }
            return {
                'request': (config) => {

                    var logConf = logConfig(config);
                    if (logConf) {
                        timer.registerTimer(logConf.guid);
                    }
                    return config;
                },
                'requestError': (rejection) => {
                    return $q.reject(rejection);
                },

                'response': (response) => {
                    logResonse(response);
                    return response;
                },
                'responseError': (rejection) => {
                    logResonse(rejection);
                    return $q.reject(rejection);
                }
            };
        }]);
    }]);
    angular.module('app.shared').service("errorDelegater", ErrorDelegater);
    angular.module('app.shared')
        .factory('$exceptionHandler', ['errorDelegater', (errorDelegater: ErrorDelegater) => {
            return (exception, cause) => {
                console.error(exception.stack, cause);
                errorDelegater.emitError(exception);
            };
        }]);
    angular.module('app.shared').service("errorHandlerService", app.shared.ErrorHandler);
    angular.module('app.shared').service("timer", app.shared.Timer);
}