import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MusicKitService } from './musicKit.service';
import { PlayParams } from '../models/play-params';
import { SongModel } from '../models/song-model';
import { Title } from '@angular/platform-browser';

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

  bitrate = 256;
  playbackState: PlaybackStates = PlaybackStates.NONE;
  player: any;
  queue = [];
  queuePosition = 0;
  repeatMode = 0;
  isShuffling = false;
  infiniteLoadTimeout;

  nowPlayingItem = {
    albumName: '',
    artistName: '',
    artworkURL: '',
    title: '',
    trackNumber: 1,
    id: '',
    type: '',
    container: { id: '' },
    playbackDuration: 0,
    collectionId: '',
    assets: [
      {
        metadata: {
          artistId: '',
          playlistId: ''
        }
      }
    ]
  };

  constructor(
    private musicKitService: MusicKitService,
    private titleService: Title
  ) {
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.mediaPlaybackError, this.mediaPlaybackError.bind(this) );
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.playbackStateDidChange, this.playbackStateDidChange.bind(this) );
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.mediaItemDidChange, this.mediaItemDidChange.bind(this) );
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.queueItemsDidChange, this.queueItemsDidChange.bind(this) );
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.queuePositionDidChange, this.queuePositionDidChange.bind(this) );

    this.player = this.musicKitService.musicKit.player;

    if ( localStorage.getItem('bitrate') === null ) {
      this.bitrate = 256;
    } else {
      this.bitrate = parseInt( localStorage.getItem('bitrate'), 10 );
    }
    this.changeBitrate();
  }

  setQueueFromItems( items: SongModel[], startIndex: number = 0 ): Observable<any> {
    items.forEach( item => item['container'] = { 'id': item.id } );
    return from( this.musicKitService.musicKit.setQueue( { 'items': items, startPosition: startIndex } ) )
      .pipe( mergeMap( x => this.play() ) );
  }

  play(): Observable<any> {
    return from( this.player.play() );
  }

  pause(): Observable<any> {
    return from( this.player.pause() );
  }

  stop(): Observable<any> {
    return from( this.player.stop() );
  }

  toggleRepeat(): void {
    const nextRepeatMode = (this.player.repeatMode + 1) % 3;
    this.player.repeatMode = nextRepeatMode;
    this.repeatMode = this.player.repeatMode;
  }

  toggleShuffleOn(): void {
    this.player.shuffleMode = 1;
    this.isShuffling = true;
  }

  toggleShuffleOff(): void {
    this.player.shuffleMode = 0;
    this.isShuffling = false;
  }

  skipToNextItem(): Observable<any> {
    // if ( this.repeatMode === 1 ) {
    //   return this.seekToTime( 0 );
    // }
    return from( this.player.skipToNextItem() );
  }

  skipToPreviousItem(): Observable<any> {
    if ( this.repeatMode === 1 ) {
      return this.seekToTime( 0 );
    }
    return from( this.player.skipToPreviousItem() );
  }

  seekToTime( time: number ): Observable<any> {
    return from( this.player.seekToTime( time ) );
  }

  playNext( item ): void {
    this.player.queue.prepend( item );
  }

  playLater( item ): void {
    this.player.queue.append( item );
  }

  get currentPlaybackDuration(): number {
    return this.player.currentPlaybackDuration;
  }

  get currentPlaybackTime(): number {
    return this.player.currentPlaybackTime;
  }

  playbackStateDidChange( event: any ): void {
    this.playbackState = PlaybackStates[ PlaybackStates[event.state] ];

    // sometimes loading just gets stuck, a stop and resume fixes that
    if ( this.playbackState === PlaybackStates.WAITING ) {
      const lastItem = this.nowPlayingItem;
      this.infiniteLoadTimeout = setTimeout( () => {
        if ( this.playbackState === PlaybackStates.WAITING && lastItem === this.nowPlayingItem ) {
          this.stop().subscribe( () => this.play() );
        }
      }, 2000 );
    } else {
      clearTimeout( this.infiniteLoadTimeout );
    }

    if ( this.playbackState === PlaybackStates.PAUSED || this.playbackState === PlaybackStates.STOPPED ) {
      this.titleService.setTitle('Music Player');
    } else {
      this.titleService.setTitle( this.nowPlayingItem.title + ' • ' + this.nowPlayingItem.artistName );
    }
  }

  mediaItemDidChange(event): void {
    this.nowPlayingItem = event.item;
    this.titleService.setTitle( this.nowPlayingItem.title + ' • ' + this.nowPlayingItem.artistName );
  }

  mediaPlaybackError( event: any ): void {
    console.log('mediaPlayBackError', event);
  }

  queueItemsDidChange( event: any ): void {
    this.queue = this.player.queue.items.slice(this.queuePosition);
  }

  queuePositionDidChange( event: any ): void {
    this.queuePosition = event.position + 1;
    this.queue = this.player.queue.items.slice(this.queuePosition);
  }

  removeFromQueue( index: number ): void {
    this.player.queue.remove( index + this.queuePosition );
  }

  changeQueuePosition( index ): void {
    this.musicKitService.musicKit.changeToMediaAtIndex( index + this.queuePosition );
  }

  addMediaChangeListener( func ) {
    this.musicKitService.musicKit.addEventListener( MusicKit.Events.mediaItemDidChange, func );
  }

  removeListener( func ) {
    this.musicKitService.musicKit.removeEventListener( MusicKit.Events.mediaItemDidChange, func );
  }

  changeVolume( volume: number ): void {
    this.player.volume = volume;
  }

  changeBitrate() {
    this.musicKitService.musicKit.bitrate = this.bitrate;
    localStorage.setItem('bitrate', this.bitrate.toString());
  }
}
