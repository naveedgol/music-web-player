import { Component } from '@angular/core';
import { MusicKitService } from 'src/app/services/musicKit.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  playlists = [];

  constructor(
    public musicKitService: MusicKitService,
    private apiService: ApiService
  ) {
    this.musicKitService.addAuthChangeListener( this.onAuthorize.bind(this) );
    this.fetchPlaylists( 0 );
  }

  fetchPlaylistsHelper( offset: number ): void {
    this.apiService.fetchPlaylists( offset ).subscribe( data => {
      if ( data.length ) {
        this.playlists = this.playlists.concat( data );
        this.fetchPlaylistsHelper( offset + 100 );
      }
    });
  }

  fetchPlaylists( offset: number ): void {
    if ( this.musicKitService.isAuthorized ) {
      this.fetchPlaylistsHelper( offset );
    } else {
      this.playlists = [];
    }
  }

  authorize(): void {
    this.musicKitService.authorize();
  }

  onAuthorize(): void {
    setTimeout( () =>
      this.fetchPlaylists( 0 ),
      500
    );
  }

}
