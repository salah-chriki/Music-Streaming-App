import {Component, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

import {FormsModule} from '@angular/forms';
import {YoutubeService} from '../../services/youtube.service';

@Component({
  selector: 'app-player-card',
  imports: [
    FormsModule,
  ],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent {
  videoUrl: string = '';
  currentTime: number = 0;
  duration: number = 0;
  private interval: any;

  constructor(private youtubeService: YoutubeService) {}

  play(): void {
    if (!this.videoUrl) {
      alert('Please enter a YouTube URL.');
      return;
    }

    const audioStreamUrl = `http://localhost:3000/stream?url=${encodeURIComponent(
      this.videoUrl
    )}`;
    this.youtubeService.playStream(audioStreamUrl);

    // Update progress bar
    this.interval = setInterval(() => {
      this.currentTime = this.youtubeService.getCurrentTime();
      this.duration = this.youtubeService.getDuration();
    }, 500);
  }

  pause(): void {
    this.youtubeService.pause();
  }

  resume(): void {
    this.youtubeService.resume();
  }

  stop(): void {
    this.youtubeService.stop();
    clearInterval(this.interval);
    this.currentTime = 0;
    this.duration = 0;
  }

  onSeek(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.youtubeService.seek(Number(target.value));
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

}
