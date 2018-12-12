import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened = false;
  mode = 'side';
  isMobile = false;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      if (result.matches) {
        this.opened = false;
        this.mode = 'over';
        this.isMobile = true;
      } else {
        this.opened = true;
        this.mode = 'side';
        this.isMobile = false;
      }
    });
  }
}
