# Apple Music Web Player

A Progressive Web App for Apple Music built with Angular, Angular Material, and [MusicKit JS](https://developer.apple.com/documentation/musickitjs).

## Screenshots

![browse.png](./screenshots/browse.png)
![album.png](./screenshots/album.png)

## Development server

Run `ng serve --aot` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Google Analytic tokens

Google Analytics is disabled by default but easily uncommented in the source and enabled. You can easily find the snippets by searching the repo for "gtag" and changing as appropriate. Below is a simple example on how to replace the token using Bash.

```Bash
cd $projectFolder/src/
gaID="Your GA token here"
sed -i "s/\$id/${gaID}/" ./app/app.component.ts
sed -i "s/\$id/${gaID}/" index.html
```