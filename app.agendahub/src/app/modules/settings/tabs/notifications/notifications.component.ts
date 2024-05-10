import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfirmationService } from "primeng/api";
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

  constructor(private settings: SettingsService, private fb: FormBuilder, private confirm: ConfirmationService, private api: ApiService, private push: PushNotificationService) {}

  ngOnInit(): void {
    this.settings.state("Notifications");
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: [],
      push: [],
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
        this.push.unsubscribeFromPushNotifications();
        console.log("Reject");
      },
    });
  }

  save() {}
}
