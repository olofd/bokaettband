angular.module('app.pageComponents').directive('userMenu', ['urlService', (urlService: app.shared.UrlService) => {
     return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'app/page-components/views/user-menu.html',
        controller: ['$scope', 'portalService', '$rootScope', ($scope, portalService: app.portal.PortalService, $rootScope) => {

            $scope.vm = {
                menuItems: [],
                loggedInUser: undefined
            }
             $rootScope.$watch('loggedInUser', (newVal, oldVal) => {
                delete $scope.vm.menuItems;
                delete $scope.vm.loggedInUser;
                if (newVal) {
                    $scope.vm.loggedInUser = newVal;
                    portalService.getUserPagesDescriptionModel(newVal.Url).then((res) => {
                        if (res) {
                            $scope.vm.menuItems = res.pages;
        
                        }
                    });

                }
            });


        }],
        link: (scope, element, attrs) => {



        }
    }
 }])  