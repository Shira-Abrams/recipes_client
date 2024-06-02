export interface Recipes {
    name:string,
    description?:string,
    preperationTime:number,
    difficulty:number,
    dateAdded:Date,
    layersArray:any,
    categories:any[]
    preperationInstruction:string,
    imagUrl:string,
    isPrivate:boolean,
    user:any 
    _id:string
}
