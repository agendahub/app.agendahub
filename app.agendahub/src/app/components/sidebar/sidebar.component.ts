import { DOCUMENT } from "@angular/common";
import { Component, HostListener, Inject, Input, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../auth/auth-service.service";
import { getTheme } from "../../utils/util";

@Component({
  selector: "sidebar",
  template: `
    <div class="flex justify-between items-center py-2 sm:hidden" *ngIf="!open">
      <div class="flex justify-center items-center sm:px-0 px-2">
        <img class="w-auto" [ngClass]="{ 'h-8': open, 'h-12': !open }" [src]="iconMobile" alt="logotipo AgendaHub" />
      </div>
      <div class="flex justify-end items-center gap-1">
        <span class="sm:mt-1 m-0">
          <notifications *ngIf="mobile"></notifications>
        </span>
        <button
          (click)="open = true"
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          class="flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span class="sr-only">Open sidebar</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <path
              d="M 4.717 8.824 L 4.717 29.658 C 4.717 32.184 6.774 34.241 9.3 34.241 L 30.134 34.241 C 32.66 34.241 34.717 32.184 34.717 29.658 L 34.717 8.824 C 34.717 6.298 32.66 4.241 30.134 4.241 L 9.3 4.241 C 6.774 4.241 4.717 6.298 4.717 8.824 Z M 19.073 10.074 C 19.073 9.154 20.138 8.408 21.059 8.408 L 28.884 8.408 C 29.805 8.408 30.55 9.154 30.55 10.074 L 30.55 28.408 C 30.55 29.329 29.805 30.074 28.884 30.074 L 21.165 30.074 C 20.244 30.074 19.179 29.222 19.179 28.301 L 19.179 17.776 L 19.073 10.074 Z"
              style="transform-box: fill-box; transform-origin: 50% 50%;"
              transform="matrix(-1, 0, 0, -1, 0, -0.000009)"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <div aria-hidden="true" class="fixed inset-0 w-full h-full bg-black/50" *ngIf="blockScroll"></div>

    <div
      class="absolute sm:block hidden z-[9999] top-6 ease-in-out duration-300"
      [ngClass]="{
        'left-[17.15rem] translate-x-1': open,
        'left-[3.5rem] translate-x-0': !open
      }"
      (mouseleave)="open = fixed ? true : false"
    >
      <div
        class="w-4 h-4 rounded-full flex items-center justify-center border-[1px] cursor-pointer
        bg-clean text-gray-400 border-gray-400 
        dark:bg-gray-800 dark:border-gray-700 
        hover:dark:bg-white hover:dark:text-gray-800"
        (click)="setFixed(); open = !open"
      >
        <i class="fa-solid fa-chevron-left fa-2xs" [ngClass]="{ 'fa-crevron-left': open, 'fa-chevron-right': !open }"></i>
      </div>
    </div>

    <aside
      class="z-[2000] w-screen h-screen ease-in-out duration-300 select-none"
      aria-label="Sidebar"
      id="default-sidebar"
      [ngClass]="{
        'fixed sm:w-16 max-w-screen-xl sm:-translate-x-0 -translate-x-full': !open,
        'absolute sm:w-72 sm:translate-x-0': open
      }"
      (mouseenter)="open = true"
      (mouseleave)="open = fixed ? true : false"
    >
      <div
        class="z-[2000] h-full overflow-y-auto dark:shadow-xl shadow-md overflow-x-hidden bg-very-clean dark:bg-primary border-l-0 border-r dark:border-secondary border-clean flex flex-col justify-between gap-3 pb-1"
        [ngClass]="{ 'px-2': open }"
      >
        <div class="flex flex-col gap-3">
          <div class="flex justify-between items-center w-full sm:px-0">
            <img class="w-auto, h-16 object-contain" [ngClass]="{ 'p-2': !open }" [src]="icon" alt="logotipo AgendaHub" />
            <div class="sm:hidden cursor-pointer p-2 dark:text-very-clean text-secondary" (click)="open = false">
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                <path
                  d="M 4.717 8.824 L 4.717 29.658 C 4.717 32.184 6.774 34.241 9.3 34.241 L 30.134 34.241 C 32.66 34.241 34.717 32.184 34.717 29.658 L 34.717 8.824 C 34.717 6.298 32.66 4.241 30.134 4.241 L 9.3 4.241 C 6.774 4.241 4.717 6.298 4.717 8.824 Z M 19.073 10.074 C 19.073 9.154 20.138 8.408 21.059 8.408 L 28.884 8.408 C 29.805 8.408 30.55 9.154 30.55 10.074 L 30.55 28.408 C 30.55 29.329 29.805 30.074 28.884 30.074 L 21.165 30.074 C 20.244 30.074 19.179 29.222 19.179 28.301 L 19.179 17.776 L 19.073 10.074 Z"
                  style="transform-origin: 19.717px 19.241px;"
                ></path>
              </svg>
            </div>
          </div>

          <ul class="space-y-2 font-medium">
            <li>
              <a
                [routerLink]="['/home']"
                class="cursor-pointer flex items-center p-3 text-primary rounded-lg dark:text-white hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary group"
                [ngClass]="{ 'justify-center': !open }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <span class="ms-3 select-none" *ngIf="open">Inicio</span>
              </a>
            </li>
            <li>
              <a
                [routerLink]="['/scheduler']"
                class="cursor-pointer flex items-center p-3 text-primary rounded-lg dark:text-white hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary group"
                [ngClass]="{ 'justify-center': !open }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>

                <span class="ms-3 select-none" *ngIf="open">Agenda</span>
              </a>
            </li>
            <li *ngIf="userRole !== 'employee'" (click)="showCrudLink = !showCrudLink; clickHandler($event)">
              <div
                role="button"
                class="flex items-center p-3 rounded-lg hover:bg-primary hover:text-white hover:dark:bg-white hover:dark:text-primary group"
                [ngClass]="{
                  'justify-between': open,
                  'justify-center': !open,
                  'rounded-none rounded-t-lg': showCrudLink,
                  'text-primary dark:text-white': !showCrudLink,
                  'bg-primary': showCrudLink && open,
                  'text-white': showCrudLink && open,
                  'dark:bg-white': showCrudLink && open,
                  'dark:text-primary': showCrudLink && open,
                }"
              >
                <a class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>

                  <span class="ms-3 select-none" *ngIf="open">Gestão</span>
                </a>
                <span
                  *ngIf="open"
                  class="flex items-center justify-center cursor-pointer duration-300"
                  [ngClass]="{
                    'rotate-180': showCrudLink
                  }"
                >
                  <i class="fa-solid fa-arrow-circle-down"></i>
                </span>
              </div>

              <div id="crud-link" class="w-full p-2 bg-primary dark:bg-white rounded-b-md shadow-md mt-0" *ngIf="showCrudLink && open">
                <a
                  routerLink="/manager/users"
                  class="block rounded-lg p-3 text-sm font-semibold leading-7 text-white dark:text-primary hover:bg-white hover:text-primary  hover:dark:text-white hover:dark:bg-primary"
                  >Usuários</a
                >
                <a
                  routerLink="/manager/services"
                  class="block rounded-lg p-3 text-sm font-semibold leading-7 text-white dark:text-primary hover:bg-white hover:text-primary  hover:dark:text-white hover:dark:bg-primary"
                  >Serviços</a
                >
                <a
                  routerLink="/manager/reports"
                  class="block rounded-lg p-3 text-sm font-semibold leading-7 text-white dark:text-primary hover:bg-white hover:text-primary  hover:dark:text-white hover:dark:bg-primary"
                  >Relatórios</a
                >
              </div>
            </li>
            <li>
              <a
                [routerLink]="['/general/scheduling']"
                class="cursor-pointer flex items-center p-3 text-primary rounded-lg dark:text-white hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary group"
                [ngClass]="{ 'justify-center': !open }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>

                <span class="ms-3 select-none" *ngIf="open">Atendimentos</span>
              </a>
            </li>
            <li>
              <a
                [routerLink]="['/general/birthdays']"
                class="cursor-pointer flex items-center p-3 text-primary rounded-lg dark:text-white hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary group"
                [ngClass]="{ 'justify-center': !open }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                  />
                </svg>

                <span class="ms-3 select-none" *ngIf="open">Aniversariantes</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="sticky bottom-0 left-0 right-0 z-30 backdrop-blur-md w-full rounded-md">
          <div id="user-options" class="w-full p-2 bg-slate-100 rounded-t-md shadow-md mt-0" *ngIf="showUserOptions && open">
            <a routerLink="/profile" class="block rounded-lg p-3 text-sm font-semibold leading-7 hover:text-gray-50 hover:bg-secondary">Perfil</a>
            <a routerLink="/settings" class="block rounded-lg p-3 text-sm font-semibold leading-7 hover:text-gray-50 hover:bg-secondary">Configurações</a>
            <a (click)="logout()" class="block rounded-lg p-3 text-sm font-semibold leading-7 hover:text-gray-50 hover:bg-secondary">Sair</a>
          </div>
          <div class="flex flex-col gap-3 w-full">
            <div
              role="button"
              class="text-primary rounded-lg hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary group p-2 flex justify-between  "
              (click)="showUserOptions = !showUserOptions; clickHandler($event)"
              [ngClass]="
              {
                'rounded-none': showUserOptions,
                'rounded-b-lg': showUserOptions,
                'bg-primary': showUserOptions && open,
                'text-white': showUserOptions && open,
                'dark:bg-white': showUserOptions && open,
                'dark:text-white': !showUserOptions || !open,
                'dark:text-primary': showUserOptions && open,
              }"
            >
              <span class="cursor-pointer flex items-center p-2" [ngClass]="{ 'justify-center': !open }">
                <i class="fa-solid fa-user w-5 h-5"></i>
                <span *ngIf="!open" class="relative -left-1 -top-2 ">
                  <svg *ngIf="theme.light" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                  <svg *ngIf="theme.dark" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>

                <span *ngIf="open" class="ms-3">{{ userData.name }}</span>
              </span>
              <button class="rounded-lg text-sm p-2.5" id="theme-toggle" type="button">
                <svg id="theme-toggle-dark-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                <svg id="theme-toggle-light-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [
    `
      aside ::-webkit-scrollbar:vertical {
        width: 0.2rem;
        background-blend-mode: darken;
        padding: 1rem 0;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  @Input()
  public open = false || this.fixedSidebar;
  private sidebar!: HTMLElement;
  public fixed = false;

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private authService: AuthService) {
    router.events.subscribe((x) => {
      this.sidebarOpen = false;
      this.showCrudLink = false;
      this.showUserOptions = false;
    });

    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        this.open = false;
      }
    });
  }

  @HostListener("document:click", ["$event"])
  clickout(event: Event) {
    this.showCrudLink = false;
    this.showUserOptions = false;
  }

  ngOnInit(): void {
    this.toggleHandler();
    this.sidebar = this.document.getElementById("default-sidebar")!;

    if (this.ANDROID || this.IOS) {
      this.open = false;
      this.setFixed(false);
    }

    if (this.fixedSidebar) {
      this.setFixed(true);
    }
  }

  isCurrent(path: string) {
    return location.pathname.includes(path);
  }

  clickHandler(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  setFixed(value?: boolean) {
    this.fixed = value ?? !this.fixed;
    localStorage.setItem("sidebarFixed", this.fixed.toString());

    if (this.fixed) {
      this.sidebar.classList.remove("sm:fixed");
      this.sidebar.classList.add("relative");
    } else {
      this.sidebar.classList.remove("relative");
      this.sidebar.classList.add("sm:fixed");
    }

    window.dispatchEvent(new Event("resize"));
  }

  get blockScroll() {
    const block = this.open && (this.ANDROID || this.IOS);
    const container = this.document.querySelector("#app-container")! as HTMLElement;
    container.style.overflow = block ? "hidden" : "auto";
    return block;
  }

  get fixedSidebar() {
    return localStorage.getItem("sidebarFixed") === "true";
  }

  get theme() {
    return getTheme();
  }

  get largeImage() {
    return getTheme().light ? "assets/logo/logo_texto_imagem_dark_mode.png" : "assets/logo/logo_texto_imagem.png";
  }

  get icon() {
    return getTheme().light
      ? this.open
        ? "assets/logo/logo_texto_imagem_dark_mode.png"
        : "assets/logo/logo_imagem_dark_mode.png"
      : this.open
      ? "assets/logo/logo_texto_imagem.png"
      : "assets/logo/logo_imagem.png";
  }

  get iconMobile() {
    return getTheme().light ? "assets/logo/logo_imagem_dark_mode.png" : "assets/icons/icon-144x144.png";
  }

  get IOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
  }

  get ANDROID() {
    return /android/i.test(navigator.userAgent);
  }

  get mobile() {
    return this.ANDROID || this.IOS;
  }

  toggleHandler() {
    var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon")!;
    var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon")!;

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      themeToggleLightIcon.classList.remove("hidden");
    } else {
      themeToggleDarkIcon.classList.remove("hidden");
    }

    var themeToggleBtn = document.getElementById("theme-toggle")!;

    themeToggleBtn.addEventListener("click", function () {
      console.log(this);

      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle("hidden");
      themeToggleLightIcon.classList.toggle("hidden");

      // if set via local storage previously
      if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        }
      }
    });
  }

  sidebarOpen = false;
  faArrowDown = faArrowCircleDown;

  showCrudLink = false;
  showUserOptions = false;

  get userRole() {
    return this.authService.TokenData?.role;
  }

  get userData() {
    return this.authService.TokenData;
  }

  get isLogged() {
    return this.authService.isLogged;
  }

  logout() {
    this.authService.logout();
  }
}
