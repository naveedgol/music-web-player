import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PlayerService } from 'src/app/services/player.service';
import { SongModel } from 'src/app/models/song-model';

@Component({
  selector: 'app-library-songs',
  templateUrl: './library-songs.component.html',
  styleUrls: ['./library-songs.component.scss']
})
export class LibrarySongsComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private playerService: PlayerService
  ) {}

  librarySongs: SongModel[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.fetchLibrarySongs( 0 );
  }

  fetchLibrarySongs( offset: number ): void {
    this.apiService.fetchLibrarySongs( offset ).subscribe( data => {
      if ( data.length ) {
        this.librarySongs = this.librarySongs.concat( data );
        this.isLoading = false;
        this.fetchLibrarySongs( offset + 100 );
      }
    });
  }

  playSong( trackIndex: number ): void {
    this.playerService.setQueueFromItems( this.librarySongs, trackIndex ).subscribe();
  }
}
