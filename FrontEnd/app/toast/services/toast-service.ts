module app.toast {
    export class ToastMessage {
        message: string;
        level: string;
        constructor(message: string, level: string) {
            this.message = message;
            this.level = level;
        }

    }
    export class ToastService {
        toastrIsLoaded: boolean;
        toastRows: Array<ToastMessage>;
        static $inject = ['toastr'];
        constructor(private toastr) {
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

        private toast(toastRow: ToastMessage) {
            this.toastRows.push(toastRow);
            this.toastr[toastRow.level](toastRow.message);
        }

        info(message) {
            this.toast(new ToastMessage(message, "info"));
        }
        success(message) {
            this.toast(new ToastMessage(message, "success"));
        }
        error(message) {
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
        }
        warning(message) {
            this.toast(new ToastMessage(message, "warning"));
        }


    }
}

angular.module('app.toast').service("toastService", app.toast.ToastService); 