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
    this.musicKitService.addAuthChangeListener( this.fetchPlaylists.bind(this) );
    this.fetchPlaylists();
  }

  fetchPlaylists(): void {
    if ( this.musicKitService.isAuthorized ) {
      this.apiService.fetchPlaylists().subscribe( x => {
        this.playlists = x;
      });
    } else {
      this.playlists = [];
    }
  }

  authorize(): void {
    this.musicKitService.authorize();
  }

}
