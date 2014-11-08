var app;
(function (app) {
    var pageComponents;
    (function (pageComponents) {
        (function () {
            var pcModule = angular.module('app.pageComponents', [
                'ui.router'
            ]);
            pcModule.service('materialDesignUpdater', function () {
                return {
                    updatedMaterialDesign: function () {
                        var updateMaterialStyleFunc = app.pageComponents["updateMaterialStyle"];
                        if (updateMaterialStyleFunc) {
                            updateMaterialStyleFunc();
                        }
                    }
                };
            });
            angular.module('app.pageComponents').constant('pageComponentsConfig', {
                baseStateName: 'baseState',
                contentAreaViewName: '@'
            });
            pcModule.config(['$stateProvider', 'pageComponentsConfig', function ($stateProvider, pageComponentsConfig) {
                $stateProvider.state(pageComponentsConfig.baseStateName, {
                    views: {
                        mainmenu: {
                            templateUrl: 'app/page-components/views/main-menu.html',
                            controller: 'mainMenuCtrl'
                        }
                    }
                });
            }]);
            pcModule.constant('pageComponentsConfig', {
                baseStateName: 'baseState',
                contentAreaViewName: '@'
            });
        })();
    })(pageComponents = app.pageComponents || (app.pageComponents = {}));
})(app || (app = {}));
//# sourceMappingURL=config.js.map