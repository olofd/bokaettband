 module app.shared {
     export interface IEntity {
         Name: string;
         Created: string;
         Modified: string;
         Deleted: boolean;
         Url: string;
         EntityType : EntityType;
     }
 }