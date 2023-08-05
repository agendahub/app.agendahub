import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth-service.service';
import { MessageService } from 'primeng/api';


@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  
  tokenValid!: boolean
  
  constructor(private auth: AuthService, private router: Router, private message: MessageService) {
  }

  private ManagerTypes = ["admin", "developer"];
  
  canActivate(): boolean {
    console.log("[canActivate]" ,!this.auth.isLogged , !this.auth.Token);
    
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
}