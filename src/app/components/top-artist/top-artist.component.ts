import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {newArtist} from '../../common/factories';
import {IArtist} from '../../interfaces/IArtist';

@Component({
  selector: 'app-top-artist',
  imports: [],
  templateUrl: './top-artist.component.html',
  styleUrl: './top-artist.component.scss'
})
export class TopArtistComponent implements OnInit{
  topArtist: IArtist = newArtist();

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.fetchTopArtists();
  }

  async fetchTopArtists(){
    const artist = await this.spotifyService.fetchTopArtists(1);

    if (!!artist)
      this.topArtist = artist.pop()!;
  }
}
