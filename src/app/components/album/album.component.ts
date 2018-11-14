import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PlayerService } from 'src/app/services/player.service';
import { AlbumModel } from 'src/app/models/album-model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {

  id: string;
  albumData: AlbumModel;
  totalDuration = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private playerService: PlayerService
  ) {
    route.parent.parent.url.subscribe( url => {
      this.route.paramMap.subscribe( x => {

        if ( url[0].path === 'library' ) {

            this.apiService.fetchLibraryAlbum( x.get('id') ).subscribe( data => {
              this.albumData = data;
              for ( const songData of data.relationships.tracks.data ) {
                this.totalDuration += songData.attributes.durationInMillis;
              }
            });

        } else {

          this.apiService.fetchAlbum( x.get('id') ).subscribe( data => {
            this.albumData = data;
            console.log( this.albumData );
            for ( const songData of data.relationships.tracks.data ) {
              this.totalDuration += songData.attributes.durationInMillis;
            }
          });

        }
      });
    });
  }

  playAlbum(): void {
    this.playerService.setQueue( this.albumData ).subscribe();
  }

  playSong( trackIndex: number ): void {
    this.playerService.setQueue( this.albumData, trackIndex ).subscribe();
  }
}
