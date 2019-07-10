import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PlayerService } from 'src/app/services/player.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopySnackBarComponent } from '../snack-bar/copy-snack-bar.component';
import { TinyColor } from '@ctrl/tinycolor';
import { QueueSnackBarComponent } from '../snack-bar/queue-snack-bar.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  playlistData: any;
  totalDuration = 0;
  isLoading = true;
  bgColor: string;
  buttonStyling = {};
  isLibrary = false;
  containsVideos = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private playerService: PlayerService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    route.parent.parent.url.subscribe( url => {

      this.isLoading = true;
      this.route.paramMap.subscribe( x => {

        let obs: Observable<any>;
        if ( url.length && url[0].path === 'library' ) {
          this.isLibrary = true;
          obs = this.apiService.fetchLibraryPlaylist( x.get('id') );
        } else {
          obs = this.apiService.fetchPlaylist( x.get('id') );
        }

        obs.subscribe( data => {
          this.playlistData = data;
          if ( data.relationships.tracks.next ) {
            this.fetchPlaylistTracks( data.relationships.tracks.next );
          } else {
            this.calculateRuntime();
            this.colorize();
            this.isLoading = false;
          }
        });
      });
    });
  }

  fetchPlaylistTracks( nextUrl: string ): void {
    this.apiService.fetchPlaylistTracks( nextUrl ).subscribe( data => {
      this.playlistData.relationships.tracks.data = this.playlistData.relationships.tracks.data.concat( data.data );
      if ( data.next ) {
        this.fetchPlaylistTracks( data.next );
      } else {
        this.calculateRuntime();
        this.colorize();
        this.isLoading = false;
      }
    });
  }

  calculateRuntime(): void {
    for ( const songData of this.playlistData.relationships.tracks.data ) {
      if ( !songData.attributes ) {
        this.containsVideos = true;
        this.isLoading = false;
        return;
      }
      this.totalDuration += songData.attributes.durationInMillis;
    }
  }

  colorize(): void {
    if ( !this.isLibrary ) {
      this.buttonStyling = {
        'background-color': '#' + this.playlistData.attributes.artwork.bgColor,
        'color': '#' + this.playlistData.attributes.artwork.textColor1
      };

      let color = new TinyColor(this.playlistData.attributes.artwork.bgColor);
      if ( color.isLight() ) {
        color = color.darken(20);
      }
      this.bgColor = color.toHexString();
    }
  }

  playPlaylist( shuffle: boolean = false ): void {
    if ( shuffle ) {
      this.playerService.toggleShuffleOn();
    }
    this.playerService.setQueueFromItems(
      this.playlistData.relationships.tracks.data
    ).subscribe(() => {
      if ( shuffle ) {
        this.playerService.toggleShuffleOff();
      }
    });
  }

  playSong( trackIndex: number ): void {
    this.playerService.setQueueFromItems(
      this.playlistData.relationships.tracks.data,
      trackIndex
    ).subscribe();
  }

  playNext(): void {
    this.playerService.playNext( this.playlistData );
    this.snackBar.openFromComponent(QueueSnackBarComponent, {
      duration: 1000
    });
  }

  playLater(): void {
    this.playerService.playLater( this.playlistData );
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
}
