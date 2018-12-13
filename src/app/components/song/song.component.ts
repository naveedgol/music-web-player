import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { PlayerService, PlaybackStates } from 'src/app/services/player.service';
import { SongModel } from 'src/app/models/song-model';
import { MatSnackBar } from '@angular/material';
import { QueueSnackBarComponent } from '../snack-bar/queue-snack-bar.component';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit, OnDestroy {

  @Input() songData: SongModel;
  @Input() albumView = false;
  @Input() queueView = false;
  @Input() rank = 0;
  @Output() uponPlay: EventEmitter<any> = new EventEmitter();
  @Output() uponRemove: EventEmitter<any> = new EventEmitter();

  isHovering = false;
  isSelected = false;
  isAction = false;
  playbackStates = PlaybackStates;
  isReleased = true;
  isSong = true;

  constructor(
    private playerService: PlayerService,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.isSong = this.songData.type !== 'music-videos';
    const currentDate = new Date().getTime();
    const songDate = Date.parse(this.songData.attributes.releaseDate);
    if ( songDate > currentDate ) {
      this.isReleased = false;
    }

    this.checkIfSelected();
    this.playerService.addMediaChangeListener( this.checkIfSelected.bind(this) );
  }

  ngOnDestroy() {
    // this.playerService.removeListener( this.checkIfSelected.bind(this) );
  }

  checkIfSelected() {
    if ( this.queueView ) {
      return false;
    }
    this.isSelected = this.songData.id === this.playerService.nowPlayingItem.id ||
                      this.songData.id === this.playerService.nowPlayingItem.container.id ||
                      this.songData.id === this.playerService.nowPlayingItem.collectionId;
  }

  songClicked(): void {
    this.uponPlay.emit();
  }

  playNext(): void {
    this.playerService.playNext( this.songData );
    this.snackBar.openFromComponent(QueueSnackBarComponent, {
      duration: 1000
    });
  }

  playLater(): void {
    this.playerService.playLater( this.songData );
    this.snackBar.openFromComponent(QueueSnackBarComponent, {
      duration: 1000
    });
  }
}
