import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-library-albums',
  templateUrl: './library-albums.component.html',
  styleUrls: ['./library-albums.component.scss']
})
export class LibraryAlbumsComponent implements OnInit {

  dataSource = [];

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.fetchLibraryAlbums( 0 );
  }

  fetchLibraryAlbums( offset: number ): void {
    this.apiService.fetchLibraryAlbums( offset ).subscribe( data => {
      if ( data.length ) {
        this.dataSource = this.dataSource.concat( data );
        this.fetchLibraryAlbums( offset + 100 );
      }
    });
  }

}
