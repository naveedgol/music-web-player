import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-library-artists',
  templateUrl: './library-artists.component.html',
  styleUrls: ['./library-artists.component.scss']
})
export class LibraryArtistsComponent implements OnInit {

  dataSource = [];
  isLoading = true;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchLibraryArtists( 0 );
  }

  fetchLibraryArtists( offset: number ): void {
    this.apiService.fetchLibraryArtists( offset ).subscribe( data => {
      if ( data.length ) {
        this.dataSource = this.dataSource.concat( data );
        this.isLoading = false;
        this.fetchLibraryArtists( offset + 100 );
      }
    });
  }

}
