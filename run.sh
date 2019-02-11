#!/bin/bash
echo "Token: $APPLE_MUSIC_TOKEN"

sed -i "/onFetch(event) {/,/const req = event.request;/c onFetch(event){const req=event.request;const whitelist=['apple'];if(whitelist.some(word=>req.url.toLowerCase().includes(word.toLowerCase()))){return}" ./dist/apple-music-web-player/ngsw-worker.js
sed -i "s/APPLE_MUSIC_TOKEN/$APPLE_MUSIC_TOKEN/" ./dist/apple-music-web-player/main.*.js

serve -l tcp://0.0.0.0:5000