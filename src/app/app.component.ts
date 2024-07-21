import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './component/nav-bar/nav-bar.component'
import {HomeComponent} from './pages/home/home.component'
import {FooterComponent} from './component/footer/footer.component'
import { RouterModule} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent,HomeComponent,FooterComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})


  

export class AppComponent {
  title = 'recipes';
}
