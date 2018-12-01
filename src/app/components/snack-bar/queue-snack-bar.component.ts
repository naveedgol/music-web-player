import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-queue-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QueueSnackBarComponent {
  text = 'Queue updated';
}
