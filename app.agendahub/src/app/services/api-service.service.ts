import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, Subject, catchError, map, of, take, finalize } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/auth-service.service';
import { ErrorDto } from '../models/dtos/dtos';
import { ErrorHandler } from '../utils/error';

export type QueryParams = Record<string, string | number | boolean | ReadonlyArray<string | number | boolean > | Array<number|string>>;

@Injectable({providedIn: 'root'})
export class ApiService {

  
  private baseUrl = environment.apiUrl;
  private cache!: Map<string, any>;
  private offline = new Subject();

  constructor(private httpClient: HttpClient, private loader: LoaderService, private localStorage: LocalStorageService, private messageService: MessageService, private auth: AuthService) {
    // console.log(this.isConnect);

    setInterval(() => {
      this.isConnect
    }, 333);
  }

  public connected!: boolean;

  private get isConnect() {
    if (!this.connected && navigator.onLine) {
      this.offline.next(false);
    }
    
    if (this.connected && !navigator.onLine) {
      this.offline.next(true);
    } 
    
    this.connected = navigator.onLine
    return this.connected;
  }

  public requestFromApi<T = any>(endpoint: string, params: QueryParams | null = null, load = true) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    load && this.loader.show()

    return this.httpClient.get<T>(apiUrl, params ? {params: params} : undefined).pipe(finalize(() => this.loader.hide())).pipe(map(result => {
      load && this.loader.hide();
      return result;
    }), catchError(err => {
      ErrorHandler.templateError(err, this.messageService, this.auth);
      throw err;
    }));
  }

  public sendToApi<T = any, R = any>(endpoint: string, body: T, load = true) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    load && this.loader.show()

    return this.httpClient.post<R>(apiUrl, body).pipe(take(1)).pipe(finalize(() => this.loader.hide())).pipe(map(result => {
      load && this.loader.hide();
      return result;
    }), catchError(err => {
      ErrorHandler.templateError(err, this.messageService, this.auth);
      throw err;
    }));
  }

  public updateToApi(endpoint: string, body?: any, params: QueryParams|null = null, load = true) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    load && this.loader.show()

    return this.httpClient.put(apiUrl, body, params ? {params: params}: undefined).pipe(take(1)).pipe(finalize(() => this.loader.hide())).pipe(map(result => {
      load && this.loader.hide();
      return result;
    }), catchError(err => {
      ErrorHandler.templateError(err, this.messageService, this.auth);
      throw err;
    }));
  }

  public deleteFromApi(endpoint: string, params?: any, load = true) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    load && this.loader.show()

    return this.httpClient.delete(apiUrl, params ? {params: params} : undefined).pipe(take(1)).pipe(finalize(() => this.loader.hide())).pipe(map(result => {
      load && this.loader.hide();
      return result;
    }), catchError(err => {
      ErrorHandler.templateError(err, this.messageService, this.auth);
      throw err;
    }));
  }

  public addSubscriber(sub: PushSubscription) {
    this.loader.show()
    
    const subscription = {
      id: 0,
      subscriptionObject: JSON.stringify(sub),
      user : this.localStorage.get("user")
    }
    
    return this.httpClient.post(this.baseUrl + "User/Subscribe", subscription).pipe(take(1)).pipe(map(result => {
      this.loader.hide();
      return result;
    }), catchError(err => {
      this.loader.hide();
      ErrorHandler.templateError(err, this.messageService, this.auth);
      return err;
    }));
  }

}