import { Component } from '@angular/core';
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
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule ,NgIf,MatIconModule, MatButtonModule,NgStyle,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  
  constructor(private Uservice:UserServiceService,public router:Router) {
     Uservice.getAllUser().subscribe(data=>{
       this.Uservice.Users=data;
       console.log('all User ==',this.Uservice.Users);
        this.email=this.Uservice.loginer.email ;
        this. password=this.Uservice.loginer.password;
        console.log(this.Uservice.loginer.email);
        console.log(this.Uservice.loginer.password);
        
        
     });
     
    
  }   
  isExistUser =false;
  email=this.Uservice.loginer.email ;
  password=this.Uservice.loginer.password;

  onSubmit(form:NgForm){
    this.Uservice.loginer.email=' ';
    this.Uservice.loginer.password=' '
    // const usesr={
    //   role:"user",
    //  password:"tamar455588",
    // "email":"shulamit@gmail.com",
    // "address":"r yheuda hanasi  26",
    // "username":"shulamit"
    // }
    const u={...form.value,role:'user'}
    console.log('on submit fucnion ');
    console.log('value in submit function is form== ', form.value);
    console.log('u= ',u.email,u.password);
    console.log();
    
   const existUser= this.Uservice.Users.find(x=>x.email==u.email||x.password==u.password)
   console.log('isExistUser',existUser);

   if(existUser!=undefined)
    {
      this.isExistUser=true
      console.log('user exist not allowed to signup ',existUser);
          
    }
    else{
       this.Uservice.signup(form.value) .subscribe(user=>{
       console.log('user signup seccesfuly user =',user);
       this.Uservice.token=user.token
       this.Uservice.currentUser={username:user.user.username,id:user.user._id};
       console.log('userService=',this.Uservice.currentUser,'tokenService =',this.Uservice.token);
       this.router.navigateByUrl('allRecipe');
       })    
    }
   
     
  }
}
