import { User } from "./user"

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
    user:User 
    _id:string
}
