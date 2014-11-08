angular.module('app.startPage').controller('startPageCtrl', ['$scope', 'toastService',
    ($scope, toastService: app.toast.ToastService) => {
        $scope.vm = {
            regions : <Array<app.raphael.Region>>[
                {
                    regionId: "AB",
                    count: 10
                }
            ]

        };
        toastService.success('Hello world!');

    }
]);