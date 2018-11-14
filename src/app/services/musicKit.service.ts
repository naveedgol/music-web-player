import { Injectable } from '@angular/core';
import { token } from '../../environments/token';
import { Observable, from } from 'rxjs';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class MusicKitService {
    musicKit: any;
    isAuthorized = false;

    constructor() {

        MusicKit.configure({
          developerToken: token,
          app: {
            name: 'Apple Music Web Player',
            build: '1.0'
          }
        });

        this.musicKit = MusicKit.getInstance();

        this.isAuthorized = this.musicKit.isAuthorized;
    }

    authorize(): void {
      from( this.musicKit.authorize() ).subscribe( () => {
        this.isAuthorized = true;
      });
    }

    unauthorize(): void {
      from( this.musicKit.unauthorize() ).subscribe( () => {
        this.isAuthorized = false;
      });
    }
}
