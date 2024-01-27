import { Component } from '@angular/core';
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

  largeImage = "assets/logo/logo_texto.png"
  icon = "assets/logo/logo_imagem.png"

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

  toggleHandler() {
    var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')!;
    var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')!;

    // Change the icons inside the button based on previous settings
    if (sessionStorage.getItem('color-theme') === 'dark' || (!('color-theme' in sessionStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }

    var themeToggleBtn = document.getElementById('theme-toggle')!;

    themeToggleBtn.addEventListener('click', function() {

        // toggle icons inside button
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        // if set via local storage previously
        if (sessionStorage.getItem('color-theme')) {
            if (sessionStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                sessionStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                sessionStorage.setItem('color-theme', 'light');
            }

        // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                sessionStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                sessionStorage.setItem('color-theme', 'dark');
            }
        }
        
    });
  }

}
