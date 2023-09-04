import { Component } from '@angular/core';
import { PushNotificatorService } from '../../services/push-notificator.service';
import { AuthService } from '../../auth/auth-service.service';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  sidebarOpen = false;
  faArrowDown = faArrowCircleDown

  showCrudLink = false
  showUserOptions = false;

  userItems: MenuItem[] = [
    {
        label: 'Ações',
        items: [
            {
                label: 'Perfil',
                command: () => {
                    
                }
            },
            {
                label: 'Configurações',
                routerLink: "/settings"
            },
            {
                label: 'Sair',
                command: () => {
                    this.logout()
                }
            }
        ]
    }
  ];

  managerItems: MenuItem[] = [
    {
      label: "Cadastros",
      items: [
        {
          label: 'Usuários',
          routerLink: "/manager/users"
        },
        {
            label: 'Serviços',
            routerLink: "/manager/services"
        }
      ]
    }
  ]

  constructor(private pushService: PushNotificatorService, private authService: AuthService, private router: Router) {
    router.events.subscribe(x => {
      this.sidebarOpen = false;
      this.showCrudLink = false;
      this.showUserOptions = false;
    })
  }

  pushOn() {
    this.pushService.subscribeToNotifications()
  }

  get userRole() {
    return this.authService.TokenData?.role
  }

  get userData () {
    return this.authService.TokenData;
  }

  get isLogged() {
    return this.authService.isLogged;
  }

  logout() {
    this.authService.logout()
  }

}
