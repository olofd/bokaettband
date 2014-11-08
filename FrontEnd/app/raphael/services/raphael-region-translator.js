var app;
(function (app) {
    (function (raphael) {
        var RaphaelRegionTranslator = (function () {
            function RaphaelRegionTranslator() {
            }
            return RaphaelRegionTranslator;
        })();
        raphael.RaphaelRegionTranslator = RaphaelRegionTranslator;

        angular.module('app.raphael').service('raphaelRegionTranslator', RaphaelRegionTranslator);
    })(app.raphael || (app.raphael = {}));
    var raphael = app.raphael;
})(app || (app = {}));
//# sourceMappingURL=raphael-region-translator.js.map
