import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-service.service';
import { MenuItem } from 'primeng/api';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private service: SettingsService) { }

  items: MenuItem[] = [];
  item: MenuItem | undefined;

  ngOnInit() {
    this.items = [
        {  label: 'Gerais', icon: 'fa-solid fa-globe mr-1', routerLink: 'general', replaceUrl: false, id: 'General'},
        {  label: 'Notificações', icon: 'fa-solid fa-bell mr-1', routerLink: 'notifications', replaceUrl: false, id: 'Notifications'},
        {  label: 'Agendamentos', icon: 'fa-solid fa-clock mr-1', routerLink: 'appointments', replaceUrl: false, id: 'Appointments'},
    ];

    this.service.locks().subscribe((lock) => {
      if (lock) {
        const item = this.items.find(item => item.id === lock);
        this.items = this.items.filter(item => item.id !== lock).map(x => ({...x, disabled: true}));
        this.items.push({...item, disabled: false});
      } else {
        this.items = this.items.map(x => ({...x, disabled: false}));
      }
    })

  }

}
