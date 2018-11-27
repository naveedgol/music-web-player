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
    this.apiService.fetchPlaylists().subscribe( x => {
      this.playlists = x;
    });
  }

  authorize(): void {
    this.musicKitService.authorize();
  }

  unauthorize(): void {
    this.musicKitService.unauthorize();
  }

}
