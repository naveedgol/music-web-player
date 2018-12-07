import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {
  artistData;
  singlesCount = 0;
  albumsCount = 0;
  playlistsCount = 0;
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    route.parent.parent.url.subscribe( url => {
      this.route.paramMap.subscribe( x => {
        if ( url.length && url[0].path === 'library' ) {
          this.apiService.fetchLibraryArtist( x.get('id') ).subscribe( data => {
            this.artistData = data;
            this.albumsCount = this.artistData.relationships.albums.data.length;
            this.isLoading = false;
          });
        } else {
          this.apiService.fetchArtist( x.get('id') ).subscribe( data => {
            this.artistData = data;
            for ( const album of this.artistData.relationships.albums.data ) {
              album.attributes.isSingle ? ++this.singlesCount : ++this.albumsCount;
            }
            this.playlistsCount = this.artistData.relationships.playlists.data.length;
            this.isLoading = false;
          });
        }
      });
    });
  }
}
