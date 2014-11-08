angular.module('app.auth').directive('autoFillableField', [
    '$timeout',
    function ($timeout) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {

                $timeout(function () {
                    if (ngModel.$viewValue !== element.val()) {
                        ngModel.$setViewValue(element.val());
                    }
                }, 500);
            }
        };
    }
]); 