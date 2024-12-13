import {inject, Injectable} from '@angular/core';

import {SpotifyService} from './spotify.service';
import {environment} from '../../environments/environment';
import {IMusic} from '../interfaces/IMusic';
import {HttpClient} from '@angular/common/http';
import {IResponseYT} from '../interfaces/IResponseYT';
import {newResponseYT} from '../common/factories';
import {map, Observable, Subscription} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private audio: HTMLAudioElement ;

  constructor(private httpClient: HttpClient) {
    this.audio=new Audio();
  }

  async getSong(song:IMusic){
    try {
      const youtubeUrl = await this.getSongURL(song).toPromise(); // Convert Observable to Promise
      if (youtubeUrl) {
        this.audio.src =` ${environment.YT_DLP}${encodeURIComponent(
          youtubeUrl
        )}`;
        this.audio.load();
        this.audio.play();
        return this.audio;
      }
    } catch (error) {
      return console.error('Error fetching YouTube URL:', error);
    }

  }
  async playSong(song:IMusic){
    try {
      const youtubeUrl = await this.getSongURL(song).toPromise(); // Convert Observable to Promise
      if (youtubeUrl) {
        this.audio.src =` ${environment.YT_DLP}${encodeURIComponent(
          youtubeUrl
        )}`;
        this.audio.load();
        this.audio.play();
      }
    } catch (error) {
       console.error('Error fetching YouTube URL:', error);
    }

  }
  getSongURL(song: IMusic): Observable<string> {
    const query = `${song.artists[0].name} ${song.title}`;
    const apiKey = environment.Yt_API;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
      query
    )}&key=${apiKey}`;

    // Fetch the video ID and construct the YouTube URL
    return this.httpClient.get<any>(apiUrl).pipe(
      map((response) => {
        if (response.items && response.items.length > 0) {
          return `https://www.youtube.com/watch?v=${response.items[0].id.videoId}`;
        } else {
          throw new Error('No YouTube video found for the given query.');
        }
      })
    );
  }


  playStream(url: string): void {
    if (this.audio) {
      this.audio.pause(); // Stop any currently playing audio
    }
    this.audio = new Audio(url);
    this.audio.load();
    this.audio.play();
  }

  pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
  }

  resume(): void {
    if (this.audio) {
      this.audio.play();
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  getCurrentTime(): number {
    return this.audio ? this.audio.currentTime : 0;
  }

  getDuration(): number {
    return this.audio ? this.audio.duration : 0;
  }

  seek(time: number): void {
    if (this.audio) {
      this.audio.currentTime = time;
    }
  }

}
