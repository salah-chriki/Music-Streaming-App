import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {IUser} from '../../interfaces/IUser';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {SpotifyService} from '../../services/spotify.service';

@Component({
  selector: 'app-user-footer',
  imports: [
    FaIconComponent
  ],
  templateUrl: './user-footer.component.html',
  styleUrl: './user-footer.component.scss'
})
export class UserFooterComponent implements OnInit {
  signOutIcon = faSignOutAlt;
  user: IUser | null = null;

  constructor(
    private spotifyService: SpotifyService
  ) {
  }

  ngOnInit(): void {
    this.user = this.spotifyService.user || null
  }

  logout() {
    this.spotifyService.logout();
  }
}
