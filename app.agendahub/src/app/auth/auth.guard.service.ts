import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from './auth-service.service';
import { Router, CanActivate, CanActivateChild, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanDeactivate<any> {
  
  tokenValid!: boolean
  skipLinks = ["schedule-link"]
  
  constructor(private auth: AuthService, private router: Router, private message: MessageService) {
  }

  private ManagerTypes = ["admin", "developer"];
  
  canActivate(): boolean {
    console.log("[canActivate]" ,!this.auth.isLogged , !this.auth.Token);

    if (this.skipLinks.includes(location.pathname.replaceAll("/", ""))) {
      return true; 
    }
    
    if (!this.auth.isLogged || !this.auth.Token || this.auth.IsValid) {
      return this.auth.back({
        afterNavigate: () => this.message.add({severity: "info", summary: "Login expirado!", detail: "É necessário realizar o login novamente."})
      });
    }

    return true;
  }

  canActivateChild(): boolean {

    if (!this.auth.isLogged) {
      return this.auth.back({
        afterNavigate: () => this.message.add({severity: "info", summary: "Login expirado!", detail: "É necessário realizar o login novamente."})
      });

    } else {
      const userData = this.auth.TokenData

      if (!this.ManagerTypes.includes(userData?.role)){
        return false;
      }
    }

    return true;
  }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.auth.isLogged) {
      return false;
    }

    
    return true;
  }
}
