import { Routes ,RouterModule} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from  './pages/login/login.component'
import {AllRecipesComponent} from  './pages/all-recipes/all-recipes.component'
import {RegisterComponent} from  './pages/register/register.component'
import {CategoriesComponent} from './pages/categories/categories.component'
import { UserRecipesComponent } from './pages/user-recipes/user-recipes.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { authGuard } from './shared/ghurds/auth.guard';
export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full' },
  {path:'home',component:HomeComponent,pathMatch:'full'},
  {path:'categories',component:CategoriesComponent},
  {path:'allRecipe',component:AllRecipesComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
 {path:'recipeDeatail/:id',component:RecipeDetailComponent},
 {path:'userRecipes/:userId',component:UserRecipesComponent,canActivate:[authGuard]},
 {path:'addRecipe',component:RecipeFormComponent,canActivate:[authGuard]},
 {path:'editReicpe/:recipe2edit',component:RecipeFormComponent,canActivate:[authGuard]},



]; 

// RouterModule.forRoot(routes)