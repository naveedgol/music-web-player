import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { MusicKitService } from './musicKit.service';
import { SongModel } from '../models/song-model';
import { AlbumModel } from '../models/album-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api: any;

  constructor( private musicKitService: MusicKitService ) {
    this.api = this.musicKitService.musicKit.api;
  }

  fetchLibrarySongs( offset: number ): Observable<SongModel[]> {
    return from( this.api.library.songs( null, { limit: 100, offset: offset } ) );
  }

  fetchLibraryAlbums( offset: number ): Observable<AlbumModel[]> {
    return from( this.api.library.albums( null, { limit: 100, offset: offset } ) );
  }

  fetchLibraryAlbum( id: string ): Observable<AlbumModel> {
    return from( this.api.library.album( id ) );
  }

  fetchAlbum( id: string ): Observable<AlbumModel> {
    return from( this.api.album( id ) );
  }

  search( query: string ): Observable<any> {
    const searchTypes = ['songs', 'albums', 'artists', 'playlists'];
    return from( this.api.search( query, { types: searchTypes, limit: 20 } ) );
  }

  searchLibrary( query: string ): Observable<any> {
    const searchTypes = ['library-songs', 'library-albums', 'library-artists', 'library-playlists'];
    return from( this.api.library.search( query, { types: searchTypes, limit: 20 } ) );
  }
}
