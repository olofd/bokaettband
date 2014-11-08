angular.module('app.raphael').directive('raphaelMap', [
    'raphaelMaps',
    'raphaelMapCreator',
    'raphaelColorScale',
    function (raphaelMaps, raphaelMapCreator, raphaelColorScaleFactory) {
        return {
            scope: {
                regionData: "="
            },
            link: function (scope, element, attrs) {
                function buildMap() {
                    return raphaelMapCreator.CreateMap(element[0]);
                }
                var map = _.find(raphaelMaps, function (b) {
                    return b.name === 'Region2007';
                });
                buildMap();
                var pathGroup = map.func(raphaelMapCreator.paper, {
                    defaultFillColor: '#bbc8d5'
                });
                var colors = {
                    red: '#F44336',
                    pink: '#E91E63',
                    purple: '#9C27B0',
                    deeppurple: '#673AB7',
                    indigo: '#3F51B5',
                    lightblue: '#03A9F4',
                    cyan: '#00BCD4',
                    teal: '#009688',
                    lightgreen: '#8BC34A',
                    lime: '#CDDC39',
                    lightyellow: '#FFEB3B',
                    orange: '#FF9800',
                    deeporange: '#FF5722',
                    grey: '#9E9E9E',
                    bluegrey: '#607D8B',
                    brown: '#795548',
                    lightgrey: '#ECECEC'
                };
                var colorsArray = [];
                for (var prop in colors) {
                    colorsArray.push(colors[prop]);
                }
                for (var j = 0; j < pathGroup.length; j++) {
                    var path = pathGroup[j];
                    if (j < colorsArray.length) {
                    }
                    path.attr({ 'fill': '#009688' });
                    (function (hPath) {
                        hPath.hover(function () {
                            if (!hPath.isClicked) {
                                hPath.attr({ "stroke": '#FFEB3B', 'stroke-width': '2', 'cursor': 'pointer' });
                            }
                        }, function () {
                            if (!hPath.isClicked) {
                                hPath.attr({ "stroke": "none" });
                            }
                        });
                    }(path));
                }
                //var minColor = "#DEDEDE";
                //var maxColor = "#F0F716";
                //var max = Number.MIN_VALUE,
                //    min = Number.MAX_VALUE;
                //for (var cc in scope.regionData) {
                //    var val = parseFloat(scope.regionData[cc].count);
                //    if (val > max) max = scope.regionData[cc].count;
                //    if (val < min) min = val;
                //}
                //var colorScale = raphaelColorScaleFactory.createColorScale([minColor, maxColor], "polynomial", 0, max);
                //_.forEach(pathGroup, (path: RaphaelPath) => {
                //    var id = path.data('id');
                //    var dataWithId = _.where(scope.regionData, (region: app.raphael.Region) => {
                //        return region.regionId === id;
                //    });
                //    var value = dataWithId.reduce(function(a: app.raphael.Region, b: app.raphael.Region) {
                //         return (a.count || 0) + (b.count || 0);
                //    }, 0);
                //    if (value > 0) {
                //        path.attr({ 'fill': colorScale.getValue(value) });
                //    }
                //});
            }
        };
    }
]);
