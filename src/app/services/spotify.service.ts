import { Injectable } from '@angular/core';
import {SpotifyConfiguration} from '../../environments/environment';
import Spotify from 'spotify-web-api-js';
import {IUser} from '../interfaces/IUser';
import {
  SpotifyArtistToArtist,
  SpotifyPlaylistToPlaylist,
  SpotifySinglePlaylistToPlaylist, SpotifyTSongToSong,
  SpotifyUserToUser
} from '../common/spotifyHelper';
import {IArtist} from '../interfaces/IArtist';
import {IPlaylist} from '../interfaces/IPlaylist';
import {IMusic} from '../interfaces/IMusic';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
   spotifyApi:Spotify.SpotifyWebApiJs;
   user?:IUser;
  constructor(private router:Router) {
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
    console.log(userInfo);
    this.user = SpotifyUserToUser(userInfo);
    console.log(this.user)
  }

  async fetchUserPlaylists(offset = 0, limit = 50): Promise<IPlaylist[]> {
    console.log('USER', this.user);
    const playlists = await this.spotifyApi.getUserPlaylists(this.user?.id, { offset, limit });


    const playlistsWithNull= playlists.items.map(SpotifyPlaylistToPlaylist);
    console.log(playlistsWithNull)
    return playlistsWithNull.filter((item): item is IPlaylist => item !== null);
  }

  async fetchPlaylistMusics(playlistId: string, offset = 0, limit = 50) {
    const spotifyPlaylist = await this.spotifyApi.getPlaylist(playlistId);

    if (!spotifyPlaylist) return null;

    const playlist = SpotifySinglePlaylistToPlaylist(spotifyPlaylist);

    const spotifyTracks = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });
    playlist.musics = spotifyTracks.items.map(track => SpotifyTSongToSong(track.track as SpotifyApi.TrackObjectFull));

    return playlist;
  }

  async fetchTopArtists(limit = 10): Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtistToArtist);
  }

  async getMusic(offset = 0, limit = 50): Promise<IMusic[]> {
    const tracks = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return tracks.items.map(x => SpotifyTSongToSong(x.track));
  }

  async playMusic(trackId: string) {
    await this.spotifyApi.queue(trackId);
    await this.spotifyApi.skipToNext();
  }

  async getCurrentMusic(): Promise<IMusic> {
    const spotifyTrack = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTSongToSong(spotifyTrack.item!);
  }

  async previousMusic() {
    await this.spotifyApi.skipToPrevious();
  }

  async nextMusic() {
    await this.spotifyApi.skipToNext();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
