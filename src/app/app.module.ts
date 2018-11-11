import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackControlsComponent } from './components/track-controls/track-controls.component';

import { MatButtonModule, MatIconModule, MatSliderModule, MatListModule, MatRippleModule,
        MatSidenavModule, MatToolbarModule, MatCardModule, MatProgressSpinnerModule, MatTableModule, MatMenuModule } from '@angular/material';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LibrarySongsComponent } from './components/library/library-songs/library-songs.component';
import { QueueComponent } from './components/queue/queue.component';
import { FormatArtworkUrlPipe } from './pipes/format-artwork-url.pipe';
import { FormatSecondsPipe } from './pipes/format-seconds.pipe';
import { FormatMilliSecondsPipe } from './pipes/format-milliseconds.pipe';
import { PlayerService } from './services/player.service';
import { MusicKitService } from './services/musicKit.service';
import { ApiService } from './services/api.service';
import { SongComponent } from './components/song/song.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackControlsComponent,
    SidebarComponent,
    LibrarySongsComponent,
    QueueComponent,
    FormatArtworkUrlPipe,
    FormatSecondsPipe,
    FormatMilliSecondsPipe,
    SongComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MusicKitService, PlayerService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
