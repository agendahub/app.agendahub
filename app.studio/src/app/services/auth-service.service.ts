import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LoaderService } from './loader.service';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged = false;
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService, private loader: LoaderService) { }

  public get isLogged () {
    return this.logged;
  }

  public get Token() {
    return this.localStorage.get("token");
  }

  public set Token(token: any) {
    this.localStorage.set("token", token);
  }
  
  public login(login: string, password: string) {
    const loginModel = {
      login: login,
      password: password
    }

    this.loader.show()

    return this.httpClient.post(this.baseUrl + "Auth/Login", loginModel).pipe(map(r => {
      this.Token = r;
      this.loader.hide();
      return r
    }))
  }

  public logout() {
    this.Token = null;
  }

}
