import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../../services/notification.service";
import { Notification } from "../../../models/core/notification";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  notifications: Array<Notification> = [];

  constructor(private notify: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  private loadNotifications() {
    this.notify.getNotifications().subscribe((res) => {
      this.notifications = res;
    });
  }
}
