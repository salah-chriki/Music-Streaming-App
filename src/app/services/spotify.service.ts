import { Injectable } from '@angular/core';
import {SpotifyConfiguration} from '../../environments/environment';
import Spotify from 'spotify-web-api-js';
import {IUser} from '../interfaces/IUser';
import {SpotifyUserToUser} from '../common/spotifyHelper';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
   spotifyApi:Spotify.SpotifyWebApiJs;
   user?:IUser;
  constructor() {
    this.spotifyApi=new Spotify();
  }

  getLoginUrl() {
    const authEndpoint = `${SpotifyConfiguration.authEndPoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenFromUrlCallback() {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  setAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async initializeUser() {
    if (!!this.user)
      return true;

    const token = localStorage.getItem('token');

    if (!token)
      return false;

    try {
      this.setAccessToken(token);
      await this.fetchSpotifyUser();
      return !!this.user;

    } catch (ex) {
      return false;
    }
  }

  async fetchSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserToUser(userInfo);
  }

}
