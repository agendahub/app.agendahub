import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfirmationService } from "primeng/api";
import { firstValueFrom } from "rxjs";
import { ApiService } from "../../../../services/api-service.service";
import { PushNotificationService } from "../../../../services/push-notification.service";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent {
  form!: FormGroup;
  state: any;

  constructor(private settings: SettingsService, private fb: FormBuilder, private confirm: ConfirmationService, private api: ApiService, private push: PushNotificationService) {}

  async ngOnInit() {
    this.buildForm();
    this.state = await this.settings.state("Notifications");
    console.log(this.state);

    this.form.patchValue(this.state);
  }

  buildForm() {
    this.form = this.fb.group({
      emailNotifications: [],
      emailNewCustomerWithoutSchedule: [],
      pushNotifications: [],
      pushScheduleChanges: [],
      pushScheduleDay: [],
    });
  }

  requestPermission() {
    this.confirm.confirm({
      key: "notificationDialog",
      message: "Deseja receber notificações?",
      accept: () => {
        console.log("Accept");
        this.push.subscribeToNotifications();
      },
      reject: () => {
        console.log("Reject");
        // this.push.unsubscribeFromPushNotifications();
      },
    });
  }

  async save() {
    const data = { ...this.form.value, id: this.state.id, userId: this.state.userId };
    await firstValueFrom(this.api.updateToApi("User/UpdatePreferences", data));
    this.settings.save("Notifications", data, true);
  }
}
