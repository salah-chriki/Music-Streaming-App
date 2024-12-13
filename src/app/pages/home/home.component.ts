import {Component, OnInit} from '@angular/core';
import {TopArtistComponent} from '../../components/top-artist/top-artist.component';
import {RightPanelComponent} from '../../components/right-panel/right-panel.component';
import {NgForOf} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {IMusic} from '../../interfaces/IMusic';
import {newMusic} from '../../common/factories';
import {Subscription} from 'rxjs';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {SpotifyService} from '../../services/spotify.service';
import {PlayerService} from '../../services/player.service';

@Component({
  selector: 'app-home',
  imports: [
    TopArtistComponent,
    RightPanelComponent,
    NgForOf,
    FaIconComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  musics: IMusic[] = []
  currentMusic: IMusic = newMusic();

  subs: Subscription[] = [];

// Play Icon
  playIcon = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.getMusic();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async getMusic() {
    this.musics = await this.spotifyService.getMusic()
  }

  getCurrentMusic(){
    const sub = this.playerService.currentMusic.subscribe(music => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  getArtists(music: IMusic){
    return music.artists.map(artist => artist.name).join(', ');
  }

  async playMusic(music: IMusic){
    await this.spotifyService.playMusic(music);
    this.playerService.setCurrentMusic(music);
  }

}
