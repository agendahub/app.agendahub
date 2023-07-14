import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, map, of, take } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({providedIn: 'root'})
export class ApiService {

  baseUrl = environment.apiUrl;
  cache!: Map<string, any>
  offline = new Subject();

  constructor(private httpClient: HttpClient) {
    console.log(this.isConnect);

    setInterval(() => {
      this.isConnect
    }, 333);
  }

  private connected!: boolean;

  get isConnect() {
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

    if (query) {
      apiUrl += query;
    }

    if (!this.isConnect) {
      return null;
    } else
    return this.httpClient.get<T>(apiUrl).pipe(take(1))
  }

  public sendToApi(endpoint: string, body: any) {
    let apiUrl = this.baseUrl + `${endpoint}`;

    if (!this.isConnect) {
      return null;
    } else 
    return this.httpClient.post(apiUrl, body).pipe(take(1))
  }

  public deleteFromApi(endpoint: string, query?: any) {
    let apiUrl = this.baseUrl + `${endpoint}`;

    if (query) {
      apiUrl += query;
    }

    if (!this.isConnect) {
      return null;
    } else
    return this.httpClient.delete(apiUrl).pipe(take(1));
  }
  
}
