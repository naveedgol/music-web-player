import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PlayerService } from 'src/app/services/player.service';
import { AlbumModel } from 'src/app/models/album-model';
import { TinyColor } from '@ctrl/tinycolor';
import { MatSnackBar } from '@angular/material';
import { CopySnackBarComponent } from '../snack-bar/copy-snack-bar.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {

  id: string;
  albumData: AlbumModel;
  totalDuration = 0;
  bgColor: string;
  isLibrary = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private playerService: PlayerService,
    public snackBar: MatSnackBar
  ) {
    route.parent.parent.url.subscribe( url => {
      this.route.paramMap.subscribe( x => {

        if ( url[0].path === 'library' ) {
            this.isLibrary = true;

            this.apiService.fetchLibraryAlbum( x.get('id') ).subscribe( data => {
              this.albumData = data;
              for ( const songData of data.relationships.tracks.data ) {
                this.totalDuration += songData.attributes.durationInMillis;
              }
            });

        } else {

          this.apiService.fetchAlbum( x.get('id') ).subscribe( data => {
            this.albumData = data;
            let color = new TinyColor(this.albumData.attributes.artwork.bgColor);
            if ( color.isLight() ) {
              color = color.darken(20);
            }
            this.bgColor = color.toHexString();

            for ( const songData of data.relationships.tracks.data ) {
              this.totalDuration += songData.attributes.durationInMillis;
            }
          });

        }
      });
    });
  }

  playAlbum( shuffle: boolean = false ): void {
    if ( shuffle ) {
      this.playerService.toggleShuffleOn();
    }
    this.playerService.setQueue( this.albumData ).subscribe(() => {
      if ( shuffle ) {
        this.playerService.toggleShuffleOff();
      }
    });
  }

  playSong( trackIndex: number ): void {
    this.playerService.setQueue( this.albumData, trackIndex ).subscribe();
  }

  playNext(): void {
    this.playerService.playNext( this.albumData );
  }

  playLater(): void {
    this.playerService.playLater( this.albumData );
  }

  copyLink(): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snackBar.openFromComponent(CopySnackBarComponent, {
      duration: 1000
    });
  }
}
