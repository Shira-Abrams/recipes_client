import { Component } from '@angular/core';

import { User } from '../../shared/models/user';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { NgForm, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgStyle,NgClass } from '@angular/common';
import { UserServiceService } from '../../shared/services/user/user-service.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule ,NgIf,MatIconModule, MatButtonModule,NgStyle,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 action:string='';
 nonExistUser=false;
 constructor(private userServices:UserServiceService,private router:Router) {
     userServices.getAllUser().subscribe(users=>{
           this.userServices.Users=users;
           console.log('users',this.userServices.Users);
     
     })
 }
 
//  onSubmit(form:NgForm)
//  { 
  
//  if(this.action='login')
//   {
//     console.log('at login function');
//     console.log(this.action);
    
//     console.log('password= ',form.value.password);
//     console.log('email= ', form.value.email);
//     this.userServices.login(form.value.email,form.value.password).subscribe(data=>{
//      this.userServices.currentUser=data.user;
//      this.userServices.token=data.token;
//      console.log(data);
     
//      console.log('userService=',this.userServices.currentUser,'tokenService =',this.userServices.token);
//      this.router.navigateByUrl('/home');
//     }).unsubscribe(); 
//   }
//   if(this.action='ghghg')
//     {
//       console.log('at signup function');
//         console.log(this.action);
        
//     }
//  }
onSubmit()
{
  console.log('at onsubmit funcion');
  
}
login(form:NgForm){
   console.log('at login function');
   console.log(this.action);
    
   console.log('password= ',form.value.password);
   console.log('email= ', form.value.email);
   
   this.userServices.login(form.value.email,form.value.password).subscribe(data=>{
    this.userServices.currentUser={username:data.user.username,id:data.user._id};
    this.userServices.token=data.token;
    console.log('data',data);  
    console.log('userService=',this.userServices.currentUser,'tokenService =',this.userServices.token);
    this.router.navigateByUrl('/home');
   },
   (error)=>{
    this.nonExistUser=true;
    console.log('errfdfd');
    
     console.log(error);
     
   }); 
}

signin(form:NgForm)
{
  console.log('at signup function');
  this.userServices.loginer=form.value;
  console.log('form,',form);
  
  console.log(this.userServices.loginer);
  
  this.router.navigateByUrl('/register')
}

 

}