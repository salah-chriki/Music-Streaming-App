import {IUser} from '../interfaces/IUser';
import {IPlaylist} from '../interfaces/IPlaylist';
import {IArtist} from '../interfaces/IArtist';
import {IMusic} from '../interfaces/IMusic';
import {newMusic, newPlaylist} from './factories';
import {addMilliseconds, format} from 'date-fns';

export function SpotifyUserToUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
  return {
    id: user.id,
    name: user.display_name!,
    imageUrl: user.images?.pop()?.url || ''
  };
}
export function SpotifyPlaylistToPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist |null{
  if (!playlist) {
    console.error('Invalid playlist object:', playlist);
    return null; // Return a default object or handle as necessary
  }
  return {
    id: playlist.id || '',
    name: playlist.name,
    imageUrl: (playlist.images && playlist.images.length > 0) ? playlist.images.pop()!.url : 'default-image.png', // Fallback to a default image URL if empty
  };
}

export function SpotifySinglePlaylistToPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {
  if (!playlist)
    return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.shift()?.url || '',
    musics: []
  };
}

export function SpotifyArtistToArtist(spotifyArtist: SpotifyApi.ArtistObjectFull): IArtist {
  return {
    id: spotifyArtist.id,
    imageUrl: spotifyArtist.images.sort((a, b) => (a.width ?? 0) - (b.width ?? 0)).pop()?.url || '',
    name: spotifyArtist.name
  };
}

export function SpotifyTSongToSong(spotifyTrack: SpotifyApi.TrackObjectFull): IMusic {
  if (!spotifyTrack)
    return newMusic();

  const msToMinutes = (ms: number) => {
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  };

  return {
    displayPlay: '',
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      imageUrl: spotifyTrack.album.images.shift()!.url,
      name: spotifyTrack.album.name
    },
    artists: spotifyTrack.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    duration: msToMinutes(spotifyTrack.duration_ms)
  };
}
