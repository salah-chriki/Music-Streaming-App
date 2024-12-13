import {Component, EventEmitter, input, Output} from '@angular/core';
import {IMusic} from '../../interfaces/IMusic';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-small-song-card',
  imports: [
    NgForOf
  ],
  templateUrl: './small-song-card.component.html',
  styleUrl: './small-song-card.component.scss'
})
export class SmallSongCardComponent {
  song = input.required<IMusic>();

  @Output()
  songToPlay$ = new EventEmitter<IMusic>();

  play(): void {
    this.songToPlay$.next(this.song())
  }

}
