import { Component, Input } from '@angular/core';
import { AlbumModel } from 'src/app/models/album-model';

@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.scss']
})
export class AlbumPreviewComponent {

  @Input() albumData: AlbumModel;

  constructor() { }

}
