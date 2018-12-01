import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent, MatInput } from '@angular/material';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isSearchingLibrary = false;
  isLoading = false;
  hasQueried = false;
  songResults = [];
  albumResults = [];
  artistResults = [];
  playlistResults = [];
  query = '';
  selectedTabIndex = 0;
  timeout = null;
  numOfResults = 0;
  lastQuery = '';
  @ViewChild('searchInput') searchInput;

  constructor(
    private apiService: ApiService,
    private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.searchInput.nativeElement.focus();
    this.route.queryParams.subscribe( params => {
      this.query = params['q'] ? params['q'] : '';
      this.search();
    });
  }

  onSearch(): void {
    clearTimeout(this.timeout);

    this.timeout = setTimeout( () => {
        this.search();
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            q: this.query,
          }
        });
    }, 600);
  }

  search(): void {
    if ( this.query === '' ) {
      return;
    }
    this.lastQuery = this.query;
    this.hasQueried = true;
    this.isLoading = true;
    if ( this.isSearchingLibrary ) {
      this.apiService.searchLibrary( this.query ).subscribe( results => {
        this.songResults = results['library-songs'] ? results['library-songs']['data'] : [];
        this.albumResults = results['library-albums'] ? results['library-albums']['data'] : [];
        this.artistResults = results['library-artists'] ? results['library-artists']['data'] : [];
        this.playlistResults = results['library-playlists'] ? results['library-playlists']['data'] : [];
        this.numOfResults = this.songResults.length + this.albumResults.length + this.artistResults.length + this.playlistResults.length;
        this.isLoading = false;
      });
    } else {
      this.apiService.search( this.query ).subscribe( results => {
        this.songResults = results['songs'] ? results['songs']['data'] : [];
        this.albumResults = results['albums'] ? results['albums']['data'] : [];
        this.artistResults = results['artists'] ? results['artists']['data'] : [];
        this.playlistResults = results['playlists'] ? results['playlists']['data'] : [];
        this.numOfResults = this.songResults.length + this.albumResults.length + this.artistResults.length + this.playlistResults.length;
        this.isLoading = false;
      });
    }
  }

  playSong( trackIndex: number ): void {
    this.playerService.setQueueFromItems( this.songResults, trackIndex ).subscribe();
  }

  clearSearch(): void {
    this.query = '';
    this.hasQueried = false;
  }
}
