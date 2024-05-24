import { Platform } from "@angular/cdk/platform";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MessageService } from "primeng/api";
import { Subject, finalize, firstValueFrom, map } from "rxjs";
import { environment } from "../../environments/environment.development";
import { LoaderService } from "../services/loader.service";
import { LocalStorageService } from "../services/local-storage.service";
import { Access } from "./acess";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private logged = false;
  private baseUrl = environment.apiUrl;
  public tokenIsValid = new Subject<boolean>();

  constructor(
    private router: Router,
    private loader: LoaderService,
    private jwt: JwtHelperService,
    private httpClient: HttpClient,
    private platform: Platform,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
  ) {
    if (localStorage.get("interval")) {
      this.checkToken();
    }
  }

  public get isLogged() {
    this.logged = this.TokenData != null;
    return this.logged;
  }

  public get Token() {
    return this.localStorage.get("token");
  }

  public set Token(token: any) {
    if (!token) {
      this.logged = false;
    } else {
      this.logged = true;
    }

    this.localStorage.set("token", token);
  }

  public get TokenData() {
    if (this.Token) {
      return this.jwt.decodeToken();
    }
    return null;
  }

  public getUserData() {
    return this.TokenData;
  }

  private get ExpiresIn() {
    if (this.Token) {
      return this.jwt.getTokenExpirationDate();
    }
    return null;
  }

  public get IsValid() {
    const isValid = this.jwt.isTokenExpired(this.Token);

    return isValid;
  }

  public getUserAccess(): Access {
    return this.TokenData?.role;
  }

  public login(login: string, password: string, domain?: string, extras?: Record<string, any>) {
    const loginModel = {
      login: login,
      password: password,
      domain: domain,
    };

    this.loader.show();

    return this.httpClient
      .post(this.baseUrl + "Auth/Login", loginModel, extras ? { params: extras } : undefined)
      .pipe(finalize(() => this.loader.hide()))
      .pipe(
        map((r: any) => {
          this.Token = r.token;

          if (r.token) {
            this.checkToken();
          }

          return r;
        }),
      );
  }

  public logout(fnLogout = () => this.messageService.add({ severity: "info", summary: "Até breve..." })) {
    this.back({
      beforeNavigate: fnLogout,
      afterNavigate: () => (this.Token = null),
      timeout: 1000,
    });
  }

  public canAccess(role: Access) {
    const userRole = this.getUserAccess();
    if (userRole === role) {
      return true;
    }

    return false;
  }

  public async updatePassword(change: { oldPassword: string; newPassword: string; confirmPassword: string }) {
    this.loader.show();
    try {
      return await firstValueFrom(this.httpClient.post(this.baseUrl + "Auth/UpdatePassword", change));
    } catch (error) {
      return error;
    } finally {
      this.loader.hide();
    }
  }

  public async resetPassword(token: string, password: string, email: string) {
    this.loader.show();
    try {
      return await firstValueFrom(this.httpClient.post(this.baseUrl + "Auth/ResetPassword", { token, password, email }));
    } catch (error) {
      return error;
    } finally {
      this.loader.hide();
    }
  }

  public async forgotPassword(email: string) {
    this.loader.show();
    try {
      return await firstValueFrom(this.httpClient.post(this.baseUrl + "Auth/RecoverPassword", { email }));
    } catch (error) {
      return error;
    } finally {
      this.loader.hide();
    }
  }

  public back(navigate?: NavigateOptions) {
    if (navigate && navigate.beforeNavigate) {
      navigate.beforeNavigate();
    }

    setTimeout(
      () => {
        this.router.navigate(["login"]);
        if (navigate && navigate.afterNavigate) {
          navigate.afterNavigate();
        }
      },
      navigate ? navigate.timeout : 456,
    );

    return false;
  }

  public goFourth(navigate: NavigateOptions) {
    if (navigate.beforeNavigate) {
      navigate.beforeNavigate();
    }
    setTimeout(() => {
      if (navigate.target) {
        this.router.navigate([navigate.target]);
      }

      if (navigate.afterNavigate) {
        navigate.afterNavigate();
      }
    }, navigate.timeout);
  }

  interval: any;

  private get intervalRunning() {
    return this.localStorage.get("interval");
  }

  private set intervalRunning(value: boolean) {
    this.localStorage.set("interval", value);
  }

  private checkToken() {
    clearInterval(this.interval);
    this.intervalRunning = true;

    this.interval = setInterval(async () => {
      const now = Date.now();
      const timeRemaining = await this.ExpiresIn;

      if (!timeRemaining) {
        clearInterval(this.interval);
        this.intervalRunning = false;
      }

      const isNeedRefresh = Math.abs(timeRemaining?.getTime()! - now) / 1000 < 100;

      console.log("isNeedRefresh", isNeedRefresh);

      if (this.isLogged && isNeedRefresh) {
        clearInterval(this.interval);
        this.intervalRunning = false;
        this.tryRefreshToken();
      }

      if (!this.isLogged) {
        clearInterval(this.interval);
        this.intervalRunning = false;
      }
    }, 1000);
  }

  public tryRefreshToken() {
    this.httpClient.get(this.baseUrl + "Auth/Refresh").subscribe(
      (x: any) => {
        if (x && x.token) {
          this.Token = x.token;
          this.checkToken();
        }
      },
      (err) => {
        this.back({
          beforeNavigate: () => {
            alert("Sua sessão expirou, por favor, faça login novamente.");
            this.messageService.add({
              severity: "warning",
              summary: "Erro ao atualizar token",
              detail: err,
            });
          },
        });
      },
    );
  }
}

export class NavigateOptions {
  timeout? = 456;
  target?: string;
  beforeNavigate?: () => void;
  afterNavigate?: () => void;
  prompt?: Promise<boolean>;
}
