import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SpotifyService} from '../services/spotify.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const spotifyService = inject(SpotifyService);
  const protectedRoutes: string[] = ['player'];
  const token = localStorage.getItem('token');
  console.log(state.toString(), protectedRoutes.includes(state.toString()), !token)
  if (!token && protectedRoutes.includes(state.toString())) {
    localStorage.clear();
    router.navigate(['/login'])
    return false
  }
  return new Promise(async (res) => {
    const userCreated = await spotifyService.initializeUser();
    if (userCreated) {
      res(true)
    } else {
      localStorage.clear();
      await router.navigate(['/login'])
      res(false)
    }
  })
};
