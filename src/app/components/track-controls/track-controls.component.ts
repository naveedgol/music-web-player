import { Component, ViewChild, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { PlayerService, PlaybackStates } from '../../services/player.service';
import { MatBottomSheet } from '@angular/material';
import { SettingsComponent } from '../settings/settings.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-track-controls',
  templateUrl: './track-controls.component.html',
  styleUrls: ['./track-controls.component.scss']
})
export class TrackControlsComponent {

  @Input() isMobile: boolean;
  @Output() uponOpened: EventEmitter<any> = new EventEmitter();
  public playbackStates = PlaybackStates;
  lastVolume = 10;
  queueVisible = false;

  @ViewChild('volume') volumeSlider;

  constructor(
    public playerService: PlayerService,
    private bottomSheet: MatBottomSheet
  ) {
  }

  @HostListener('document:keydown', ['$event']) KeydownHandler(event: KeyboardEvent) {
    if (event.srcElement.tagName !== 'INPUT') {
      event.preventDefault();
      switch (event.key) {
        case ' ':
          this.togglePlayPause();
          break;
          case 'space':
          this.togglePlayPause();
          break;
        case 'p':
          this.togglePlayPause();
          break;
        case 'MediaPlay':
          this.togglePlayPause();
          break;
        case 'MediaTrackNext':
          this.skipToNextItem();
          break;
        case 'MediaTrackPrevious':
          this.skipToPreviousItem();
          break;
        case 'd':
          this.skipToNextItem();
          break;
        case 'a':
          this.skipToPreviousItem();
          break;
        case 'w':
          if (this.lastVolume + .2 >= 10 || this.lastVolume === 10) {
            this.changeVolume(10);
            this.volumeSlider.value = 10;
            break;
          }
          this.changeVolume(this.lastVolume + .2);
          this.volumeSlider.value = this.lastVolume + .2;
          break;
        case 's':
          if (this.lastVolume - .2 <= 0 || this.lastVolume === 0) {
            this.changeVolume(0);
            this.volumeSlider.value = 0;
            break;
          }
          this.changeVolume(this.lastVolume - .2);
          this.volumeSlider.value = this.lastVolume - .2;
          break;
        default:
          break;
      }
    }
  }

  get isLoading(): boolean {
    return this.playerService.playbackState === this.playbackStates.LOADING ||
      this.playerService.playbackState === this.playbackStates.ENDED ||
      this.playerService.playbackState === this.playbackStates.WAITING ||
      this.playerService.playbackState === this.playbackStates.STALLED;
  }

  togglePlayPause(): void {
    if (this.playerService.playbackState === this.playbackStates.PAUSED) {
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

  seekToTime(time: number): void {
    this.playerService.seekToTime(time).subscribe();
  }

  changeVolume(volume: number): void {
    this.lastVolume = volume;
    this.playerService.changeVolume(volume / 10);
  }

  toggleMute(volume: number): void {
    if (this.volumeSlider.value > 0) {
      this.playerService.changeVolume(0);
      this.volumeSlider.value = 0;
    } else {
      this.playerService.changeVolume(this.lastVolume / 10);
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

  toggleQueue(): void {
    this.queueVisible = !this.queueVisible;
  }
}
