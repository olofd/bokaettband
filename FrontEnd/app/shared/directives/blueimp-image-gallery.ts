interface Window {
    blueimp : any;
}
angular.module('app.shared').directive('blueImpImageGallery', [
    () => {

        return {
            link: (scope, element, attrs) => {
                element.click((event) => {
                    event = event || window.event;
                    var target = event.target || event.srcElement,
                        link = target.src ? target.parentNode : target,
                        options = { index: link, event: event },
                        links = this.getElementsByTagName('a');
                    window.blueimp.Gallery(links, options);
                });

            }
        }
    }
]);