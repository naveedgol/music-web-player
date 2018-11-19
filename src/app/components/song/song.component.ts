import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { PlayerService, PlaybackStates } from 'src/app/services/player.service';
import { SongModel } from 'src/app/models/song-model';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit, OnDestroy {

  @Input() songData: SongModel;
  @Input() albumView = false;
  @Output() uponClick: EventEmitter<any> = new EventEmitter();

  isSelected = false;
  isHovering = false;
  playbackStates = PlaybackStates;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.checkIfSelected();
    this.playerService.addListener( this.checkIfSelected.bind(this) );
  }

  ngOnDestroy() {
    this.playerService.removeListener( this.checkIfSelected.bind(this) );
  }

  checkIfSelected() {
    this.isSelected = this.songData.id === this.playerService.nowPlayingItem.id ||
                      this.songData.id === this.playerService.nowPlayingItem.container.id;
  }

  songClicked(): void {
    this.uponClick.emit();
  }
}
