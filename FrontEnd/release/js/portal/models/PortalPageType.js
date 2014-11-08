var app;
(function (app) {
    var portal;
    (function (portal) {
        (function (PageType) {
            PageType[PageType["UserProfile"] = 0] = "UserProfile";
            PageType[PageType["ArtistProfile"] = 1] = "ArtistProfile";
            PageType[PageType["Settings"] = 2] = "Settings";
            PageType[PageType["StartPage"] = 3] = "StartPage";
        })(portal.PageType || (portal.PageType = {}));
        var PageType = portal.PageType;
    })(portal = app.portal || (app.portal = {}));
})(app || (app = {}));
