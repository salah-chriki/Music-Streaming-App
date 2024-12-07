import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LeftPanelComponent} from '../../components/left-panel/left-panel.component';

@Component({
  selector: 'app-player',
  imports: [
    RouterOutlet,
    LeftPanelComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

}
