angular.module('app.log', [
    'toastr'
]); 

module app.log {
    export interface ILogConfig {
        loggerUrl: string;
    }
}

angular.module('app.log').constant('logConfig', <app.log.ILogConfig>{
    loggerUrl: 'api/log'
});