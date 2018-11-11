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

  nowPlayingItem: any = {
    'albumName': 'Album',
    'artistName': 'Artist',
    'artwork': {
        'height': 1200,
        'url': '',
        'width': 1200
    },
    'name': 'Name',
    'playParams': {
        'id': 'i.YJMKQ1DSlZNOBa',
        'isLibrary': true,
        'kind': 'song'
    },
    'trackNumber': 1
  };

  constructor(private musicKitService: MusicKitService) {
    // this.musicKit.addEventListener(MusicKit.Events.mediaItemWillChange, this.mediaItemWillChange.bind(this));
    this.musicKitService.musicKit.addEventListener(MusicKit.Events.mediaPlaybackError, this.mediaPlaybackError.bind(this));
    this.musicKitService.musicKit.addEventListener(MusicKit.Events.playbackStateDidChange, this.playbackStateDidChange.bind(this));
  }

  setQueue( item ): Observable<any> {
    const itemPlayParams = item.attributes.playParams;
    return from( this.musicKitService.musicKit.setQueue( { [itemPlayParams.kind]: itemPlayParams.id } ) );
  }

  playItem( item ): Observable<any> {
    console.log(item.attributes);
    this.nowPlayingItem = item.attributes;
    return this.setQueue( item ).pipe( mergeMap( x => this.play() ) );
  }

  play(): Observable<any> {
    return from( this.musicKitService.musicKit.play() );
  }

  pause(): Observable<any> {
    return from( this.musicKitService.musicKit.pause() );
  }

  skipToNextItem(): Observable<any> {
    return from( this.musicKitService.musicKit.player.skipToNextItem() );
  }

  skipToPreviousItem(): Observable<any> {
    return from( this.musicKitService.musicKit.player.skipToPreviousItem() );
  }

  seekToTime( time: number ): Observable<any> {
    return from( this.musicKitService.musicKit.player.seekToTime( time ) );
  }

  get currentPlaybackDuration(): number {
    return this.musicKitService.musicKit.player.currentPlaybackDuration;
  }

  get currentPlaybackTime(): number {
    return this.musicKitService.musicKit.player.currentPlaybackTime;
  }

  playbackStateDidChange(event) {
    this.playbackState = PlaybackStates[ PlaybackStates[event.state] ];
  }

  mediaPlaybackError(event) {
    console.log('err', event);
  }
}
