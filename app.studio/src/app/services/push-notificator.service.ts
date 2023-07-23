import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { ApiService } from './api-service.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PushNotificatorService {

  readonly VAPID_PUBLIC_KEY = "BNm2RvdTrp3OMyU-MrrwCRKi8LPpjLQqSrxEHG20lceWndqPDnDOI4rxu9OrQJOu62A4mueB93God48gu2hjzqA";

  constructor(
      private localStorage: LocalStorageService,
      private apiService: ApiService,
      private swPush: SwPush) {}

  subscribeToNotifications() {
      !this.localStorage.get("notificator") &&
      this.swPush.requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => {
        this.apiService.addSubscriber(sub).subscribe(x => console.log(x));
        this.localStorage.set("notificator", true);
        
      })
      .catch(err => {
        this.localStorage.set("notificator", false);
        console.error("Could not subscribe to notifications ", err)
      });

      this.swPush.messages.forEach(x => {
        console.log(x);
      })
  }


}
