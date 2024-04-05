import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, effect, signal } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification, NotificationState, NotificationType } from '../../models/core/notification';
import { Subscription } from 'rxjs';

@Component({
  selector: 'notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  bubble: number = 0; 
  _open: boolean = false;
  messages: Notification[] = []; 

  tab!: NotificationState | number;
  displayMessages: Notification[] = [];

  private subscription!: Subscription

  @Input()
  get open(): boolean { 
    return this._open; 
  };
  set open(value: boolean) {
    this._open = value;
  }

  @Output()
  openChange = new EventEmitter<boolean>();

  constructor(private notify: NotificationService) { }

  set(tab: NotificationState | number) {
    this.tab = tab;
    console.log(tab);
    
    this.displayMessages = this.messages.filter((m) => m.state === tab);
  }

  ngOnInit(): void {
    this.set(NotificationState.Unread);
    this.subscription = this.notify.notifications.subscribe((notifications) => {
      this.bubble = notifications.filter((n) => n.state === NotificationState.Unread).length;
      this.displayMessages = notifications;
      // this.set(this.tab);
      console.log(this.messages, this.displayMessages);
      
    });

    this.notify.preview().subscribe((notifications) => {
      this.messages = notifications;
      // this.displayMessages = notifications;
      this.set(this.tab);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClose() {
    this.open = false;
    this.openChange.emit(false);
  }

}
