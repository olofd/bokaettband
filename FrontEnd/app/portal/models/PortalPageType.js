var app;
(function (app) {
    var portal;
    (function (portal) {
        (function (PageType) {
            PageType[PageType["None"] = 0] = "None";
            PageType[PageType["UserProfile"] = 1] = "UserProfile";
            PageType[PageType["ArtistProfile"] = 2] = "ArtistProfile";
            PageType[PageType["ArrangerPofile"] = 3] = "ArrangerPofile";
            PageType[PageType["Settings"] = 4] = "Settings";
            PageType[PageType["StartPage"] = 5] = "StartPage";
        })(portal.PageType || (portal.PageType = {}));
        var PageType = portal.PageType;
    })(portal = app.portal || (app.portal = {}));
})(app || (app = {}));
//# sourceMappingURL=PortalPageType.js.map