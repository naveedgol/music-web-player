import { Component, ViewChild, HostListener } from '@angular/core';
import { PlayerService, PlaybackStates } from '../../services/player.service';
import { MatBottomSheet } from '@angular/material';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-track-controls',
  templateUrl: './track-controls.component.html',
  styleUrls: ['./track-controls.component.scss']
})
export class TrackControlsComponent {

  public playbackStates = PlaybackStates;
  lastVolume = 10;
  @ViewChild('volume') volumeSlider;

  constructor(
    public playerService: PlayerService,
    private bottomSheet: MatBottomSheet
    ) {
  }

  @HostListener('document:keydown.space', ['$event']) onSpaceKeydownHandler(event: KeyboardEvent) {
    if ( event.srcElement.tagName !== 'INPUT' ) {
      event.preventDefault();
      this.togglePlayPause();
    }
  }

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

  changeVolume( volume: number ): void {
    this.lastVolume = volume;
    this.playerService.changeVolume( volume / 10 );
  }

  toggleMute( volume: number ): void {
    if ( this.volumeSlider.value > 0 ) {
      this.playerService.changeVolume( 0 );
      this.volumeSlider.value = 0;
    } else {
      this.playerService.changeVolume( this.lastVolume / 10 );
      this.volumeSlider.value = this.lastVolume;
    }
  }


  get currentPlaybackDuration(): number {
    return this.playerService.currentPlaybackDuration;
  }

  get currentPlaybackTime(): number {
    return this.playerService.currentPlaybackTime;
  }

  openSettings() {
    this.bottomSheet.open(SettingsComponent);
  }
}
