import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackControlsComponent } from './track-controls/track-controls.component';

import { MatButtonModule, MatIconModule, MatSliderModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LibrarySongsComponent } from './library-songs/library-songs.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackControlsComponent,
    SidebarComponent,
    LibrarySongsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
