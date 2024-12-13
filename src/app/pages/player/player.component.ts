import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LeftPanelComponent} from '../../components/left-panel/left-panel.component';
import {PlayerCardComponent} from '../../components/player-card/player-card.component';
import {HttpClientModule} from '@angular/common/http';
import {UserFooterComponent} from '../../components/user-footer/user-footer.component';

@Component({
  selector: 'app-player',
  imports: [
    RouterOutlet,
    LeftPanelComponent,
    PlayerCardComponent, HttpClientModule, UserFooterComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

}
