angular.module('app.pageComponents').directive('urlCreator', [
    'urlService', function (urlService) {
        return {
            restrict: 'AEC',
            scope: {
                firstParam: "=",
                secondParam: "="
            },
            link: function (scope, element, attrs) {
            }
        };
    }]);
//# sourceMappingURL=url-creater.js.map
