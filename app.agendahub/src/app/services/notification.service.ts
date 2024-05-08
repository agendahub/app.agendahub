import { HttpClient } from "@angular/common/http";
import { HostListener, Injectable, OnDestroy, signal } from "@angular/core";
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source";
import { BehaviorSubject, map, of } from "rxjs";
import { environment } from "../../environments/environment.development";
import { AuthService } from "../auth/auth-service.service";
import { Notification, NotificationStatus } from "../models/core/notification";
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

  constructor(private http: HttpClient, private auth: AuthService) {
    console.log("Notification service created");
    if (this.auth.isLogged) {
      this.listen();
    }
  }

  @HostListener("window:beforeunload")
  async ngOnDestroy() {
    console.log("Disconnecting from notifications server");

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
      headers: {
        Authorization: `Bearer ${this.auth.Token}`,
      },
      onopen: async (x) => {
        console.log("Connected to notifications server");
        this.connected.set(true);
      },
      onmessage: async (event) => this.handleMessage(event),
      onclose: () => {
        this.control.abort();
        throw new Error();
      },
      onerror: (error) => {
        this.control.abort();
        console.log("Failed to connect to notifications server", error);
        this.error.set({
          message: "Não foi possível conectar ao servidor de notificações",
        });
      },
    });
  }

  private handleMessage(event: EventSourceMessage) {
    console.log("Received notification \n", event);
    const data = JSON.parse(event.data);
    console.log(data);

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
