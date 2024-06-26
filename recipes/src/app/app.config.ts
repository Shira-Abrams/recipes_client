import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgModel } from '@angular/forms';
import { routes } from './app.routes';
import { Routes ,RouterModule} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withInterceptors([authInterceptor])),provideAnimations()],
  
};
