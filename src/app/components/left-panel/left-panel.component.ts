import {Component, OnInit} from '@angular/core';
import {MenuButtonComponent} from '../menu-button/menu-button.component';
import {UserFooterComponent} from '../user-footer/user-footer.component';
import {IPlaylist} from '../../interfaces/IPlaylist';
import {Router} from '@angular/router';
import {SpotifyService} from '../../services/spotify.service';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-left-panel',
  imports: [
    MenuButtonComponent,
    UserFooterComponent,
    FaIconComponent,
    NgForOf
  ],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss'
})
export class LeftPanelComponent implements OnInit{

  menuSelected = 'home';
  playlists: IPlaylist[] = [];

// Icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  constructor(
    private router: Router,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    this.fetchPlaylists();
  }

  buttonClick(button: string) {
    this.menuSelected = button;
    this.router.navigateByUrl(`player/${button}`);
  }

  goToPlaylist(playlistId: string) {
    this.menuSelected = playlistId;
    this.router.navigateByUrl(`player/list/playlist/${playlistId}`);
  }

  async fetchPlaylists() {
   this.playlists = await this.spotifyService.fetchUserPlaylists();

  }

}
