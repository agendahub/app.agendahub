import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth-service.service';


@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public auth: AuthService, public router: Router) {}

  private ManagerTypes = ["admin", "developer"];
  
  canActivate(): boolean {
    
    if (!this.auth.isLogged || !this.auth.Token) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

  canActivateChild(): boolean {
    if (!this.auth.isLogged) {
      this.router.navigate(['login']);
      return false;
    } else {
      const userData = this.auth.TokenData

      if (!this.ManagerTypes.includes(userData.role)){
        return false;
      }
    }

    return true;
  }
}