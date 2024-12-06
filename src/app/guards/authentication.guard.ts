import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const protectedRoutes: string[] = ['player'];
  const token = localStorage.getItem('token');
console.log(state.toString(),protectedRoutes.includes(state.toString()),!token)
  if (!token && protectedRoutes.includes(state.toString())) {
    localStorage.clear();
    router.navigate(['/login'])
    return false
  }
  return true;
};
