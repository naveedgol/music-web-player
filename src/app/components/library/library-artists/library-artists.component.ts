import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-library-artists',
  templateUrl: './library-artists.component.html',
  styleUrls: ['./library-artists.component.scss']
})
export class LibraryArtistsComponent implements OnInit, OnDestroy {

  dataSource = [];
  isLoading = true;
  private subscriptions = new Subscription();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.fetchLibraryArtists( 0 );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchLibraryArtists( offset: number ): void {
    this.subscriptions.add(
      this.apiService.fetchLibraryArtists( offset ).subscribe( data => {
        if ( data.length ) {
          this.dataSource = this.dataSource.concat( data );
          this.isLoading = false;
          this.fetchLibraryArtists( offset + 100 );
        }
      })
    );
  }

}
