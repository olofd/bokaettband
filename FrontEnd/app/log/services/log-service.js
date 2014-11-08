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