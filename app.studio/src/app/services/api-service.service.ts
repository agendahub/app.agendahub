import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, map, of, take } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({providedIn: 'root'})
export class ApiService {

  
  private baseUrl = environment.apiUrl;
  private cache!: Map<string, any>;
  private offline = new Subject();

  constructor(private httpClient: HttpClient) {
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

  public addSubscriber(sub: PushSubscription) {
    const subscription = {
      id: 0,
      subscriptionObject: JSON.stringify(sub),
      user :  {
        "id": 2,
        "name": "Felipe",
        "surname": "Eumermo",
        "email": "felipe@eumermo.com",
        "phone": "123456",
        "dateBirth": "2003-01-18T01:54:37.767",
        "userType": {
          "id": 1,
          "code": "dev",
          "description": "Desenvolvedor"
        }
      }
    }

    console.log(subscription);
    

    return this.httpClient.post(this.baseUrl + "User/Subscribe", subscription);
  }
  
}
