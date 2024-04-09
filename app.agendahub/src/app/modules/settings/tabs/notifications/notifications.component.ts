import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  
  constructor(private settings: SettingsService) { }

  ngOnInit(): void {
    this.settings.state('Notifications')
  }


}
