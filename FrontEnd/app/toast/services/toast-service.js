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