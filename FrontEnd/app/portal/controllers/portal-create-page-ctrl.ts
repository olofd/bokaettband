angular.module('app.portal').controller('portalCreatePageCtrl', ['$scope', 'viewModel', 'entityService', 'portalService', '$state',
    ($scope, viewModel: app.portal.IPortalCreatePageViewModel, entityService: app.shared.IEntityService<app.shared.IEntity>, portalService: app.portal.PortalService, $state : ng.ui.IStateService) => {
        $scope.vm = _.extend(viewModel, {
            baseUrl: 'http://www.bokaettband.se/',
            helpIsCollapsed: true,
            createPage: (entity: app.shared.IEntity) => {
                entity.Url = entity.Url.replace($scope.vm.baseUrl, '');
                entityService.post(entity).then((res) => {
                    portalService.addLeftHandMenuItem(viewModel.url, {
                        Name: entity.Name,
                        Url: entity.Url,
                        PageType: app.identity.PageType.ArtistProfile
                    });
                    $state.go('baseState.portal.page.profile', { url: entity.Url});
                });
            }
        });

    }
]);  