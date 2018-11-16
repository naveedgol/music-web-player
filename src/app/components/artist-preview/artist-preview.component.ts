import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-artist-preview',
  templateUrl: './artist-preview.component.html',
  styleUrls: ['./artist-preview.component.scss']
})
export class ArtistPreviewComponent implements OnInit {

  @Input() artistData;

  constructor() { }

  ngOnInit() {
  }

}
