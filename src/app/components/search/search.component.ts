import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isSearchingLibrary = false;
  isLoading = false;
  songResults = [];
  albumResults = [];
  artistResults = [];
  playlistResults = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  onSearch( query: string ): void {
    if ( !query ) {
      return;
    }
    this.isLoading = true;
    if ( this.isSearchingLibrary ) {
      this.apiService.searchLibrary( query ).subscribe( results => {
        this.songResults = results['library-songs'] ? results['library-songs']['data'] : [];
        this.albumResults = results['library-albums'] ? results['library-albums']['data'] : [];
        this.artistResults = results['library-artists'] ? results['library-artists']['data'] : [];
        this.playlistResults = results['library-playlists'] ? results['library-playlists']['data'] : [];
        this.isLoading = false;
      });
    } else {
      this.apiService.search( query ).subscribe( results => {
        this.songResults = results['songs'] ? results['songs']['data'] : [];
        this.albumResults = results['albums'] ? results['albums']['data'] : [];
        this.artistResults = results['artists'] ? results['artists']['data'] : [];
        this.playlistResults = results['playlists'] ? results['playlists']['data'] : [];
        this.isLoading = false;
      });
    }
  }
}
