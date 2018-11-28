import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrarySongsComponent } from './components/library/library-songs/library-songs.component';
import { LibraryAlbumsComponent } from './components/library/library-albums/library-albums.component';
import { QueueComponent } from './components/queue/queue.component';
import { AlbumComponent } from './components/album/album.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistComponent } from './components/artist/artist.component';
import { LibraryArtistsComponent } from './components/library/library-artists/library-artists.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { RecentlyAddedComponent } from './components/recently-added/recently-added.component';
import { ForYouComponent } from './components/for-you/for-you.component';
import { BrowseComponent } from './components/browse/browse.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/browse'
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'for-you',
    component: ForYouComponent
  },
  {
    path: 'browse',
    component: BrowseComponent
  },
  {
    path: 'library',
    children: [
      {
        path: 'recently-added',
        component: RecentlyAddedComponent
      },
      {
        path: 'songs',
        component: LibrarySongsComponent
      },
      {
        path: 'albums',
        children: [
          {
            path: ':id',
            component: AlbumComponent
          },
          {
            path: '',
            component: LibraryAlbumsComponent
          }
        ]
      },
      {
        path: 'artists',
        children: [
          {
            path: ':id',
            component: ArtistComponent
          },
          {
            path: '',
            component: LibraryArtistsComponent
          }
        ]
      },
      {
        path: 'playlists',
        children: [
          {
            path: ':id',
            component: PlaylistComponent
          }
        ]
      }
    ]
  },
  {
    path: 'albums',
    children: [
      {
        path: ':id',
        component: AlbumComponent
      },
      {
        path: '',
        redirectTo: '/library/albums',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'playlists',
    children: [
      {
        path: ':id',
        component: PlaylistComponent
      }
    ]
  },
  {
    path: 'artists',
    children: [
      {
        path: ':id',
        component: ArtistComponent
      },
      {
        path: '',
        redirectTo: '/library/albums',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'queue',
    component: QueueComponent,
    outlet: 'popup'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
