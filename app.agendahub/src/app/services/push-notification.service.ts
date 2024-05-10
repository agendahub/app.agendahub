import { Injectable } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { firstValueFrom } from "rxjs";
import { ApiService } from "./api-service.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root",
})
export class PushNotificationService {
  private key = "BAwfgA_E-bbitMvcqqTcLNdnuf791ao155OSQwIRWjgjC-tudLhN7MgdFXpcxqk2czp27DvqwkQ5qguX6gaoDiE";
  swPushpayload: any;

  constructor(private swPush: SwPush, private api: ApiService, private localSS: LocalStorageService) {}

  subscribeToNotifications(): void {
    if (this.swPush.isEnabled) {
      console.log(this.key);

      this.swPush
        .requestSubscription({
          serverPublicKey: this.key,
        })
        .then((sub: PushSubscription) => {
          this.saveSubscription(sub);
          this.storeSubscription(sub);
          this.subscribeMessage();
        })
        .catch((err: any) => console.error("Could not subscribe to notifications", err));
    }
  }

  unsubscribeFromPushNotifications(): void {
    this.swPush
      .unsubscribe()
      .then(() => {
        console.log("Unsubscribed from push notifications.");
      })
      .catch((error) => {
        console.error("Error unsubscribing from push notifications:", error);
      });
  }

  subscribeMessage(): void {
    this.swPush.messages.subscribe((res: any) => {
      console.log("Received push notification", res);
    });
  }

  private async saveSubscription(sub: PushSubscription): Promise<void> {
    // Send the subscription object to your server for storing
    // You can make an HTTP request or use any other method to send the subscription data to your server
    console.log(this.retrievePushObject(sub));
    await firstValueFrom(this.api.sendToApi("Notification/Subscribe", this.retrievePushObject(sub)));
  }

  private storeSubscription(sub: PushSubscription): void {
    // Store the subscription in local storage or any other storage mechanism
    this.localSS.set("push-subscription", this.retrievePushObject(sub));
  }

  private retrievePushObject(sub: PushSubscription) {
    return JSON.parse(JSON.stringify(sub));
  }
}
