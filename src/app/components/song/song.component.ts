import { Component, Input } from '@angular/core';
import { PlayerService, PlaybackStates } from 'src/app/services/player.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent {

  @Input() songData;
  isHovering = false;
  playbackStates = PlaybackStates;

  constructor(private playerService: PlayerService) { }

  songClicked(): void {
    this.playerService.playItem( this.songData ).subscribe();
  }

  isSelected(): boolean {
    return this.songData === this.playerService.nowPlayingItem;
  }

  isPlaying(): boolean {
    return this.isSelected() && this.playerService.playbackState === this.playbackStates.PLAYING;
  }

  togglePlayPause(): void {
    if ( !this.isSelected() ) {
      this.playerService.playItem( this.songData ).subscribe();
    } else {
      if ( this.playerService.playbackState === this.playbackStates.PAUSED ) {
        this.playerService.play().subscribe();
      } else {
        this.playerService.pause().subscribe();
      }
    }
  }

  get isLoading(): boolean {
    return this.playerService.playbackState === this.playbackStates.LOADING ||
           this.playerService.playbackState === this.playbackStates.ENDED ||
           this.playerService.playbackState === this.playbackStates.WAITING ||
           this.playerService.playbackState === this.playbackStates.STALLED;
  }
}
