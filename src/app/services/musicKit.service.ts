import { Injectable } from '@angular/core';
import { token } from '../../environments/token';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class MusicKitService {
    musicKit: any;

    constructor() {

        MusicKit.configure({
          developerToken: token,
          app: {
            name: 'Apple Music Web Player',
            build: '1.0'
          }
        });

        this.musicKit = MusicKit.getInstance();

        // this.musicKit.authorize();
    }
}
