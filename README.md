# Apple Music Web Player

A Progressive Web App for Apple Music built with Angular, Angular Material, and [MusicKit JS](https://developer.apple.com/documentation/musickitjs).

## Screenshots

![browse.png](./screenshots/browse.png)
![album.png](./screenshots/album.png)

## Development server

Replace `APPLE_MUSIC_TOKEN` in [`environment.ts`](src/environments/environment.ts) with your own [developer token](https://developer.apple.com/documentation/applemusicapi/getting_keys_and_creating_tokens).

Run `ng serve --aot` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Discontinuation disclosure

As a result of changes requested by Apple and increased server costs, I've moved the site to GitHub pages hosting. The site can be used from https://naveedgol.github.io/apple-music-web-player/ and is no longer available from https://playapplemusic.com.

Given the cost of renewing my Apple developer membership and emergence of other quality Apple Music web players, I will stop hosting the web player on November 1, 2019. The code will still be availble for those interested in hosting their own personal servers.