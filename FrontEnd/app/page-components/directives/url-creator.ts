angular.module('app.pageComponents').directive('urlCreator', ['urlService', (urlService: app.shared.UrlService) => {
     return {
        restrict: 'AEC',
        scope: {
            firstParam: "=",
            secondParam: "=",
            baseUrl: "=",
            profileUrlEncoded : "="

        },
        replace: true,
        templateUrl: 'app/page-components/views/url-creator.html',
        controller: ['$scope', ($scope) => {
            var checkAvaliability = () => {
                var url = $scope.profileUrlEncoded.replace($scope.baseUrl, '');
                if (url) {
                    $scope.urlform.profileUrl.$setValidity('loading', false);
                    urlService.checkProfileUrlAvaliablity(url).then((isAvaliable) => {
                        if (isAvaliable) {
                            $scope.urlform.profileUrl.$setValidity('isAvaliable', true);
                        } else {
                            $scope.urlform.profileUrl.$setValidity('isAvaliable', false);

                        }
                        $scope.urlform.profileUrl.$setValidity('loading', true);
                    });
                }
            }
            var encodeString = (inputString) => {
                var resString = (inputString || '').trim().toLowerCase();
                resString = resString.replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o');
                return resString;
            }
            $scope.vm = {
                ProfileUrl: $scope.profileUrlEncoded,
                nameUpdated: () => {
                    var url = "";
                    if ($scope.firstParam) {
                        url += encodeString($scope.firstParam);
                    }
                    if ($scope.secondParam) {
                        url += encodeString($scope.secondParam);
                    }
                    $scope.profileUrlEncoded = $scope.baseUrl + encodeURIComponent(url);
                    $scope.vm.ProfileUrl = $scope.baseUrl + url;
                    checkAvaliability();
                },
                profileUrlUpdated: () => {
                    if (!$scope.vm.ProfileUrl || $scope.vm.ProfileUrl.indexOf($scope.baseUrl) === -1) {
                        $scope.vm.nameUpdated();
                    } else {
                        var urlPart = $scope.vm.ProfileUrl.replace($scope.baseUrl, '');
                        $scope.profileUrlEncoded = $scope.baseUrl + encodeURIComponent(encodeString(urlPart));
                        checkAvaliability();

                    }
                }
            }
             $scope.$watch('firstParam', (newVal, oldVal) => {
                $scope.vm.nameUpdated();
            });
            $scope.$watch('secondParam', (newVal, oldVal) => {
                $scope.vm.nameUpdated();
            });


        }],
        link: (scope, element, attrs) => {

        }
    }
 }]) 