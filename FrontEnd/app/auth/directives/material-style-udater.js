angular.module('app.pageComponents').directive('checkbox', [
    'materialDesignUpdater', function (materialDesignUpdater) {
        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                debugger;
                materialDesignUpdater.updatedMaterialDesign();
            }
        };
    }]);
//# sourceMappingURL=material-style-udater.js.map
