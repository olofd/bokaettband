interface Window {
    Holder : any;
}
angular.module('app.pageComponents').directive('holder', function () {
    return {
        link: function (scope, element, attrs) {
            attrs.$set('data-src', attrs['holder']);
            window.Holder.run({ images: element[0] });
        }
    };
}); 