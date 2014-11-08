module app {
    export enum ConfigurationType {
        Debug,
        Release
    }
    export interface IErrorState {
        name: string;
        config: ng.ui.IState;
    }
    export interface IAppConfig {
        configuration: ConfigurationType;
        uiRouterErrorHandling: IUiRouterErrorHandling
    }
    export interface IUiRouterErrorHandling {
        clearLogBetweenState?: boolean;
        displayLoadingTime?: boolean;
        logStateChangeStart?: boolean;
        logStateChangeSuccess?: boolean;
        logViewContentLoading?: boolean;
        logViewContentLoaded?: boolean;
        logStateChangeError?: boolean;
        logStateNotFound?: boolean;
        logTemplateFetch?: boolean;
        logXHRRequests?: boolean;
        redirectToNotFoundState?: boolean;
        redirectToErrorState?: boolean;
        redirectOnRegularJSError?: boolean;
        redirectOnRoutingError?: boolean;
        notFoundState?: IErrorState;
        errorState?: IErrorState;
    }
} 