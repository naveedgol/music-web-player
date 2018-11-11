import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrarySongsComponent } from './components/library/library-songs/library-songs.component';
import { QueueComponent } from './components/queue/queue.component';

const routes: Routes = [
  { path: '',   redirectTo: '/library/songs', pathMatch: 'full' },
  {
    path: 'library',
    children: [
      {
        path: 'songs',
        component: LibrarySongsComponent
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
