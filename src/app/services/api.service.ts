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

  fetchLibraryArtists( offset: number ): Observable<any> {
    return from( this.api.library.artists( null, { limit: 100, offset: offset } ) );
  }

  fetchLibraryArtist( id: string ): Observable<any> {
    return from( this.api.library.artist( id, { include: 'albums' } ) );
  }

  fetchArtist( id: string ): Observable<any> {
    return from( this.api.artist( id, { include: 'playlists,albums', offset: '26' } ) );
  }

  search( query: string ): Observable<any> {
    const searchTypes = ['songs', 'albums', 'artists', 'playlists'];
    return from( this.api.search( query, { types: searchTypes, limit: 50 } ) );
  }

  searchLibrary( query: string ): Observable<any> {
    const searchTypes = ['library-songs', 'library-albums', 'library-artists', 'library-playlists'];
    return from( this.api.library.search( query, { types: searchTypes, limit: 20 } ) );
  }

  fetchPlaylists(): Observable<any> {
    return from( this.api.library.playlists() );
  }

  fetchLibraryPlaylist( id: string ): Observable<any> {
    return from( this.api.library.playlist( id ) );
  }

  fetchPlaylist( id: string ): Observable<any> {
    return from( this.api.playlist( id ) );
  }

  fetchRecentlyAdded( offset: number ): Observable<any> {
    return from( this.api.library.collection('recently-added', null, { limit: 10, offset: offset } ) );
  }

  fetchRecommendations(): Observable<any> {
    return from( this.api.recommendations() );
  }

  fetchRecentPlayed(): Observable<any> {
    return from( this.api.recentPlayed() );
  }

  fetchHeavyRotation(): Observable<any> {
    return from( this.api.historyHeavyRotation() );
  }

  fetchChart(): Observable<any> {
    const searchTypes = ['songs', 'albums', 'playlists'];
    return from( this.api.charts( null, { types: searchTypes, limit: 10 } ) );
  }
}
