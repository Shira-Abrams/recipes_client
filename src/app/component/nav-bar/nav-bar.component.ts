import { Component, inject ,OnInit} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Routes ,RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UserServiceService } from '../../shared/services/user/user-service.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule,MatIconModule,MatButtonModule,NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent implements OnInit{
  constructor( public  userService:UserServiceService,public router:Router) {
    
  }
  openProfile=false;
  LogOut()
  {
    console.log('at log out');
   this.userService.token='';
   this.userService.currentUser=null;
    console.log('user after logout= ',this.userService.currentUser);
    console.log('token after logout= ',this.userService.token);
    this.router.navigate(['allRecipe'])


  }
  openMenue()
  {
    this.openProfile=true;
  }
  shortUserName()
  { 
    
   return String(this.userService.currentUser?.username).split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()
  }
  ngOnInit() {
     if(this.userService.token)
      {
        if(this.userService.isTokenExpired())
         {
           this.userService.token='';
          this.userService.currentUser='';
         }
      }
    
      
  }
}
