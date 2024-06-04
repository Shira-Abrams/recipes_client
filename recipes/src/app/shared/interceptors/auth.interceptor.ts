import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserServiceService } from '../services/user/user-service.service';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userServices=inject(UserServiceService);
  const token=userServices.token;
  if(token){
    req=req.clone({
      setHeaders:{Authorization:`Bearer ${token}`}
    })
  }
  return next(req);
};
