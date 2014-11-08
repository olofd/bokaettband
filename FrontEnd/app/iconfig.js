var app;
(function (app) {
    (function (ConfigurationType) {
        ConfigurationType[ConfigurationType["Debug"] = 0] = "Debug";
        ConfigurationType[ConfigurationType["Release"] = 1] = "Release";
    })(app.ConfigurationType || (app.ConfigurationType = {}));
    var ConfigurationType = app.ConfigurationType;
})(app || (app = {}));
//# sourceMappingURL=iconfig.js.map