import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PlayerService } from 'src/app/services/player.service';
import { AlbumModel } from 'src/app/models/album-model';
import { TinyColor } from '@ctrl/tinycolor';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopySnackBarComponent } from '../snack-bar/copy-snack-bar.component';
import { QueueSnackBarComponent } from '../snack-bar/queue-snack-bar.component';
import { AlbumDialogComponent } from '../dialog/album-dialog.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {

  id: string;
  isLoading = true;
  buttonStyling = {};
  albumData: AlbumModel;
  totalDuration = 0;
  bgColor: string;
  isLibrary = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private playerService: PlayerService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    route.parent.parent.url.subscribe( url => {
      this.route.paramMap.subscribe( x => {

        let obs;
        if ( url.length && url[0].path === 'library' ) {
          this.isLibrary = true;
          obs = this.apiService.fetchLibraryAlbum( x.get('id') );
        } else {
          obs = this.apiService.fetchAlbum( x.get('id') );
        }

        obs.subscribe( data => {
          this.albumData = data;

          for ( const songData of data.relationships.tracks.data ) {
            if ( songData.attributes.durationInMillis ) {
              this.totalDuration += songData.attributes.durationInMillis;
            }
          }

          if ( !this.isLibrary ) {
            this.buttonStyling = {
              'background-color': '#' + this.albumData.attributes.artwork.bgColor,
              'color': '#' + this.albumData.attributes.artwork.textColor1
            };

            let color = new TinyColor(this.albumData.attributes.artwork.bgColor);
            if ( color.isLight() ) {
              color = color.darken(20);
            }
            this.bgColor = color.toHexString();
          }

          this.isLoading = false;
        });
      });
    });
  }

  playAlbum( shuffle: boolean = false ): void {
    if ( shuffle ) {
      this.playerService.toggleShuffleOn();
    }
    this.playerService.setQueueFromItems( this.albumData.relationships.tracks.data ).subscribe(() => {
      if ( shuffle ) {
        this.playerService.toggleShuffleOff();
      }
    });
  }

  playSong( trackIndex: number ): void {
    this.playerService.setQueueFromItems(
      this.albumData.relationships.tracks.data,
      trackIndex
    ).subscribe();
  }

  playNext(): void {
    this.playerService.playNext( this.albumData );
    this.snackBar.openFromComponent(QueueSnackBarComponent, {
      duration: 1000
    });
  }

  playLater(): void {
    this.playerService.playLater( this.albumData );
    this.snackBar.openFromComponent(QueueSnackBarComponent, {
      duration: 1000
    });
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

  getInfo(): void {
    this.dialog.open(AlbumDialogComponent, {
      maxHeight: '50vh',
      maxWidth: '800px',
      data: this.albumData
    });
  }
}
