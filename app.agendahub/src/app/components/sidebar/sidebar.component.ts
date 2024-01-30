import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { Router, RouterModule, NavigationEnd } from "@angular/router";
import { getTheme } from "../../utils/util";

@Component({
    selector: 'sidebar',
    template: `
    
    <button (click)="open = true" data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
    </button>

    <aside class="top-0 left-0 sm:z-20 z-[60] w-screen h-screen transition-transform translate-x-0 sm:fixed absolute" aria-label="Sidebar" id="default-sidebar" 
        [ngClass]="{'sm:w-12 max-w-screen-xl': !open, 'absolute sm:w-64': open}" [hidden]="!open && (IOS || ANDROID)" (mouseenter)="open = true" (mouseleave)="open = fixed ? true : false" (dblclick)="fixed = !fixed">
        <div class="h-full overflow-y-auto overflow-x-hidden bg-very-clean dark:bg-secondary flex flex-col justify-between gap-3" [ngClass]="{'p-2': open, 'py-2' :!open}">
            <div class="flex flex-col gap-5">
                <div class="flex sm:justify-center justify-between sm:px-0 px-4">
                    <img class="w-auto" [ngClass]="{'h-12': open, 'h-10': !open}" [src]="icon" alt="logotipo agendahub"> 
                    <span class="sm:hidden p-2 cursor-pointer" (click)="open = false">
                        <i class="fa-solid fa-times fa-lg"></i>
                    </span>
                </div>
                
                <ul class="space-y-3 font-medium">
                    <li>
                        
                        <a class="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" 
                            [ngClass]="{'bg-gray-400 font-semibold text-slate-950': open && isCurrent('explorer'), 'justify-center': !open}">
                            
                            <i class="fa-solid fa-folder-tree w-5 h-5 text-gray-800 dark:text-white transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                            <span class="ms-3" *ngIf="open">Explorer</span>
                        </a>
                    </li>
                    <li>
                        <a class="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" 
                            [ngClass]="{'bg-gray-400 font-semibold text-slate-950': open && isCurrent('backup'), 'justify-center': !open}">
                            <i class="fa-solid fa-database w-5 h-5 text-gray-800 dark:text-white transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                            <span class="ms-3" *ngIf="open">Backup</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col gap-3">
                <div class="rounded-md border-[1px] border-slate-500 dark:border-slate-600 p-2 flex justify-between border-none hover:border-solid ">
                    <span class="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" [ngClass]="{'justify-center': !open}">
                        <i class="fa-solid fa-user w-5 h-5 text-gray-800 dark:text-white transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                        <span *ngIf="!open" class="relative -left-1 -top-2 ">
                            <svg *ngIf="theme.light" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                            <svg *ngIf="theme.dark" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path>
                            </svg>
                        </span>

                        <span class="ms-3" *ngIf="open">Profile</span>
                    </span>
                    <button class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" id="theme-toggle" type="button">
                        <svg id="theme-toggle-dark-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                        <svg id="theme-toggle-light-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                fill-rule="evenodd"
                                clip-rule="evenodd">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </aside>



    `,
    styles: [``]
})
export class SidebarComponent implements OnInit {

    @Input() open = false;
    fixed = false;
    
    constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {
        this.router.events.subscribe(async (event) => {
            if (event instanceof NavigationEnd) {
                this.open = false;
            }
        })
    }

    ngOnInit(): void {
        this.toggleHandler();
    }
    
    isCurrent(path: string) {
        return location.pathname.includes(path);
    }

    get theme() {
        return getTheme();
    }

    get largeImage() {
        return getTheme().light 
            ? "assets/logo/logo_texto.png"
            : "assets/logo/logo_texto_dark_mode.png";
    }
    
    get icon() {
        return getTheme().light 
            ? (this.open ? "assets/logo/logo_texto_dark_mode.png" : "assets/logo/logo_imagem_dark_mode.png")
            : (this.open ? "assets/logo/logo_texto.png" : "assets/logo/logo_imagem.png");
    }

    get IOS () { 
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    }
    get ANDROID () { 
        return /android/i.test(navigator.userAgent);
    }
    
    toggleHandler() {
        var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')!;
        var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')!;
    
        // Change the icons inside the button based on previous settings
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
        }
    
        var themeToggleBtn = document.getElementById('theme-toggle')!;
    
        themeToggleBtn.addEventListener('click', function() {
            console.log(this);
            
            // toggle icons inside button
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');
    
            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
    
            // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
            
        });
      }

}
