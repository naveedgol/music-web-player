import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playlist-preview',
  templateUrl: './playlist-preview.component.html',
  styleUrls: ['./playlist-preview.component.scss']
})
export class PlaylistPreviewComponent {

  @Input() playlistData;

  constructor() { }

}
