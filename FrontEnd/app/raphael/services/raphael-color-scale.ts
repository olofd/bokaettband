module app.raphael {
    export class NumericScale {
        public scale: Array<any>;
        private clearMinValue: any;
        private clearMaxValue: any;
        private minValue: any;
        private normalize: any;
        private maxValue: any;
        constructor(scale, normalizeFunction, minValue, maxValue) {
            this.scale = [];
            normalizeFunction = normalizeFunction || 'linear';

            if (scale) {
                this.setScale(scale);
            }
            if (normalizeFunction) this.setNormalizeFunction(normalizeFunction);
            if (minValue !== undefined) {
                this.setMin(minValue);
            }
            if (maxValue !== undefined) {
                this.setMax(maxValue);
            }
        }

        setMin(min) {
            this.clearMinValue = min;
            if (typeof this.normalize === 'function') {
                this.minValue = this.normalize(min);
            } else {
                this.minValue = min;
            }
        }
        setMax(max) {
            this.clearMaxValue = max;
            if (typeof this.normalize === 'function') {
                this.maxValue = this.normalize(max);
            } else {
                this.maxValue = max;
            }
        }
        setScale(scale) {
            var i;

            for (i = 0; i < scale.length; i++) {
                this.scale[i] = [scale[i]];
            }
        }
        setNormalizeFunction(f) {
            if (f === 'polynomial') {
                this.normalize = function (value) {
                    return Math.pow(value, 0.2);
                }
                } else if (f === 'linear') {
                delete this.normalize;
            } else {
                this.normalize = f;
            }
            this.setMin(this.clearMinValue);
            this.setMax(this.clearMaxValue);
        }
        getValue(value) {

            var lengthes = [],
                fullLength = 0,
                l,
                i = 0,
                c;

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
                value = this.vectorToNum(this.scale[i])
                } else {
                value = (
                this.vectorToNum(
                    this.vectorAdd(this.scale[i],
                        this.vectorMult(
                            this.vectorSubtract(this.scale[i + 1], this.scale[i]),
                            (value) / (lengthes[i])
                            )
                        )
                    )
                );
            }

            return value;
        }
        vectorToNum(vector) {
            var num = 0,
                i;

            for (i = 0; i < vector.length; i++) {
                num += Math.round(vector[i]) * Math.pow(256, vector.length - i - 1);
            }
            return num;
        }
        vectorSubtract(vector1, vector2) {
            var vector = [],
                i;

            for (i = 0; i < vector1.length; i++) {
                vector[i] = vector1[i] - vector2[i];
            }
            return vector;
        }
        vectorAdd(vector1, vector2) {
            var vector = [],
                i;

            for (i = 0; i < vector1.length; i++) {
                vector[i] = vector1[i] + vector2[i];
            }
            return vector;
        }
        vectorMult(vector, num) {
            var result = [],
                i;

            for (i = 0; i < vector.length; i++) {
                result[i] = vector[i] * num;
            }
            return result;
        }
        vectorLength(vector) {
            var result = 0,
                i;
            for (i = 0; i < vector.length; i++) {
                result += vector[i] * vector[i];
            }
            return Math.sqrt(result);
        }
    }
    export class ColorScale extends NumericScale {
        constructor(colors, normalizeFunction, minValue, maxValue) {
            super(colors, normalizeFunction, minValue, maxValue);
        }
        setScale(scale) {
            var i;

            for (i = 0; i < scale.length; i++) {
                this.scale[i] = this.rgbToArray(scale[i]);
            }
        }
        getValue(value) {
            return this.numToRgb(super.getValue(value));
        }
        arrayToRgb(ar) {
            var rgb = '#',
                d,
                i;

            for (i = 0; i < ar.length; i++) {
                d = ar[i].toString(16);
                rgb += d.length == 1 ? '0' + d : d;
            }
            return rgb;
        }
        numToRgb(num) {
            num = num.toString(16);

            while (num.length < 6) {
                num = '0' + num;
            }

            return '#' + num;
        }
        rgbToArray(rgb) {
            rgb = rgb.substr(1);
            return [parseInt(rgb.substr(0, 2), 16), parseInt(rgb.substr(2, 2), 16), parseInt(rgb.substr(4, 2), 16)];
        }
    }

    export interface IRaphaelColorScaleFactory {
        createColorScale: (colors, normalizeFunction, minValue, maxValue) => ColorScale;
    }

    angular.module('app.raphael').factory('raphaelColorScale', () => {
        return <IRaphaelColorScaleFactory>{
            createColorScale: (colors, normalizeFunction, minValue, maxValue) => {
                return new ColorScale(colors, normalizeFunction, minValue, maxValue);
            }
        };
    });
}  