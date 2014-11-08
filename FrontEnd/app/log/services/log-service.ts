module app.log {
    export class LogRow {
        message: string;
        level: string;
        constructor(message: string, level: string) {
            this.message = message;
            this.level = level;
        }

    }
    export class LogService {
        logRows: Array<LogRow>;
        loggerUrl: string;
        static $inject = ['logConfig'];
        constructor(private logConfig: ILogConfig) {
            this.logRows = [];
            this.loggerUrl = 'api/log';
        }
        sendLog(messageIn, levelIn): ng.IPromise<any> {
            //return this.$http.post(this.logConfig.loggerUrl,
            //    {
            //        message: messageIn,
            //        level: levelIn,
            //        source: this.GetFileName(),
            //    });
            return null;

        }

        log(msg, color) {
            color = color || "black";
            var bgc = "White";
            switch (color) {
                case "success": color = "Black"; bgc = "LimeGreen"; break;
                case "info": color = "DodgerBlue"; bgc = "Turquoise"; break;
                case "error": color = "Red"; bgc = "White"; break;
                case "start": color = "OliveDrab"; bgc = "PaleGreen"; break;
                case "warning": color = "Tomato"; bgc = "Black"; break;
                case "end": color = "Orchid"; bgc = "MediumVioletRed"; break;
                default: color = color;
            }

            if (typeof msg == "object") {
                console.log(msg);
            } else if (typeof color == "object") {
                console.log("%c" + msg, "color: PowderBlue;font-weight:bold; background-color: RoyalBlue;");
                console.log(color);
            } else {
                console.log("%c" + msg, "color:" + color + ";font-weight:bold; background-color: " + bgc + ";");
            }
        }
        navigatedTo(message) {
            this.sendLog(message, "NavigatedTo");
        }
        debug(message) {
            this.sendLog(message, "Debug");
        }
        info(message) {
            this.sendLog(message, "Info");
        }
        success(message) {
            this.sendLog(message, "Info");
        }
        error(message) {
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
        }
        warning(message) {
            this.sendLog(message, "Warn");
        }
        fatal(message) {
            this.sendLog(message, "Fatal");
        }
        GetFileName() {
            var url = document.location.href;
            return url;
        }

    }
}
angular.module('app.log').service("logService", app.log.LogService); 