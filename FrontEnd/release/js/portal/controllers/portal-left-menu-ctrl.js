angular.module('app.portal').controller('portalLeftMenuCtrl', ['$scope', 'toastService', 'viewModel', function ($scope, toastService, viewModel) {
    $scope.vm = viewModel;
}]);
