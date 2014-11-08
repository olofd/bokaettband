var _this = this;
angular.module('app.shared').directive('blueImpImageGallery', [
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function (event) {
                    event = event || window.event;
                    var target = event.target || event.srcElement, link = target.src ? target.parentNode : target, options = { index: link, event: event }, links = _this.getElementsByTagName('a');
                    window.blueimp.Gallery(links, options);
                });
            }
        };
    }
]);
