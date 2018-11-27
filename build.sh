#!/bin/bash
ng build --prod --aot --base-href /apple-music-web-player/
sed -i '' "s/const req = event.request;/const req = event.request;if(req.url.toLowerCase().includes('apple')){return;}/" dist/apple-music-web-player/ngsw-worker.js
git checkout gh-pages
cp -r dist/apple-music-web-player/* .
git add -A
git commit -m "Rebuild"
git push
git checkout master
