import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MusicKitService } from './musicKit.service';
import { PlayParams } from '../models/play-params';

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

  nowPlayingItem = {
    albumName: '',
    artistName: '',
    artworkURL: '',
    attributes: {
      durationInMillis: 0,
      playParam: {
        id: '',
        isLibrary: false,
        kind: ''
      }
    },
    title: '',
    trackNumber: 1,
    id: '',
    type: ''
  };

  constructor( private musicKitService: MusicKitService ) {
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.mediaPlaybackError, this.mediaPlaybackError.bind(this) );
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.playbackStateDidChange, this.playbackStateDidChange.bind(this) );
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.mediaItemDidChange, this.mediaItemDidChange.bind(this) );

    this.player = this.musicKitService.musicKit.player;
  }

  setQueue( item, startIndex: number = 0 ): Observable<any> {
    const itemPlayParams: PlayParams = item.attributes.playParams;
    return from( this.musicKitService.musicKit.setQueue( { [itemPlayParams.kind]: itemPlayParams.id } ) )
      .pipe( mergeMap( x => this.musicKitService.musicKit.changeToMediaAtIndex( startIndex ) ) );
  }

  playItem( item ): Observable<any> {
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

  mediaItemDidChange(event): void {
    this.nowPlayingItem = event.item;
  }

  mediaPlaybackError( event: any ): void {
    console.log('err', event);
  }
}
