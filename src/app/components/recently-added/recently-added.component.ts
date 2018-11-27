import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss']
})
export class RecentlyAddedComponent {

  dataSource = [];
  isLoading = true;

  constructor(private apiService: ApiService) {
    this.fetchRecentlyAdded( 0 );
  }

  fetchRecentlyAdded( offset: number ): void {
    this.apiService.fetchRecentlyAdded( offset ).subscribe( data => {
      if ( data.length ) {
        this.dataSource = this.dataSource.concat( data );
        this.isLoading = false;
        this.fetchRecentlyAdded( offset + 10 );
      }
    });
  }

}
