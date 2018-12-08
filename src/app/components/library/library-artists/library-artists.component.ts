import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-library-artists',
  templateUrl: './library-artists.component.html',
  styleUrls: ['./library-artists.component.scss']
})
export class LibraryArtistsComponent implements OnInit, OnDestroy {

  alphaGroups = new Map();
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
          for ( const artist of data ) {
            let key = '#';
            if ( /^[A-Z]$/i.test(artist.attributes.name[0]) ) {
              key = artist.attributes.name[0].toUpperCase();
            }

            if ( !this.alphaGroups.has(key) ) {
              this.alphaGroups.set(key, []);
            }

            this.alphaGroups.get(key).push(artist);
          }
          this.isLoading = false;
          this.fetchLibraryArtists( offset + 100 );
        }
      })
    );
  }

}
