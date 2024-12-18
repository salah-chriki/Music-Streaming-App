import {Component, OnDestroy, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {BannerComponent} from '../../components/banner/banner.component';
import {IMusic} from '../../interfaces/IMusic';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {newMusic} from '../../common/factories';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SpotifyService} from '../../services/spotify.service';
import {PlayerService} from '../../services/player.service';
import {NgForOf} from '@angular/common';
import {RightPanelComponent} from '../../components/right-panel/right-panel.component';
import {YoutubeService} from '../../services/youtube.service';

@Component({
  selector: 'app-music-list',
  imports: [
    FaIconComponent,
    BannerComponent,
    NgForOf,
    RightPanelComponent,
  ],
  templateUrl: './music-list.component.html',
  styleUrl: './music-list.component.scss'
})
export class MusicListComponent implements OnInit,OnDestroy{
  bannerImageUrl = '';
  bannerText = '';

  musics: IMusic[] = [];
  currentSong: IMusic = newMusic();
  playIcon = faPlay;

  title = '';

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService,
    private youtubeService:YoutubeService
  ) { }

  ngOnInit(): void {
    this.getSongs();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getCurrentSong() {
    const sub = this.playerService.currentMusic.subscribe(song => {
      this.currentSong = song;
    });

    this.subscriptions.push(sub);
  }

  getSongs() {
    const sub = this.activatedRoute.paramMap
      .subscribe(async params => {
        const type = params.get('type') ||'';
        const id = params.get('id') || '';
        await this.getPageData(type, id);
      });

    this.subscriptions.push(sub);
  }

  async getPageData(type: string, id: string) {
    if (type === 'playlist') {
      await this.getPlaylistData(id);
    } else {
      await this.getArtistData(id);
    }
  }

  async getPlaylistData(playlistId: string) {
    const playlistSongs = await this.spotifyService.fetchPlaylistMusics(playlistId);
    if (!playlistSongs || !playlistSongs.musics) {
      console.error('Failed to fetch playlist songs. Playlist data is null or undefined.');
      return; // Exit the method if no data is returned
    }
    this.setPageData(playlistSongs.name, playlistSongs.imageUrl, playlistSongs.musics);
    this.title = 'Playlist Songs: ' + playlistSongs.name;
  }

  async getArtistData(artistId: string) {
    // Implement artist data logic here
  }

  setPageData(bannerText: string, bannerImage: string, musics: IMusic[]) {
    this.bannerImageUrl = bannerImage;
    this.bannerText = bannerText;
    this.musics = musics;
  }

  getArtists(song: IMusic) {
    return song.artists.map(artist => artist.name).join(', ');
  }

  async playSong(song: IMusic) {
    await this.youtubeService.playSong(song);

    // this.playerService.setCurrentMusic(song);
  }

}
