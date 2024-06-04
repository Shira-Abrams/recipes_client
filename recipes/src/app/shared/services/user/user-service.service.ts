import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUserURl='http://localhost:5000/users';
  constructor(private http:HttpClient) { }
   private allUsers:User[]=[]
   private signer={
     email:' email',
     pssword:' password'
   }
getAllUser(){

 return this.http.get<User[]>(`${this.baseUserURl}/getAllUser`);
}
signup(user:User)
{  
 // localStorage.setItem('username',String(user?.username))
   return this.http.post<{user:User,token:string}>(`${this.baseUserURl}/signup`,user);
      
}
login(email:String,password:String)
{ 
 return this.http.post<{user:User,token:string}>(`${this.baseUserURl}/signin`,{password,email})
 
}

public set token(token : string) {
   localStorage.setItem('token',token)
  
  
}

public get token() : string |null{
 
  return localStorage.getItem('token');
}

public set currentUser(u ) {
 
   localStorage.setItem('currentUser',JSON.stringify(u))
}

public get currentUser() :any{
  let stringUser=localStorage.getItem('currentUser')
  if(stringUser)
  return JSON.parse(stringUser)
  return null
}

public get Users() : User[] {

  return this.allUsers;
}


public set Users(usesrs ) {
    this.allUsers=usesrs
}


public set loginer(siner) {
 this.signer=siner;
}

public get loginer() : any {
  return this.signer;
}
public isTokenExpired()
{  
   const expiry = (JSON.parse(atob(String(this.token).split('.')[1]))).exp;
  // return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  console.log('is token expired =', (Math.floor((new Date).getTime()/1000))>=expiry);
  
  return (Math.floor((new Date).getTime()/1000))>=expiry
}





}
