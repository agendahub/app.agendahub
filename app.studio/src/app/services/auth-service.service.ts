import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService, private loader: LoaderService) { }



}
