import {Component, OnInit} from '@angular/core';
import {ArtistItemImageComponent} from '../artist-item-image/artist-item-image.component';
import {NgForOf} from '@angular/common';
import {IArtist} from '../../interfaces/IArtist';
import {SpotifyService} from '../../services/spotify.service';

@Component({
  selector: 'app-top-artists',
  imports: [
    ArtistItemImageComponent,
    NgForOf
  ],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.scss'
})
export class TopArtistsComponent implements OnInit{
  artists: IArtist[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.fetchTopArtists();
  }

  async fetchTopArtists(){
    this.artists = await this.spotifyService.fetchTopArtists(5);
  }
}
