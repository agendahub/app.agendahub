import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, map, of, take } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({providedIn: 'root'})
export class ApiService {

  
  private baseUrl = environment.apiUrl;
  private cache!: Map<string, any>;
  private offline = new Subject();

  constructor(private httpClient: HttpClient, private loader: LoaderService, private localStorage: LocalStorageService) {
    console.log(this.isConnect);

    setInterval(() => {
      this.isConnect
    }, 333);
  }

  private connected!: boolean;

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

  public requestFromApi<T = any>(endpoint: string, query?: string) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    this.loader.show()

    if (query) {
      apiUrl += query;
    }

    if (!this.isConnect) {
      return null;
    } else
    return this.httpClient.get<T>(apiUrl).pipe(map(result => {
      this.loader.hide();
      console.log(result);
      
      return result;
    }));
  }

  public sendToApi(endpoint: string, body: any) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    this.loader.show()

    if (!this.isConnect) {
      return null;
    } else 
    return this.httpClient.post(apiUrl, body).pipe(take(1)).pipe(map(result => {
      this.loader.hide();
      return result;
    }));
  }

  public deleteFromApi(endpoint: string, query?: any) {
    let apiUrl = this.baseUrl + `${endpoint}`;
    this.loader.show()

    if (query) {
      apiUrl += query;
    }

    if (!this.isConnect) {
      return null;
    } else
    return this.httpClient.delete(apiUrl).pipe(take(1)).pipe(map(result => {
      this.loader.hide();
      return result;
    }));
  }

  public addSubscriber(sub: PushSubscription) {
    this.loader.show()
    
    const subscription = {
      id: 0,
      subscriptionObject: JSON.stringify(sub),
      user : this.localStorage.get("user")
    }

    console.log(subscription);
    
    return this.httpClient.post(this.baseUrl + "User/Subscribe", subscription);
  }
  
}
