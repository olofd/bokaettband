module app.portal {
    export interface IPortalPageDescription {
        Name: string;
        PageType: PageType;
        Url: string;
        Group: number;
        SortOrder : number;
    }
} 