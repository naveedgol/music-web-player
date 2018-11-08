import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrarySongsComponent } from './library-songs/library-songs.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
