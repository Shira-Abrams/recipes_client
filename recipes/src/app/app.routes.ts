import { Routes ,RouterModule} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from  './pages/login/login.component'
import {AllRecipesComponent} from  './pages/all-recipes/all-recipes.component'
import {RegisterComponent} from  './pages/register/register.component'
import {CategoriesComponent} from './pages/categories/categories.component'
import { NgModule } from '@angular/core';
export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full' },
  {path:'home',component:HomeComponent,pathMatch:'full'},
  {path:'categories',component:CategoriesComponent},
  {path:'allRecipe',component:AllRecipesComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},

];

// RouterModule.forRoot(routes)