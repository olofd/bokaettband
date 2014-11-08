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
            function LogService($http, logConfig) {
                this.$http = $http;
                this.logConfig = logConfig;
                this.logRows = [];
                this.loggerUrl = 'api/log';
            }
            LogService.prototype.sendLog = function (messageIn, levelIn) {
                return this.$http.post(this.logConfig.loggerUrl, {
                    message: messageIn,
                    level: levelIn,
                    source: this.GetFileName(),
                });
            };
            LogService.prototype.log = function (logRow) {
                this.logRows.push(logRow);
            };
            LogService.prototype.navigatedTo = function (message) {
                this.sendLog("", "NavigatedTo");
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
            LogService.$inject = ['$http', 'logConfig'];
            return LogService;
        })();
        log.LogService = LogService;
    })(log = app.log || (app.log = {}));
})(app || (app = {}));
angular.module('app.log').service("logService", app.log.LogService);
