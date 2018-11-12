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

  fetchLibrarySongs( offset: number ): Observable<any> {
    return from( this.api.library.songs( null, { limit: 100, offset: offset } ) );
  }

  fetchLibraryAlbums( offset: number ): Observable<any> {
    return from( this.api.library.albums( null, { limit: 100, offset: offset } ) );
  }

  formatArtworkUrl( artwork ) {
    return MusicKit.formatArtworkURL( artwork, 60, 60 );
  }

}
