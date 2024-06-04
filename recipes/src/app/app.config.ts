import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgModel } from '@angular/forms';
import { routes } from './app.routes';
import { Routes ,RouterModule} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient()],
  
};
