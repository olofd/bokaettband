angular.module('app.startPage').controller('startPageCtrl', ['$scope', 'toastService', function ($scope, toastService) {
    $scope.vm = {
        regions: [
            {
                regionId: "AB",
                count: 10
            }
        ]
    };
    toastService.success('Hello world!');
}]);
