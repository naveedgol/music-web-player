import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackControlsComponent } from './track-controls/track-controls.component';

import { MatButtonModule, MatIconModule, MatSliderModule, MatListModule,
        MatSidenavModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LibrarySongsComponent } from './library-songs/library-songs.component';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackControlsComponent,
    SidebarComponent,
    LibrarySongsComponent,
    QueueComponent
  ],
  imports: [
    BrowserAnimationsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
