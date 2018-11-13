import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrarySongsComponent } from './components/library/library-songs/library-songs.component';
import { LibraryAlbumsComponent } from './components/library/library-albums/library-albums.component';
import { QueueComponent } from './components/queue/queue.component';
import { AlbumComponent } from './components/album/album.component';

const routes: Routes = [
  {
    path: 'library',
    children: [
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
