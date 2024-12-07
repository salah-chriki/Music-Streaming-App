import {Component, OnDestroy, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {IMusic} from '../../interfaces/IMusic';
import {Subscription} from 'rxjs';
import {newMusic} from '../../common/factories';
import {faStepBackward, faStepForward} from '@fortawesome/free-solid-svg-icons';
import {PlayerService} from '../../services/player.service';

@Component({
  selector: 'app-player-card',
  imports: [
    FaIconComponent
  ],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent implements OnInit, OnDestroy{
  music: IMusic = newMusic();
  subs: Subscription[] = [];

// Icons
  previousIcon = faStepBackward;
  nextIcon = faStepForward;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getCurrentlyPlayingMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getCurrentlyPlayingMusic() {
    const sub = this.playerService.currentMusic.subscribe(music => {
      this.music = music;
    });

    this.subs.push(sub);
  }

  previousMusic() {
    this.playerService.previousMusic();
  }

  nextMusic() {
    this.playerService.nextMusic();
  }

}
