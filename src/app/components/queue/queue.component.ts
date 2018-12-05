import { Component, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent {

  @Output() uponClose: EventEmitter<any> = new EventEmitter();

  constructor(
    public playerService: PlayerService,
    private router: Router) { }

  close(): void {
    this.uponClose.emit();
  }

  playSong( index ): void {
    this.playerService.changeQueuePosition( index );
  }

  removeSong( index ): void {
    this.playerService.removeFromQueue( index );
  }
}
