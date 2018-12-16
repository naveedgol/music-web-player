import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(
    private helpBottomSheetRef: MatBottomSheetRef<HelpComponent>,
  ) { }

  ngOnInit() {
  }

  helpDismiss() {
    this.helpBottomSheetRef.dismiss();
  }
}
