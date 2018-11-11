import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { MusicKitService } from './musicKit.service';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api: any;

  constructor( private musicKitService: MusicKitService ) {
    this.api = this.musicKitService.musicKit.api;
  }

  fetchLibrary( offset: number ): Observable<any> {
    return from( this.api.library.songs( null, { limit: 100, offset: offset } ) );
  }

  formatArtworkUrl( artwork ) {
    return MusicKit.formatArtworkURL( artwork, 60, 60 );
  }

}
