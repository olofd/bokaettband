angular.module('app.portal').controller('portalTopMenuCtrl', ['$scope', 'toastService', 'viewModel',
    ($scope, toastService: app.toast.ToastService, viewModel) => {
        $scope.vm = viewModel;
    }
]); 