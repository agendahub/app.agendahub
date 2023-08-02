import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { LoaderService } from '../services/loader.service';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged = false;
  private baseUrl = environment.apiUrl;

  constructor(
    private loader: LoaderService,
    private httpClient: HttpClient,
    private jwt: JwtHelperService,
    private localStorage: LocalStorageService,
    ) { }

  public get isLogged () {
    this.logged = this.Token != null && this.Token != undefined && this.Token != "undefined";
    return this.logged;
  }

  public get Token() {
    return this.localStorage.get("token");
  }

  public set Token(token: any) {

    if (!token) {
      this.logged = false
    } else {
      this.logged = true
    }

    this.localStorage.set("token", token);
  }

  public get TokenData() {
    
    return this.jwt.decodeToken();
  }

  private get ExpiresIn() {
    return this.jwt.getTokenExpirationDate()
  }

  private get IsValid() {
    return this.jwt.isTokenExpired(this.Token)
  }
  
  public login(login: string, password: string) {
    const loginModel = {
      login: login,
      password: password
    }

    this.loader.show()

    return this.httpClient.post(this.baseUrl + "Auth/Login", loginModel).pipe(map((r: any) => {
      console.log(r);
      this.Token = r.token;
      this.loader.hide();

      return r
    }))
  }

  public logout() {
    this.Token = null;
  }

  private check () {
    try {
      this.httpClient.get(this.baseUrl + "Auth/Check").subscribe()
    } catch (error) {
      this.Token = null;
    }
  }

}
