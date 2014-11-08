/// <reference path="../../../scripts/typings/raphael/raphael.d.ts" />
var app;
(function (app) {
    var raphael;
    (function (raphael) {
        var RaphaelMapCreator = (function () {
            function RaphaelMapCreator() {
            }
            RaphaelMapCreator.prototype.CreateMap = function (element) {
                var that = this;
                this.element = element;
                this.paper = Raphael(this.element);
                this.viewBoxWidth = this.paper.width;
                this.viewBoxHeight = this.paper.height;
                this.canvasID = "#paper";
                var startX, startY;
                var mousedown = false;
                var dX, dY;
                this.viewBox = this.paper.setViewBox(0, 0, this.viewBoxWidth, this.viewBoxHeight, false);
                this.viewBox.X = 0;
                this.viewBox.Y = 0;
                function handle(delta) {
                }
                function wheel(event, delta) {
                    if (delta) {
                        handle(delta);
                    }
                    if (event.preventDefault)
                        event.preventDefault();
                    event.returnValue = false;
                }
                //(<any>$(this.canvasID)).mousewheel(function (e, delta) {
                //    that.wheel(e, delta);
                //});
                //Pane
                var raphaelPaper = this.paper;
                $(this.canvasID).mousedown(function (e) {
                    if (raphaelPaper.getElementByPoint(e.pageX, e.pageY) != null) {
                        return;
                    }
                    mousedown = true;
                    startX = e.pageX;
                    startY = e.pageY;
                    console.log(startX, startY);
                });
                $(this.canvasID).mousemove(function (e) {
                    if (mousedown == false) {
                        return;
                    }
                    dX = startX - e.pageX;
                    dY = startY - e.pageY;
                    var x = that.viewBoxWidth / raphaelPaper.width;
                    var y = that.viewBoxHeight / raphaelPaper.height;
                    dX *= x;
                    dY *= y;
                    raphaelPaper.setViewBox(that.viewBox.X + dX, that.viewBox.Y + dY, that.viewBoxWidth, that.viewBoxHeight, false);
                });
                $(this.canvasID).mouseup(function (e) {
                    if (mousedown == false)
                        return;
                    if (!isNaN(dX)) {
                        that.viewBox.X += dX;
                    }
                    if (!isNaN(dY)) {
                        that.viewBox.Y += dY;
                    }
                    mousedown = false;
                });
                this.resetZoomAndPane();
                return this.paper;
            };
            //restoreZoomAndPane(canavasSettings: CanvasSetting) {
            //    this.viewBox.X = canavasSettings.viewBoxX;
            //    this.viewBox.Y = canavasSettings.viewBoxY;
            //    this.viewBoxWidth = canavasSettings.viewBoxWidth;
            //    this.viewBoxHeight = canavasSettings.viewBoxHeight;
            //    this.paper.setViewBox(canavasSettings.viewBoxX, canavasSettings.viewBoxY, canavasSettings.viewBoxWidth, canavasSettings.viewBoxHeight, false);
            //}
            RaphaelMapCreator.prototype.resetZoomAndPane = function () {
                this.viewBox.X = 98.90872462649901;
                this.viewBox.Y = 169.94626224484375;
                this.viewBoxWidth = 384.182550747002;
                this.viewBoxHeight = 660.1074755103125;
                this.paper.setViewBox(this.viewBox.X, this.viewBox.Y, this.viewBoxWidth, this.viewBoxHeight, false);
            };
            RaphaelMapCreator.prototype.wheel = function (event, delta) {
                if (delta) {
                    this.handleScroll(delta);
                }
                if (event.preventDefault)
                    event.preventDefault();
                event.returnValue = false;
            };
            RaphaelMapCreator.prototype.handleScroll = function (delta) {
                var vBHo = this.viewBoxHeight;
                var vBWo = this.viewBoxWidth;
                if (delta < 0) {
                    this.viewBoxWidth *= 0.95;
                    this.viewBoxHeight *= 0.95;
                }
                else {
                    this.viewBoxWidth *= 1.05;
                    this.viewBoxHeight *= 1.05;
                }
                if (!isNaN(this.viewBox.X) && !isNaN(this.viewBox.Y)) {
                    this.viewBox.X -= (this.viewBoxWidth - vBWo) / 2;
                    this.viewBox.Y -= (this.viewBoxHeight - vBHo) / 2;
                    console.log(this.viewBox.X, this.viewBox.Y, this.viewBoxWidth, this.viewBoxHeight);
                    this.paper.setViewBox(this.viewBox.X, this.viewBox.Y, this.viewBoxWidth, this.viewBoxHeight, false);
                }
            };
            return RaphaelMapCreator;
        })();
        raphael.RaphaelMapCreator = RaphaelMapCreator;
        angular.module('app.raphael').service('raphaelMapCreator', RaphaelMapCreator);
    })(raphael = app.raphael || (app.raphael = {}));
})(app || (app = {}));
//# sourceMappingURL=raphael-map-creator.js.map