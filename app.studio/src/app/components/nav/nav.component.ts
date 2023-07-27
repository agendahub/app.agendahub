import { Component } from '@angular/core';
import { PushNotificatorService } from '../../services/push-notificator.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  sidebarOpen = false;

  constructor(private pushService: PushNotificatorService) {}

  pushOn() {
    this.pushService.subscribeToNotifications()
  }

}
