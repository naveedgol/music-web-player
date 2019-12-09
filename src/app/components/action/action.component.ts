import {Component, Input} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs";
import {ActionType} from "./action.type";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {

  @Input() id: string;
  @Input() type: ActionType;
  @Input() isLibrary: boolean;
  showActions: boolean = false;
  object: any;
  isLoaded: boolean = false;

  constructor(private playerService: PlayerService,
              private apiService: ApiService) {}

  show(): void {
    this.showActions = true;
  }

  hidden(): void {
    this.showActions = false;
  }

  showList(): void {
    event.stopPropagation();
    this.load();
  }

  playSong(trackIndex: number): void {
    this.playerService.setQueueFromItems(
      this.object.relationships.tracks.data,
      trackIndex
    ).subscribe();
  }

  playAlbum(shuffle: boolean = false): void {
    event.stopPropagation();
    this.load(() => {
      this.play(shuffle);
    });
  }

  private load(callback?: Function): void {
    if (!this.isLoaded) {
      let obs: Observable<any>;
      if (this.type === ActionType.ALBUM) {
        obs = this.loadAlbum();
      } else {
        obs = this.loadPlaylist();
      }

      obs.subscribe(data => {
        this.object = data;
        this.isLoaded = true;
        if (callback) {
          callback();
        }
      });
    } else {
      if (callback) {
        callback();
      }
    }
  }

  private loadAlbum(): Observable<any> {
    if (this.isLibrary) {
      return this.apiService.fetchLibraryAlbum(this.id);
    } else {
      return this.apiService.fetchAlbum(this.id);
    }
  }

  private loadPlaylist(): Observable<any> {
    if (this.isLibrary) {
      return this.apiService.fetchLibraryPlaylist(this.id);
    } else {
      return this.apiService.fetchPlaylist(this.id);
    }
  }

  private play(shuffle: boolean = false): void {
    if (shuffle) {
      this.playerService.toggleShuffleOn();
    }
    this.playerService.setQueueFromItems(this.object.relationships.tracks.data).subscribe(() => {
      if (shuffle) {
        this.playerService.toggleShuffleOff();
      }
    });
  }

}
