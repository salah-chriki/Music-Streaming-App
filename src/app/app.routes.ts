import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {userIsLoggedInResolver} from './resolvers/user-is-logged-in.resolver';
import {authenticationGuard} from './guards/authentication.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(module => module.LoginModule)
  },
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full'
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(module => module.PlayerModule),
    resolve: {
      userIsLoggedIn: userIsLoggedInResolver,
    },
    canMatch:[authenticationGuard]
  },
];
