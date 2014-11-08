angular.module('app.pageComponents').directive('mdUpdate', ['materialDesignUpdater', function (materialDesignUpdater) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            $.material.init();
        }
    };
}]);
//# sourceMappingURL=material-style-udater.js.map