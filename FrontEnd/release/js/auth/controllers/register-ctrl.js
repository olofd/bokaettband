angular.module('app.auth').controller('registerCtrl', [
    '$scope',
    'appAuthService',
    'toastService',
    'urlService',
    '$state',
    function ($scope, appAuthService, toastService, urlService, $state) {
        var baseUrl = 'http://www.bokaettband.se/';
        var encodeString = function (inputString) {
            var resString = (inputString || '').trim().toLowerCase();
            resString = resString.replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o');
            return resString;
        };
        $scope.vm = {
            isLoading: false,
            profileHelpIsCollapsed: true,
            user: {
                ProfileUrl: baseUrl,
                ProfileUrlEncoded: baseUrl,
            },
            registerUser: function () {
                $scope.vm.user.Url = $scope.vm.user.ProfileUrlEncoded.replace(baseUrl, '');
                appAuthService.registerUser($scope.vm.user).then(function (user) {
                    toastService.success("Registreringen gick bra!");
                    $state.go('baseState.profile', { url: user.Url });
                }).catch(function (error) {
                    toastService.error(error);
                });
            },
            nameUpdated: function () {
                var url = encodeString($scope.vm.user.FirstName) + encodeString($scope.vm.user.LastName);
                $scope.vm.user.ProfileUrlEncoded = baseUrl + encodeURIComponent(url);
                $scope.vm.user.ProfileUrl = baseUrl + url;
                checkAvaliability();
            },
            profileUrlUpdated: function () {
                if (!$scope.vm.user.ProfileUrl || $scope.vm.user.ProfileUrl.indexOf(baseUrl) === -1) {
                    $scope.vm.nameUpdated();
                }
                else {
                    var urlPart = $scope.vm.user.ProfileUrl.replace(baseUrl, '');
                    $scope.vm.user.ProfileUrlEncoded = baseUrl + encodeURIComponent(encodeString(urlPart));
                    checkAvaliability();
                }
            }
        };
        var checkAvaliability = function () {
            $scope.vm.isLoading = true;
            urlService.checkProfileUrlAvaliablity($scope.vm.user.ProfileUrlEncoded.replace(baseUrl, '')).then(function (isAvaliable) {
                if (isAvaliable) {
                    $scope.form.profileUrl.$setValidity('isAvaliable', true);
                }
                else {
                    $scope.form.profileUrl.$setValidity('isAvaliable', false);
                }
                $scope.vm.isLoading = false;
            });
        };
    }
]);
