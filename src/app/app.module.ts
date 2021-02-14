import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackControlsComponent } from './components/track-controls/track-controls.component';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {ScrollingModule} from '@angular/cdk/scrolling';

import {DragDropModule} from '@angular/cdk/drag-drop';

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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistPreviewComponent } from './components/playlist-preview/playlist-preview.component';
import { LazyLoadDirective } from './directives/lazy-load.directive';
import { RecentlyAddedComponent } from './components/recently-added/recently-added.component';
import { ForYouComponent } from './components/for-you/for-you.component';
import { BrowseComponent } from './components/browse/browse.component';
import { QueueSnackBarComponent } from './components/snack-bar/queue-snack-bar.component';
import { CopySnackBarComponent } from './components/snack-bar/copy-snack-bar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HelpComponent } from './components/help/help.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { AlbumDialogComponent } from './components/dialog/album-dialog.component';

@NgModule({
  entryComponents: [
    QueueSnackBarComponent,
    CopySnackBarComponent,
    SettingsComponent,
    AlbumDialogComponent,
    HelpComponent
  ],
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
    ArtistComponent,
    PlaylistComponent,
    PlaylistPreviewComponent,
    LazyLoadDirective,
    RecentlyAddedComponent,
    ForYouComponent,
    BrowseComponent,
    QueueSnackBarComponent,
    CopySnackBarComponent,
    SettingsComponent,
    HelpComponent,
    AlbumDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ScrollingModule,
    DragDropModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [MusicKitService, PlayerService, ApiService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
