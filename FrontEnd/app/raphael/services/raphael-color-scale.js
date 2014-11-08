var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var raphael;
    (function (raphael) {
        var NumericScale = (function () {
            function NumericScale(scale, normalizeFunction, minValue, maxValue) {
                this.scale = [];
                normalizeFunction = normalizeFunction || 'linear';
                if (scale) {
                    this.setScale(scale);
                }
                if (normalizeFunction)
                    this.setNormalizeFunction(normalizeFunction);
                if (minValue !== undefined) {
                    this.setMin(minValue);
                }
                if (maxValue !== undefined) {
                    this.setMax(maxValue);
                }
            }
            NumericScale.prototype.setMin = function (min) {
                this.clearMinValue = min;
                if (typeof this.normalize === 'function') {
                    this.minValue = this.normalize(min);
                }
                else {
                    this.minValue = min;
                }
            };
            NumericScale.prototype.setMax = function (max) {
                this.clearMaxValue = max;
                if (typeof this.normalize === 'function') {
                    this.maxValue = this.normalize(max);
                }
                else {
                    this.maxValue = max;
                }
            };
            NumericScale.prototype.setScale = function (scale) {
                var i;
                for (i = 0; i < scale.length; i++) {
                    this.scale[i] = [scale[i]];
                }
            };
            NumericScale.prototype.setNormalizeFunction = function (f) {
                if (f === 'polynomial') {
                    this.normalize = function (value) {
                        return Math.pow(value, 0.2);
                    };
                }
                else if (f === 'linear') {
                    delete this.normalize;
                }
                else {
                    this.normalize = f;
                }
                this.setMin(this.clearMinValue);
                this.setMax(this.clearMaxValue);
            };
            NumericScale.prototype.getValue = function (value) {
                var lengthes = [], fullLength = 0, l, i = 0, c;
                if (typeof this.normalize === 'function') {
                    value = this.normalize(value);
                }
                for (i = 0; i < this.scale.length - 1; i++) {
                    l = this.vectorLength(this.vectorSubtract(this.scale[i + 1], this.scale[i]));
                    lengthes.push(l);
                    fullLength += l;
                }
                c = (this.maxValue - this.minValue) / fullLength;
                for (i = 0; i < lengthes.length; i++) {
                    lengthes[i] *= c;
                }
                i = 0;
                value -= this.minValue;
                while (value - lengthes[i] >= 0) {
                    value -= lengthes[i];
                    i++;
                }
                if (i == this.scale.length - 1) {
                    value = this.vectorToNum(this.scale[i]);
                }
                else {
                    value = (this.vectorToNum(this.vectorAdd(this.scale[i], this.vectorMult(this.vectorSubtract(this.scale[i + 1], this.scale[i]), (value) / (lengthes[i])))));
                }
                return value;
            };
            NumericScale.prototype.vectorToNum = function (vector) {
                var num = 0, i;
                for (i = 0; i < vector.length; i++) {
                    num += Math.round(vector[i]) * Math.pow(256, vector.length - i - 1);
                }
                return num;
            };
            NumericScale.prototype.vectorSubtract = function (vector1, vector2) {
                var vector = [], i;
                for (i = 0; i < vector1.length; i++) {
                    vector[i] = vector1[i] - vector2[i];
                }
                return vector;
            };
            NumericScale.prototype.vectorAdd = function (vector1, vector2) {
                var vector = [], i;
                for (i = 0; i < vector1.length; i++) {
                    vector[i] = vector1[i] + vector2[i];
                }
                return vector;
            };
            NumericScale.prototype.vectorMult = function (vector, num) {
                var result = [], i;
                for (i = 0; i < vector.length; i++) {
                    result[i] = vector[i] * num;
                }
                return result;
            };
            NumericScale.prototype.vectorLength = function (vector) {
                var result = 0, i;
                for (i = 0; i < vector.length; i++) {
                    result += vector[i] * vector[i];
                }
                return Math.sqrt(result);
            };
            return NumericScale;
        })();
        raphael.NumericScale = NumericScale;
        var ColorScale = (function (_super) {
            __extends(ColorScale, _super);
            function ColorScale(colors, normalizeFunction, minValue, maxValue) {
                _super.call(this, colors, normalizeFunction, minValue, maxValue);
            }
            ColorScale.prototype.setScale = function (scale) {
                var i;
                for (i = 0; i < scale.length; i++) {
                    this.scale[i] = this.rgbToArray(scale[i]);
                }
            };
            ColorScale.prototype.getValue = function (value) {
                return this.numToRgb(_super.prototype.getValue.call(this, value));
            };
            ColorScale.prototype.arrayToRgb = function (ar) {
                var rgb = '#', d, i;
                for (i = 0; i < ar.length; i++) {
                    d = ar[i].toString(16);
                    rgb += d.length == 1 ? '0' + d : d;
                }
                return rgb;
            };
            ColorScale.prototype.numToRgb = function (num) {
                num = num.toString(16);
                while (num.length < 6) {
                    num = '0' + num;
                }
                return '#' + num;
            };
            ColorScale.prototype.rgbToArray = function (rgb) {
                rgb = rgb.substr(1);
                return [parseInt(rgb.substr(0, 2), 16), parseInt(rgb.substr(2, 2), 16), parseInt(rgb.substr(4, 2), 16)];
            };
            return ColorScale;
        })(NumericScale);
        raphael.ColorScale = ColorScale;
        angular.module('app.raphael').factory('raphaelColorScale', function () {
            return {
                createColorScale: function (colors, normalizeFunction, minValue, maxValue) {
                    return new ColorScale(colors, normalizeFunction, minValue, maxValue);
                }
            };
        });
    })(raphael = app.raphael || (app.raphael = {}));
})(app || (app = {}));
//# sourceMappingURL=raphael-color-scale.js.map