import { HttpClient } from "@angular/common/http";
import { HostListener, Injectable, OnDestroy, signal } from "@angular/core";
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source";
import { BehaviorSubject, map, of } from "rxjs";
import { environment } from "../../environments/environment.development";
import { AuthService } from "../auth/auth-service.service";
import { Notification, NotificationStatus } from "../models/core/notification";
import { defer } from "../types/typing";
type BrowserNotification = Notification;

@Injectable({
  providedIn: "root",
})
export class NotificationService implements OnDestroy {
  private $notify = new BehaviorSubject<Notification[]>([]);

  upcoming = this.$notify.asObservable();

  error = signal<{ message: string } | null>(null);
  connected = signal<boolean>(false);
  unread = signal<number>(0);

  private control!: AbortController;
  private flow = {
    TIMEOUT: 1000,
    MAX_RETRIES: 10,
  };

  constructor(private http: HttpClient, private auth: AuthService) {
    if (this.auth.isLogged) {
      this.listen();
    }
  }

  @HostListener("window:beforeunload")
  async ngOnDestroy() {
    if (this.control) {
      this.control.abort(0);
    }
  }

  preview() {
    if (!this.auth.isLogged) {
      return of([]);
    }

    return this.http.get<Notification[]>(environment.apiUrl + "Notification/GetPreview").pipe(
      map((notifications) => {
        this.unread.set(notifications.filter((n) => n.status === NotificationStatus.Unread).length);
        return notifications;
      }),
    );
  }

  getNotifications() {
    return this.http.get<Notification[]>(environment.apiUrl + "Notification/GetAll").pipe(
      map((notifications) => {
        this.unread.set(notifications.filter((n) => n.status === NotificationStatus.Unread).length);
        return notifications;
      }),
    );
  }

  read(id: number) {
    return this.http.put(environment.apiUrl + "Notification/Read/" + id, null).pipe(
      map((x) => {
        this.unread.update((unread) => unread - 1);
        return x;
      }),
    );
  }

  readAll() {
    return this.http.put(environment.apiUrl + "Notification/ReadAll", null).pipe(
      map((x) => {
        this.unread.set(0);
        return x;
      }),
    );
  }

  private async listen() {
    this.control = new AbortController();
    await fetchEventSource(environment.apiUrl + "sse/connect", {
      signal: this.control.signal,
      openWhenHidden: true,
      headers: {
        Authorization: `Bearer ${this.auth.Token}`,
      },
      onopen: async (response) => {
        if (response.ok) {
          console.log("Connected to notifications server");
          this.connected.set(true);
        }
      },
      onmessage: async (event) => this.handleMessage(event),
      onclose: () => {
        this.connected.set(false);
        this.control.abort();
      },
      onerror: (error) => {
        this.control.abort();
        this.connected.set(false);
        this.error.set({
          message: "Não foi possível conectar ao servidor de notificações",
        });

        defer(() => {
          if (this.flow.MAX_RETRIES > 0) {
            this.flow.MAX_RETRIES--;
            this.listen();
          }
        }, this.flow.TIMEOUT);

        throw new Error(error);
      },
    });
  }

  private handleMessage(event: EventSourceMessage) {
    console.info("Received notification \n", event);
    const data = JSON.parse(event.data);

    if (!("clientId" in data)) {
      let notification: Notification[];

      if (Array.isArray(data)) {
        notification = data;
      } else {
        notification = [data];
      }

      this.unread.update((unread) => unread + notification.length);
      this.$notify.next(notification);
    }
  }
}
