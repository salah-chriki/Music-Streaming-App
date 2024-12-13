import {IArtist} from '../interfaces/IArtist';
import {IMusic} from '../interfaces/IMusic';
import {IPlaylist} from '../interfaces/IPlaylist';
import {IResponseYT} from '../interfaces/IResponseYT';


export function newArtist(): IArtist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    musics: []
  };
}

export function newMusic(): IMusic {
  return {
    displayPlay: '',
    id: '',
    album: {
      id: '',
      imageUrl: '',
      name: '',
    },
    artists: [],
    duration: '',
    title: ''
  };
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    musics: []
  };
}
export function newResponseYT(): IResponseYT {
  return {
    items: [],
  };
}
