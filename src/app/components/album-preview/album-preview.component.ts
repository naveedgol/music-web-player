import { Component, Input } from '@angular/core';
import { AlbumModel } from 'src/app/models/album-model';
import {PlayerService} from "../../services/player.service";
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.scss']
})
export class AlbumPreviewComponent {

  @Input() albumData: AlbumModel;
  @Input() rank = 0;
  isLoaded: boolean = false;

  constructor(private playerService: PlayerService,
              private apiService: ApiService) {}

  playAlbum(shuffle: boolean = false): void {
    event.stopPropagation();

    if (!this.isLoaded) {
      let albumModel: Observable<AlbumModel>;
      if (this.albumData.type === 'library-albums') {
        albumModel = this.apiService.fetchLibraryAlbum(this.albumData.id);
      } else {
        albumModel = this.apiService.fetchAlbum(this.albumData.id);
      }

      albumModel.subscribe(data => {
        this.albumData = data;
        this.isLoaded = true;
        this.play(shuffle);
      });
    } else {
      this.play(shuffle);
    }
  }

  private play(shuffle: boolean = false): void {
    if (shuffle) {
      this.playerService.toggleShuffleOn();
    }
    this.playerService.setQueueFromItems(this.albumData.relationships.tracks.data).subscribe(() => {
      if (shuffle) {
        this.playerService.toggleShuffleOff();
      }
    });
  }

}
