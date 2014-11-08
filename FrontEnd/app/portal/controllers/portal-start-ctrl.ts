angular.module('app.portal').controller('portalStartCtrl', ['$scope', 'viewModel',
    ($scope, viewModel: app.portal.IStartPageViewModel) => {
        $scope.vm = viewModel;
    }
]);   