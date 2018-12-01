#!/bin/bash
ng build --prod --aot
sed -i "/onFetch(event) {/,/const req = event.request;/c onFetch(event){const req=event.request;const whitelist=['apple'];if(whitelist.some(word=>req.url.toLowerCase().includes(word.toLowerCase()))){return}" ./dist/apple-music-web-player/ngsw-worker.js
