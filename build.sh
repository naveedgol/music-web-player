#!/bin/bash
ng build --prod --aot --output-path docs --base-href /apple-music-web-player/
sed -i '' 's/const req = event.request;/const req = event.request;if(req.url.toLowerCase().includes('apple')){return;}/' docs/ngsw-worker.js
cp docs/index.html docs/404.html