export const environment = {
  production: false
};


export const SpotifyConfiguration = {
  clientId: '536bba00aba34035a13d1f6d0412c64e',
  authEndPoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'http://localhost:4200/login/',
  scopes: [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "user-library-read",
    "playlist-read-private",
    "playlist-read-collaborative"
  ]
}
