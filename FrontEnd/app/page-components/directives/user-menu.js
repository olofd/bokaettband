angular.module('app.pageComponents').directive('userMenu', ['urlService', function (urlService) {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'app/page-components/views/user-menu.html',
        controller: ['$scope', 'portalService', '$rootScope', function ($scope, portalService, $rootScope) {
            $scope.vm = {
                menuItems: [],
                loggedInUser: undefined
            };
            $rootScope.$watch('loggedInUser', function (newVal, oldVal) {
                delete $scope.vm.menuItems;
                delete $scope.vm.loggedInUser;
                if (newVal) {
                    $scope.vm.loggedInUser = newVal;
                    portalService.getUserPagesDescriptionModel(newVal.Url).then(function (res) {
                        if (res) {
                            $scope.vm.menuItems = res.pages;
                        }
                    });
                }
            });
        }],
        link: function (scope, element, attrs) {
        }
    };
}]);
//# sourceMappingURL=user-menu.js.map