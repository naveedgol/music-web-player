import { Component } from '@angular/core';
import { PlayerService, PlaybackStates } from '../../services/player.service';

@Component({
  selector: 'app-track-controls',
  templateUrl: './track-controls.component.html',
  styleUrls: ['./track-controls.component.scss']
})
export class TrackControlsComponent {

  constructor( public playerService: PlayerService ) {
  }

  public playbackStates = PlaybackStates;
  sliderValue = 0;

  get isLoading(): boolean {
    return this.playerService.playbackState === this.playbackStates.LOADING ||
           this.playerService.playbackState === this.playbackStates.ENDED ||
           this.playerService.playbackState === this.playbackStates.WAITING ||
           this.playerService.playbackState === this.playbackStates.STALLED;
  }

  togglePlayPause(): void {
    if ( this.playerService.playbackState === this.playbackStates.PAUSED ) {
      this.playerService.play().subscribe();
    } else {
      this.playerService.pause().subscribe();
    }
  }

  skipToNextItem(): void {
    this.playerService.skipToNextItem().subscribe();
  }

  skipToPreviousItem(): void {
    this.playerService.skipToPreviousItem().subscribe();
  }

  seekToTime( time: number ): void {
    this.playerService.seekToTime( time ).subscribe();
  }

  get currentPlaybackDuration(): number {
    return this.playerService.currentPlaybackDuration;
  }

  get currentPlaybackTime(): number {
    return this.playerService.currentPlaybackTime;
  }
}
