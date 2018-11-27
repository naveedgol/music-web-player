import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.scss']
})
export class ForYouComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  recommendations = [];
  recentlyPlayed = [];
  heavyRotation = [];

  ngOnInit() {
    this.apiService.fetchRecommendations().subscribe( data => {
      this.recommendations = data;
    });
    this.apiService.fetchRecentPlayed().subscribe( data => {
      this.recentlyPlayed = data;
      console.log(data);
    });
    this.apiService.fetchHeavyRotation().subscribe( data => {
      this.heavyRotation = data;
      console.log(data);
    });
  }

}
