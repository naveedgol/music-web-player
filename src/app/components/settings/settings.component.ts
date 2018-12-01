import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MusicKitService } from 'src/app/services/musicKit.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<SettingsComponent>,
    public musicKitService: MusicKitService,
    public playerService: PlayerService
  ) { }

  ngOnInit() {
  }


  unauthorize(): void {
    this.musicKitService.unauthorize();
    this.bottomSheetRef.dismiss();
  }

}
