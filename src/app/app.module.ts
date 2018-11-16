import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackControlsComponent } from './components/track-controls/track-controls.component';

import { MatButtonModule, MatIconModule, MatSliderModule, MatListModule, MatRippleModule, MatFormFieldModule,
        MatSidenavModule, MatToolbarModule, MatCardModule, MatProgressSpinnerModule,
        MatTableModule, MatMenuModule, MatInputModule, MatButtonToggleModule, MatTabsModule } from '@angular/material';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LibrarySongsComponent } from './components/library/library-songs/library-songs.component';
import { LibraryAlbumsComponent } from './components/library/library-albums/library-albums.component';
import { QueueComponent } from './components/queue/queue.component';
import { FormatArtworkUrlPipe } from './pipes/format-artwork-url.pipe';
import { FormatSecondsPipe } from './pipes/format-seconds.pipe';
import { FormatMillisecondsPipe } from './pipes/format-milliseconds.pipe';
import { FormatMillisecondsToTextPipe } from './pipes/format-milliseconds-to-text.pipe';

import { PlayerService } from './services/player.service';
import { MusicKitService } from './services/musicKit.service';
import { ApiService } from './services/api.service';
import { SongComponent } from './components/song/song.component';
import { AlbumComponent } from './components/album/album.component';
import { SearchComponent } from './components/search/search.component';
import { AlbumPreviewComponent } from './components/album-preview/album-preview.component';
import { LibraryArtistsComponent } from './components/library/library-artists/library-artists.component';
import { ArtistPreviewComponent } from './components/artist-preview/artist-preview.component';
import { ArtistComponent } from './components/artist/artist.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackControlsComponent,
    SidebarComponent,
    LibrarySongsComponent,
    LibraryAlbumsComponent,
    QueueComponent,
    FormatArtworkUrlPipe,
    FormatSecondsPipe,
    FormatMillisecondsPipe,
    FormatMillisecondsToTextPipe,
    SongComponent,
    AlbumComponent,
    SearchComponent,
    AlbumPreviewComponent,
    LibraryArtistsComponent,
    ArtistPreviewComponent,
    ArtistComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
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
