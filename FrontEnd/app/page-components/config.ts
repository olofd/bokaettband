module app.pageComponents {

    export interface IPageComponentsConfig {
        baseStateName: string;
        contentAreaViewName: string;
        getBaseStateName: (stateName: string) => string;
    }
    (() => {
        var pcModule = angular.module('app.pageComponents', [
            'ui.router'
        ]);
        pcModule.service('materialDesignUpdater', () => {
            return {
                updatedMaterialDesign : () => {
                    var updateMaterialStyleFunc = app.pageComponents["updateMaterialStyle"];
                    if (updateMaterialStyleFunc) {
                        updateMaterialStyleFunc();
                    }
                }
            }
        });
        angular.module('app.pageComponents').constant('pageComponentsConfig',
            <IPageComponentsConfig>{
                baseStateName: 'baseState',
                contentAreaViewName: '@'
         });
        pcModule.config(['$stateProvider', 'pageComponentsConfig',
            ($stateProvider, pageComponentsConfig: IPageComponentsConfig) => {

                $stateProvider.state(pageComponentsConfig.baseStateName, {
                    views: {
                        mainmenu: {
                            templateUrl: 'app/page-components/views/main-menu.html',
                            controller: 'mainMenuCtrl'
                        }

                    }

                });

            }]);
        pcModule.constant('pageComponentsConfig',
            <app.pageComponents.IPageComponentsConfig>{
                baseStateName: 'baseState',
                contentAreaViewName: '@'
            });
    })();

}

