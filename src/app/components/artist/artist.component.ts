import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artistData;
  singlesCount = 0;
  albumsCount = 0;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    route.parent.parent.url.subscribe( url => {
      this.route.paramMap.subscribe( x => {
        if ( url[0].path === 'library' ) {
          this.apiService.fetchLibraryArtist( x.get('id') ).subscribe( data => {
            this.artistData = data;
            this.albumsCount = this.artistData.relationships.albums.data.length;
          });
        } else {
          this.apiService.fetchArtist( x.get('id') ).subscribe( data => {
            this.artistData = data;
            for ( const album of this.artistData.relationships.albums.data ) {
              if ( album.attributes.isSingle ) {
                ++this.singlesCount;
              } else {
                ++this.albumsCount;
              }
            }
          });
        }
      });
    });
  }

  ngOnInit() {
  }

}
