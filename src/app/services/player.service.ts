import { Injectable } from '@angular/core';
import {IMusic} from '../interfaces/IMusic';
import {SpotifyService} from './spotify.service';
import {BehaviorSubject} from 'rxjs';
import {newMusic} from '../common/factories';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentMusic = new BehaviorSubject<IMusic>(newMusic());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentMusic();
  }

  async getCurrentMusic(){
    clearTimeout(this.timerId);

    // Get the music
    const music = await this.spotifyService.getCurrentMusic();
    this.setCurrentMusic(music);

    // Create loop
    this.timerId = setInterval(async () => {
      await this.getCurrentMusic();
    }, 5000)
  }

  setCurrentMusic(music: IMusic){
    this.currentMusic.next(music);
  }

  async previousMusic(){
    await this.spotifyService.previousMusic();
  }

  async nextMusic() {
    await this.spotifyService.nextMusic();
  }

}
