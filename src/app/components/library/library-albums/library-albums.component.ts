import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlbumModel } from 'src/app/models/album-model';

@Component({
  selector: 'app-library-albums',
  templateUrl: './library-albums.component.html',
  styleUrls: ['./library-albums.component.scss']
})
export class LibraryAlbumsComponent implements OnInit {

  dataSource: AlbumModel[] = [];
  isLoading = true;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchLibraryAlbums( 0 );
  }

  fetchLibraryAlbums( offset: number ): void {
    this.apiService.fetchLibraryAlbums( offset ).subscribe( data => {
      if ( data.length ) {
        this.dataSource = this.dataSource.concat( data );
        this.isLoading = false;
        this.fetchLibraryAlbums( offset + 100 );
      }
    });
  }

}
