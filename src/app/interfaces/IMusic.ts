export interface IMusic {
  id: string;
  title: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    imageUrl: string;
  };
  duration: string;
  displayPlay:string;
}


export interface SongContent extends IMusic {
  file?: string;
  cover?: string;
  fileContentType?: string;
}
