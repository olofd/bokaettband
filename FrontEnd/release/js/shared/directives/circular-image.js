angular.module('app.shared').directive('circularImage', [function () {
    return {
        link: function (scope, element, attrs) {
        },
        templateUrl: 'app/shared/views/circular-image.html',
        replace: true
    };
}]);
