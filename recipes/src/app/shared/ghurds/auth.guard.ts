import { CanActivateFn } from '@angular/router';
import { UserServiceService } from '../services/user/user-service.service';
import { Inject, inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const userService=inject(UserServiceService)
  return userService.token ?true :false
};
