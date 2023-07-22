import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificatorService {

  readonly VAPID_PUBLIC_KEY = "BNm2RvdTrp3OMyU-MrrwCRKi8LPpjLQqSrxEHG20lceWndqPDnDOI4rxu9OrQJOu62A4mueB93God48gu2hjzqA";

  constructor(
      private swPush: SwPush) {}

  subscribeToNotifications() {

      this.swPush.requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => this.addSubscriber(sub).subscribe())
      .catch(err => console.error("Could not subscribe to notifications ", err));
  }

  addSubscriber(sub: PushSubscription) {
    console.log(sub);
    
    return new Observable();
  }
}
