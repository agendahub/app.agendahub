import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Notification, NotificationStatus } from '../models/core/notification';
import { environment } from '../../environments/environment.development';
type BrowserNotification = Notification;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private $notifications = new BehaviorSubject<Notification[]>([]);

  notifications = this.$notifications.asObservable();

  error = signal<{message: string} | null>(null);
  connected = signal<boolean>(false);
  unread = signal<number>(0);

  constructor(private http: HttpClient) {
    // this.listen();
  }

  preview() {
    return this.http.get<Notification[]>(environment.apiUrl + "Notification/GetPreview").pipe(map((notifications) => {
      this.unread.set(notifications.filter((n) => n.status === NotificationStatus.Unread).length);
      return notifications;
    }));
  }

  read(id: number) {
    return this.http.put(environment.apiUrl + "Notification/Read/" + id, null)
      .pipe(map((x) => {
        this.unread.update((unread) => unread - 1);
        return x;
      }));
  }

  readAll() {
    return this.http.put(environment.apiUrl + "Notification/ReadAll", null)
      .pipe(map((x) => {
        this.unread.set(0);
        return x;
      }));
  }

  private listen() {
    const event = new EventSource(environment.apiUrl + "notifications");

    event.onopen = () => {
      console.log("Connected to notifications server");
      
      this.connected.set(true);
    }

    event.onmessage = (event) => {
      const notification: Notification[] = Array.from([JSON.parse(event.data)]);
      this.unread.update((unread) => unread + 1);
      this.$notifications.next(this.$notifications.value.concat(notification));
    }

    event.onerror = (error) => {
      console.log("Failed to connect to notifications server", error);
      
      this.error.set({message: "Não foi possível conectar ao servidor de notificações"});
    }
  }

}
