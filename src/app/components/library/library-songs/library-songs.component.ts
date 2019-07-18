import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PlayerService } from 'src/app/services/player.service';
import { SongModel } from 'src/app/models/song-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-library-songs',
  templateUrl: './library-songs.component.html',
  styleUrls: ['./library-songs.component.scss']
})
export class LibrarySongsComponent implements OnInit, OnDestroy {

  constructor(
    private apiService: ApiService,
    private playerService: PlayerService
  ) {}

  librarySongs: SongModel[] = [];
  isLoading = true;
  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.fetchLibrarySongs( 0 );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchLibrarySongs( offset: number ): void {
    this.subscriptions.add( this.apiService.fetchLibrarySongs( offset ).subscribe( data => {
      if ( data.length ) {
        this.librarySongs = this.librarySongs.concat( data );
        this.isLoading = false;
        this.fetchLibrarySongs( offset + 100 );
      }
    })
    );
  }

  playSong( trackIndex: number = 0, shuffle: boolean = false): void {
    if (shuffle) {
      this.playerService.toggleShuffleOn();
    }
    this.playerService.setQueueFromItems( this.librarySongs, trackIndex ).subscribe(() => {
      if ( shuffle ) {
        this.playerService.toggleShuffleOff();
      }
    });
  }
}
