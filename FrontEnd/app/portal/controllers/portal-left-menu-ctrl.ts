angular.module('app.portal').controller('portalLeftMenuCtrl', ['$scope', 'toastService','viewModel',
    ($scope, toastService: app.toast.ToastService, viewModel: app.portal.ILeftMenuViewModel) => {
        $scope.vm = viewModel;
    }
]); 