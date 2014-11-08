angular.module('app.profile').controller('profileCtrl', ['$scope', 'toastService', 'viewModel', '$state',
    ($scope, toastService: app.toast.ToastService, viewModel : app.profile.IProfileViewModel, $state) => {
        $scope.vm = viewModel;

        $scope.imageCrop = (coords) => {
            if (parseInt(coords.w) <= 0 || parseInt(coords.h) <= 0) return;

            var innerPreview = $('.inner-preview');
            if (innerPreview.length) {
                console.log("Resizing");
                innerPreview.css({
                    width: Math.ceil(400) + 'px',
                    height: Math.ceil(400) + 'px',
                    marginTop: (400 - 400) / 2 + 'px',
                    marginLeft: (400 - 400) / 2 + 'px',

                });
                var scalex = 400 / coords.w;
                var scaley = 400 / coords.h;
                innerPreview.find('img').css({
                    width: Math.round(scalex * 400) + 'px',
                    height: Math.round(scaley * 300) + 'px',
                    marginLeft: '-' + Math.round(scalex * coords.x) + 'px',
                    marginTop: '-' + Math.round(scaley * coords.y) + 'px'
                });
                var query = '?';
                query += 'crop=(' + coords.x + ',' + coords.y + ',' + coords.x2 + ',' + coords.y2 + ')&cropxunits=' + 400 + '&cropyunits=' + 300;

                console.log(query);
            }


        }
    }
]);