# Apple Music Web Player

A Progressive Web App for Apple Music built with Angular, Angular Material, and [MusicKit JS](https://developer.apple.com/documentation/musickitjs).

## Screenshots

![browse.png](./screenshots/browse.png)
![album.png](./screenshots/album.png)

## Development server

Replace `APPLE_MUSIC_TOKEN` in [`environment.ts`](src/environments/environment.ts) with your own [developer token](https://developer.apple.com/documentation/applemusicapi/getting_keys_and_creating_tokens).

Run `ng serve --aot` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Running With Docker

First you must install [Docker CE](https://docs.docker.com/install/) at least version 16.04.

Then you must build your image running inside the app folder the following CMD:

```bash
docker build -t applemusicplayer:latest .
```

To run the app just type: 

```bash
docker run -p 5000:5000 -d -e APPLE_MUSIC_TOKEN="<YOUR_TOKEN>" applemusicplayer:latest
```

This command will start a web server running at http://localhost:5000

NOTE: please replace `<YOUR_TOKEN>` with your token for [MusicKit JS](https://developer.apple.com/documentation/musickitjs).
