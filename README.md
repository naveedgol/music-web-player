# Apple Music Web Player

A Progressive Web App for Apple Music built with Angular, Angular Material, and [MusicKit JS](https://developer.apple.com/documentation/musickitjs).

* [Apple Music Web Player](#apple-music-web-player)
* [Screenshots](#screenshots)
* [Development server](#development-server)
* [Dependencies](#Dependencies)

## Screenshots

![browse.png](./screenshots/browse.png)
![album.png](./screenshots/album.png)

## Development server

Run `ng serve --aot` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Dependencies

If you get a complaint about missing dependencies ensure you do the following

```Bash
cd $projectFolder
npm install angular node-sass
```

### Configuration

```Bash
cd $projectFolder/
npm install angular node-sass
```

#### Replacing the tokens

The Apple Music tokens are kept in the $project/environments folder. These tokens must exist for the application to run.

The following is how to replace the tokens in the environment folder using Bash:

```Bash
cd $projectFolder/environments/
prodToken="Your AM token here"
sed -i "/token/c\   token : \x27${prodToken}\x27" environment.prod.ts

testToken="Your AM token here"
sed -i "/token/c\   token : \x27${testToken}\x27" environment.ts
```