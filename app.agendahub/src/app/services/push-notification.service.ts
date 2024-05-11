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

  constructor(private swPush: SwPush, private api: ApiService, private localSS: LocalStorageService) {}

  subscribeToNotifications(refresh = false): void {
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.key,
        })
        .then((sub: PushSubscription) => {
          this.saveSubscription(sub, refresh);
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

  private async saveSubscription(sub: PushSubscription, refresh = false): Promise<void> {
    console.log(this.retrievePushObject(sub));
    await firstValueFrom(this.api.sendToApi("Notification/Subscribe", this.retrievePushObject(sub), false));
  }

  private storeSubscription(sub: PushSubscription): void {
    this.localSS.set("push-subscription", this.retrievePushObject(sub));
  }

  private retrievePushObject(sub: PushSubscription) {
    return JSON.parse(JSON.stringify(sub));
  }
}
