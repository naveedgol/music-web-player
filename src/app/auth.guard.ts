import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MusicKitService } from './services/musicKit.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private musicKitService: MusicKitService,
    private router: Router
  ) {

  }

  canActivate(): boolean {
    if ( this.musicKitService.isAuthorized ) {
      return true;
    }

    this.router.navigate(['/browse']);
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
