interface JQueryStatic {
    material : any;
}
angular.module('app.pageComponents').directive('mdUpdate', ['materialDesignUpdater', (materialDesignUpdater) => {
     return {
        restrict: 'C',
         link: (scope, element, attrs) => {
             $.material.init();
         }
    }
 }])