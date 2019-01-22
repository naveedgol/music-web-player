#!/bin/bash
ng build --prod --aot --configuration=$1 --base-href $1
sed -i "/onFetch(event) {/,/const req = event.request;/c onFetch(event){const req=event.request;const whitelist=['apple'];if(whitelist.some(word=>req.url.toLowerCase().includes(word.toLowerCase()))){return}" ./dist/$1/ngsw-worker.js
