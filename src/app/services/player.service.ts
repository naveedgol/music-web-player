import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MusicKitService } from './musicKit.service';

declare var MusicKit: any;

export enum PlaybackStates {
  NONE,
  LOADING,
  PLAYING,
  PAUSED,
  STOPPED,
  ENDED,
  SEEKING,
  NULL,
  WAITING,
  STALLED,
  COMPLETED
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playbackState: PlaybackStates = PlaybackStates.NONE;
  player: any;

  nowPlayingItem: any = {
    'albumName': 'Album',
    'artistName': 'Artist',
    'artwork': {
        'height': 1200,
        'url': '',
        'width': 1200
    },
    'durationInMillis': 0,
    'name': 'Name',
    'playParams': {
        'id': 'i.YJMKQ1DSlZNOBa',
        'isLibrary': true,
        'kind': 'song'
    },
    'trackNumber': 1
  };

  constructor( private musicKitService: MusicKitService ) {
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.mediaPlaybackError, this.mediaPlaybackError.bind(this) );
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.playbackStateDidChange, this.playbackStateDidChange.bind(this) );
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.mediaItemDidChange, this.mediaItemDidChange.bind(this) );

    this.player = this.musicKitService.musicKit.player;
  }

  setQueue( item ): Observable<any> {
    const itemPlayParams = item.playParams;
    return from( this.musicKitService.musicKit.setQueue( { [itemPlayParams.kind]: itemPlayParams.id } ) );
  }

  playItem( item ): Observable<any> {
    this.nowPlayingItem = item;
    return this.setQueue( item ).pipe( mergeMap( x => this.play() ) );
  }

  play(): Observable<any> {
    return from( this.player.play() );
  }

  pause(): Observable<any> {
    return from( this.player.pause() );
  }

  skipToNextItem(): Observable<any> {
    return from( this.player.skipToNextItem() );
  }

  skipToPreviousItem(): Observable<any> {
    return from( this.player.skipToPreviousItem() );
  }

  seekToTime( time: number ): Observable<any> {
    return from( this.player.seekToTime( time ) );
  }

  playNext( item ): void {
    this.player.queue.prepend( item );
  }

  playLater( item ): Observable<any> {
    return from( this.player.queue.append( item ) );
  }

  get currentPlaybackDuration(): number {
    return this.player.currentPlaybackDuration;
  }

  get currentPlaybackTime(): number {
    return this.player.currentPlaybackTime;
  }

  playbackStateDidChange( event: any ): void {
    this.playbackState = PlaybackStates[ PlaybackStates[event.state] ];
  }

  mediaItemDidChange(event) {
    console.log(event);
  }

  mediaPlaybackError( event: any ): void {
    console.log('err', event);
  }
}
