import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-artist-preview',
  templateUrl: './artist-preview.component.html',
  styleUrls: ['./artist-preview.component.scss']
})
export class ArtistPreviewComponent {

  @Input() artistData;

  constructor(private apiService: ApiService,
              private playerService: PlayerService) { }

  moreActions(): void {
    event.stopPropagation();
  }

  play(shuffle: boolean = false): void {
    this.apiService.fetchLibraryArtist(this.artistData.id).subscribe( data => {
      this.artistData = data;

      const index = shuffle ? Math.floor(Math.random() * data.relationships.albums.data.length) + 1 : 0;

      const albumId = data.relationships.albums.data[index].id;
      this.apiService.fetchLibraryAlbum(albumId).subscribe(res => {
        if (shuffle) {
          this.playerService.toggleShuffleOn();
        }
        this.playerService.setQueueFromItems(res.relationships.tracks.data).subscribe(() => {
          if (shuffle) {
            this.playerService.toggleShuffleOff();
          }
        });
      });
    });
  }

}
