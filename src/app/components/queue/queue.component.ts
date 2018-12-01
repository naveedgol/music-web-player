import { Component } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent {

  constructor(
    public playerService: PlayerService,
    private router: Router) { }

  close(): void {
    this.router.navigate([{ outlets: { popup: null }}]);
  }

  playSong( index ): void {
    this.playerService.changeQueuePosition( index );
  }

  removeSong( index ): void {
    this.playerService.removeFromQueue( index );
  }
}
