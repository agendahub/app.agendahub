import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth-service.service';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { getTheme } from '../../utils/util';

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
            // {
            //     label: 'Perfil',
            //     command: () => {
                    
            //     }
            // },
            {
                label: 'Configurações',
                routerLink: "/settings",
                icon: "fa-solid fa-gear"
            },
            {
                label: 'Sair',
                icon: "fa-solid fa-sign-out",
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

  get largeImage() {
    return getTheme().light 
        ? "assets/logo/logo_texto.png"
        : "assets/logo/logo_texto_dark_mode.png";
  }

  get icon() {
    return getTheme().light 
        ? "assets/logo/logo_imagem.png"
        : "assets/logo/logo_imagem_dark_mode.png";
  }

  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe(x => {
      this.sidebarOpen = false;
      this.showCrudLink = false;
      this.showUserOptions = false;
    })
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
