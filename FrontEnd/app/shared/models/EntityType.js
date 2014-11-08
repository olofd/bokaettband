var app;
(function (app) {
    var shared;
    (function (shared) {
        (function (EntityType) {
            EntityType[EntityType["None"] = 0] = "None";
            EntityType[EntityType["User"] = 1] = "User";
            EntityType[EntityType["Artist"] = 2] = "Artist";
            EntityType[EntityType["Arranger"] = 3] = "Arranger";
        })(shared.EntityType || (shared.EntityType = {}));
        var EntityType = shared.EntityType;
    })(shared = app.shared || (app.shared = {}));
})(app || (app = {}));
//# sourceMappingURL=EntityType.js.map