var app;
(function (app) {
    var identity;
    (function (identity) {
        (function (PageType) {
            PageType[PageType["None"] = 0] = "None";
            PageType[PageType["UserProfile"] = 1] = "UserProfile";
            PageType[PageType["ArtistProfile"] = 2] = "ArtistProfile";
        })(identity.PageType || (identity.PageType = {}));
        var PageType = identity.PageType;
    })(identity = app.identity || (app.identity = {}));
})(app || (app = {}));
