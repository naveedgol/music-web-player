import { Component, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss']
})
export class RecentlyAddedComponent implements OnDestroy {

  dataSource = [];
  isLoading = true;
  private subscriptions = new Subscription();

  constructor(private apiService: ApiService) {
    this.fetchRecentlyAdded( 0 );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchRecentlyAdded( offset: number ): void {
    this.subscriptions.add(
      this.apiService.fetchRecentlyAdded( offset ).subscribe( data => {
        if ( data.length ) {
          this.dataSource = this.dataSource.concat( data );
          this.isLoading = false;
          this.fetchRecentlyAdded( offset + 10 );
        }
      })
    );
  }

}
