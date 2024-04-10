import {
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  effect,
  signal,
} from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import {
  Notification,
  NotificationStatus,
  NotificationType,
} from "../../models/core/notification";
import { Subscription } from "rxjs";
import * as moment from "moment";
import { Forgetable } from "../../core/forgetable";

@Component({
  selector: "notifications",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent extends Forgetable implements OnInit, OnDestroy {
  forkM = moment;
  open: boolean = false;
  messages: Notification[] = [];

  tab!: NotificationStatus | number;
  displayMessages: Notification[] = [];
  temporalMessages!: Array<{
    key: string;
    viewName: string;
    value: Notification[];
  }>;

  private subscription!: Subscription;

  saving: boolean = false;

  @ViewChild("ref") elementRef!: ElementRef<HTMLDivElement>;

  constructor(public notify: NotificationService,) {
    super()
    moment.locale("pt-br");
  }

  public override forget(): void {
    this.open = false;
  }

  @HostListener("document:click", ["$event"])
  clickout(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }

  ngOnInit(): void {
    this.set(NotificationStatus.Unread);

    this.notify.preview().subscribe((notifications) => {
      this.messages = notifications;
      this.set(this.tab);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  set(tab: NotificationStatus | number) {
    this.displayMessages = this.messages.filter((m) => m.status === tab);
    this.groupByTemporal();
    this.tab = tab;
  }

  groupByTemporal() {
    this.temporalMessages = new Array();

    const today = moment();

    const checkExists = (key: string, view: string, value: Notification) => {
      const index = this.temporalMessages.findIndex((x) => x.key === key);

      if (index === -1) {
        this.temporalMessages.push({ key, viewName: view, value: [value] });
      } else {
        this.temporalMessages[index].value.push(value);
      }
    };

    this.displayMessages.forEach((m) => {
      const date = moment(m.createdAt);

      if (today.isSame(date, "day")) {
        checkExists("today", "Hoje", m);
      } else if (today.isSame(date, "day")) {
        checkExists("yesterday", "Ontem", m);
      } else if (today.diff(date, "days") <= 7) {
        checkExists("thisWeek", "Essa semana", m);
      } else {
        checkExists(
          date.format("MMMM"),
          date.format("MMMM").toUpperCapital(),
          m
        );
      }
    });
  }

  readAll() {
    this.notify.readAll().subscribe(() => {
      this.messages = this.messages.map((m) =>
        m.status == NotificationStatus.Unread
          ? { ...m, status: NotificationStatus.Read }
          : m
      );
      this.set(NotificationStatus.Read);
    });
  }

  read(notification: Notification) {
    if (notification.status === NotificationStatus.Unread && !this.saving) {
      this.saving = true;
      this.notify.read(notification.id).subscribe(() => {
        this.messages = this.messages.map((m) =>
          m.id === notification.id
            ? { ...m, status: NotificationStatus.Read }
            : m
        );
        this.set(this.tab);
        this.saving = false;
      });
    }
  }
}
