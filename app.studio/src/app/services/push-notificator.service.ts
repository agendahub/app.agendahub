import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable, take } from 'rxjs';
import { ApiService } from './api-service.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PushNotificatorService {

  private VAPID_PUBLIC_KEY!: string

  constructor(
      private localStorage: LocalStorageService,
      private apiService: ApiService,
      private swPush: SwPush) {
      }

  async getVapidKey() {
    return new Promise<string>((res, rej) => {
      if (this.VAPID_PUBLIC_KEY && this.VAPID_PUBLIC_KEY.length != 0) {
        res(this.VAPID_PUBLIC_KEY);
      } else {
        this.apiService.requestFromApi("User/VapidKey")?.subscribe(x => {
          if (x && x.publicKey && x.publicKey.trim().length > 1) {
            this.VAPID_PUBLIC_KEY = x.publicKey;
            res(this.VAPID_PUBLIC_KEY);
          } else {
            rej("Erro ao buscar vapid key atualizada");
          }
        })
      }
    });
  }

  async subscribeToNotifications() {
      console.debug("Try subscribe push");

      this.swPush.requestSubscription({ serverPublicKey: await this.getVapidKey() })
      .then(sub => this.apiService.addSubscriber(sub).subscribe(x => console.log(x)))
      .catch(err => console.error("Could not subscribe to notifications ", err));

      this.swPush.messages.forEach(x => {
        console.log(x);
      })
  }


}
