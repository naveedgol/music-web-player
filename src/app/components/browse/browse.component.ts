import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  topSongs = [];
  topAlbums = [];
  topPlaylists = [];
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.apiService.fetchChart().subscribe( data => {
      this.topAlbums = data.albums[0].data;
      this.topPlaylists = data.playlists[0].data;
      this.topSongs = data.songs[0].data;
      this.isLoading = false;
    });
  }

  playSong( trackIndex: number ): void {
    this.playerService.setQueueFromItems( this.topSongs, trackIndex ).subscribe();
  }

}
