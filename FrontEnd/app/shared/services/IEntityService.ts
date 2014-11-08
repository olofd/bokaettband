 module app.shared {
     export interface IEntityService<T extends IEntity> {
         post : (entity : T) => ng.IPromise<T>;
     }
 }