import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-library-songs',
  templateUrl: './library-songs.component.html',
  styleUrls: ['./library-songs.component.scss']
})
export class LibrarySongsComponent implements OnInit {

  constructor(private apiService: ApiService, private playerService: PlayerService) { }

  displayedColumns: string[] = ['name', 'artist', 'album'];
  dataSource = [];

  ngOnInit() {
    this.fetchLibraryTracks( 0 );

  }

  fetchLibraryTracks( offset: number ): void {
    this.apiService.fetchLibrary( offset ).subscribe( data => {
      if ( data.length ) {
        this.dataSource = this.dataSource.concat( data );
        this.fetchLibraryTracks( offset + 100 );
      }
    });
  }

  clicked( item ) {
    this.playerService.playItem( item ).subscribe();
  }

}
