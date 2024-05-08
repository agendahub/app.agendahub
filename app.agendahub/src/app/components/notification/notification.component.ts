import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { Component, ElementRef, HostListener, OnDestroy, OnInit, Signal, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import * as moment from "moment";
import { Subscription, firstValueFrom } from "rxjs";
import { Forgetable } from "../../core/forgetable";
import { Notification, NotificationStatus } from "../../models/core/notification";
import { NotificationService } from "../../services/notification.service";
import { PushNotificationService } from "../../services/push-notification.service";
import { ScreenHelperService } from "../../services/screen-helper.service";

@Component({
  selector: "notifications",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent extends Forgetable implements OnInit, OnDestroy {
  forkM = moment;
  opened: boolean = false;
  messages: Notification[] = [];

  tab!: NotificationStatus | number;
  displayMessages: Notification[] = [];
  temporalMessages!: Array<{
    key: string;
    viewName: string;
    value: Notification[];
  }>;

  private subscription!: Subscription;
  private mobileOverlay!: OverlayRef;

  saving: boolean = false;
  connected!: Signal<boolean>;

  @ViewChild("ref") elementRef!: TemplateRef<any>;
  @ViewChild("wrapper") wrapperRef!: ElementRef<HTMLDivElement>;

  constructor(
    public notify: NotificationService,
    private overlay: Overlay,
    private view: ViewContainerRef,
    public help: ScreenHelperService,
    private webPush: PushNotificationService,
  ) {
    super();
    moment.locale("pt-br");
  }

  public override forget(): void {
    this.opened = false;
  }

  @HostListener("document:click", ["$event"])
  clickout(event: MouseEvent) {
    if (!this.wrapperRef.nativeElement.contains(event.target as Node) && !this.mobileOverlay) {
      this.opened = false;
    }
  }

  ngOnInit(): void {
    this.set(NotificationStatus.Unread);

    firstValueFrom(this.notify.preview()).then((notifications) => {
      this.messages = notifications;
      this.set(this.tab);
    });
    this.subscription = this.notify.upcoming.subscribe((notifications) => {
      this.messages = Array.from(new Set([...notifications, ...this.messages]).values());
      this.set(this.tab);
    });

    this.connected = this.notify.connected;
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
        checkExists(date.format("MMMM"), date.format("MMMM").toUpperCapital(), m);
      }
    });
  }

  readAll() {
    this.notify.readAll().subscribe(() => {
      this.messages = this.messages.map((m) => (m.status == NotificationStatus.Unread ? { ...m, status: NotificationStatus.Read } : m));
      this.set(NotificationStatus.Read);
    });
  }

  read(notification: Notification) {
    if (notification.status === NotificationStatus.Unread && !this.saving) {
      this.saving = true;
      this.notify.read(notification.id).subscribe(() => {
        this.messages = this.messages.map((m) => (m.id === notification.id ? { ...m, status: NotificationStatus.Read } : m));
        this.set(this.tab);
        this.saving = false;
      });
    }
  }

  open(event: MouseEvent) {
    event.stopPropagation();

    if (this.opened) {
      this.close();
      return;
    }

    if (this.help.isMobile) {
      this.mobileOverlay = this.overlay.create({ width: "100vw", height: "100vh", scrollStrategy: this.overlay.scrollStrategies.block() });
      let portal = new TemplatePortal(this.elementRef, this.view);
      this.mobileOverlay.attach(portal);
    }

    this.opened = true;
  }

  close() {
    if (this.help.isMobile) {
      this.mobileOverlay.detach();
    }

    this.opened = false;
  }

  webpush() {
    this.webPush.subscribeToNotifications();
  }
}
