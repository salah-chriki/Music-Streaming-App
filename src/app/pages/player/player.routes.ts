import {Routes} from '@angular/router';
import {PlayerComponent} from './player.component';
import {HomeComponent} from '../home/home.component';
import {MusicListComponent} from '../music-list/music-list.component';
import {RecentSearchesComponent} from '../../components/recent-searches/recent-searches.component';

export const playerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'list/:type/:id',
        component: MusicListComponent
      }
    ]
  }
]
