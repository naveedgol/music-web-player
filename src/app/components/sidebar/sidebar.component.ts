import { Component } from '@angular/core';
import { MusicKitService } from 'src/app/services/musicKit.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    public musicKitService: MusicKitService
  ) {}

  authorize(): void {
    this.musicKitService.authorize();
  }

  unauthorize(): void {
    this.musicKitService.unauthorize();
  }

}
