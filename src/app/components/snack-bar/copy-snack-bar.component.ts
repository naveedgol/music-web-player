import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-copy-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CopySnackBarComponent {
  text = 'Link copied to clipboard';
}
