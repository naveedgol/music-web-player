import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AlbumModel } from 'src/app/models/album-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-library-albums',
  templateUrl: './library-albums.component.html',
  styleUrls: ['./library-albums.component.scss']
})
export class LibraryAlbumsComponent implements OnInit, OnDestroy {

  dataSource: AlbumModel[] = [];
  isLoading = true;
  private subscriptions = new Subscription();

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchLibraryAlbums( 0 );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchLibraryAlbums( offset: number ): void {
    this.subscriptions.add(
      this.apiService.fetchLibraryAlbums( offset ).subscribe( data => {
        if ( data.length ) {
          this.dataSource = this.dataSource.concat( data );
          this.isLoading = false;
          this.fetchLibraryAlbums( offset + 100 );
        }
      })
    );
  }

}
