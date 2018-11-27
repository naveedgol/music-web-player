import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  playlistData;
  totalDuration = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private playerService: PlayerService
  ) {
    route.parent.parent.url.subscribe( url => {
      this.route.paramMap.subscribe( x => {

        if ( url[0].path === 'library' ) {

            this.apiService.fetchLibraryPlaylist( x.get('id') ).subscribe( data => {
              this.playlistData = data;
              for ( const songData of data.relationships.tracks.data ) {
                this.totalDuration += songData.attributes.durationInMillis;
              }
            });

        } else {

          this.apiService.fetchPlaylist( x.get('id') ).subscribe( data => {
            this.playlistData = data;

            for ( const songData of data.relationships.tracks.data ) {
              this.totalDuration += songData.attributes.durationInMillis;
            }
          });
        }
      });
    });
  }

  playPlaylist( shuffle: boolean = false ): void {
    if ( shuffle ) {
      this.playerService.toggleShuffleOn();
    }
    this.playerService.setQueue( this.playlistData ).subscribe(() => {
      if ( shuffle ) {
        this.playerService.toggleShuffleOff();
      }
    });
  }

  playSong( trackIndex: number ): void {
    this.playerService.setQueue( this.playlistData, trackIndex ).subscribe();
  }

}
