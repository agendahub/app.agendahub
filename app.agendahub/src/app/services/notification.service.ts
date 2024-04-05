import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../models/core/notification';
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
    return this.http.get<Notification[]>(environment.apiUrl + "Notification/GetPreview");
  }

  private listen() {
    const event = new EventSource(environment.apiUrl + "notifications");

    event.onopen = () => {
      console.log("Connected to notifications server");
      
      this.connected.set(true);
    }

    event.onmessage = (event) => {
      const notification: Notification[] = Array.from([JSON.parse(event.data)]);
      this.unread.set(notification.filter((n) => n.state === 0).length);
      this.$notifications.next(this.$notifications.value.concat(notification));
    }

    event.onerror = (error) => {
      console.log("Failed to connect to notifications server", error);
      
      this.error.set({message: "Não foi possível conectar ao servidor de notificações"});
    }
  }

}
