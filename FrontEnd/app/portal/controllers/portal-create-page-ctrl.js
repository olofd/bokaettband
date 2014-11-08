angular.module('app.portal').controller('portalCreatePageCtrl', ['$scope', 'viewModel', 'entityService', 'portalService', '$state', function ($scope, viewModel, entityService, portalService, $state) {
    $scope.vm = _.extend(viewModel, {
        baseUrl: 'http://www.bokaettband.se/',
        helpIsCollapsed: true,
        createPage: function (entity) {
            entity.Url = entity.Url.replace($scope.vm.baseUrl, '');
            entityService.post(entity).then(function (res) {
                portalService.addLeftHandMenuItem(viewModel.url, {
                    Name: entity.Name,
                    Url: entity.Url,
                    PageType: 2 /* ArtistProfile */
                });
                $state.go('baseState.portal.page.profile', { url: entity.Url });
            });
        }
    });
}]);
//# sourceMappingURL=portal-create-page-ctrl.js.map