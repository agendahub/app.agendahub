import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, take } from 'rxjs';

@Injectable({providedIn: 'any'})
export class ApiService {

  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public requestFromApi<T = any>(endpoint: string, query?: string) {
    let apiUrl = this.baseUrl + `${endpoint}`;

    if (query) {
      apiUrl += query;
    }

    return this.httpClient.get<T>(apiUrl).pipe(take(1))
  }

  public sendToApi(endpoint: string, body: any) {
    let apiUrl = this.baseUrl + `${endpoint}`;

    return this.httpClient.post(apiUrl, body).pipe(take(1))
  }

  public deleteFromApi(endpoint: string, query?: any): Observable<any> {
    let apiUrl = this.baseUrl + `${endpoint}`;

    if (query) {
      apiUrl += query;
    }

    return this.httpClient.delete(apiUrl).pipe(take(1));
  }
  
}
