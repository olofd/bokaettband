module app.toast {
    var toastModule = angular.module('app.toast', ['toastr']);

    toastModule.config(['toastrConfig', (toastrConfig) => {
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
}
