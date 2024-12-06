import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.checkTokenUrlCallback();
  }

  constructor(private spotifyService: SpotifyService, private router: Router) {
  }

  checkTokenUrlCallback() {
    const token = this.spotifyService.getTokenFromUrlCallback();
    if (!!token) {
      this.spotifyService.setAccessToken(token);
      this.router.navigate(['/player/home']);
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.getLoginUrl();
  }

}
