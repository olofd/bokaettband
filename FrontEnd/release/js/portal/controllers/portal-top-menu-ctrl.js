angular.module('app.portal').controller('portalTopMenuCtrl', ['$scope', 'toastService', 'viewModel', function ($scope, toastService, viewModel) {
    $scope.vm = viewModel;
}]);
