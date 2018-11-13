import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  id: string;
  albumData: any;
  totalDuration = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
    ) {
    this.route.paramMap.subscribe( x => {
      this.apiService.fetchLibraryAlbum( x.get('id') ).subscribe( data => {
        this.albumData = data;
        for ( const songData of data.relationships.tracks.data ) {
          this.totalDuration += songData.attributes.durationInMillis;
        }
      });
    });
  }

  ngOnInit() {
  }

}
