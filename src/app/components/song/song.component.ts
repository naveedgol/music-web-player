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
    this.playerService.playItem( this.songData.attributes ).subscribe();
  }

  isSelected(): boolean {
    return this.songData.attributes === this.playerService.nowPlayingItem;
  }

  playNext(): void {
    this.playerService.playNext( this.songData );
  }
}
