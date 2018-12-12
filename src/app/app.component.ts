import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened = false;
  mode = 'side';
  isMobile = false;

  constructor(
    breakpointObserver: BreakpointObserver,
    router: Router
    ) {
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

    router.events.subscribe(event => {
      if ( this.isMobile ) {
        this.opened = false;
      }
    });
  }
}
