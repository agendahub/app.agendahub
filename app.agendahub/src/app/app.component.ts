import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NavigationEnd, Router } from "@angular/router";
import * as moment from "moment";
import { PrimeNGConfig } from "primeng/api";
import { AuthService } from "./auth/auth-service.service";
import { skipRoutes } from "./models/core/rules";

@Component({
  selector: "app-root",
  template: `
    <loader></loader>
    <p-toast [breakpoints]="{ '920px': { width: '85%', right: '5', left: '5' } }"></p-toast>

    <div
      id="app-container"
      class="w-screen h-screen overflow-auto dark:bg-primary backdrop-blur-lg bg-very-clean transition-colors duration-200 ease-linear"
      [ngClass]="{ flex: sidebarFixed }"
    >
      <sidebar *ngIf="!hideNav"></sidebar>
      <div class="relative w-full overflow-auto" [ngClass]="{ 'sm:h-full h-fit': !hideNav, 'h-full': hideNav }" cdk-scrollable>
        <div *ngIf="!hideNav" class="sm:block hidden sticky right-0 top-0 z-10" [ngClass]="{ 'ml-0': !falsy(sidebarFixed), 'ml-16': falsy(sidebarFixed) }">
          <app-nav></app-nav>
        </div>
        <div class="h-fit" [ngClass]="{ 'sm:ml-16 m-0': falsy(sidebarFixed) && !hideNav, 'm-0': hideNav }">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  constructor(private primeNG: PrimeNGConfig, private router: Router, private title: Title, private auth: AuthService) {
    moment.locale("pt-br");
    this.configureTranslation();

    this.primeNG.ripple = true;
    this.primeNG.overlayOptions = {
      appendTo: "body",
    };

    title.setTitle("AgendaHub | Sistema de Gestão de Atividades");

    this.router.events.forEach((x) => {
      if (x instanceof NavigationEnd) {
        this.evalueteRoute(location.pathname.substring(1));

        if (!this.auth.isLogged && !this.hideNav) {
          this.auth.logout();
        }
      }
    });
  }

  evalueteRoute(route: string) {
    for (let skip of skipRoutes) {
      if (route.match(skip)) {
        this.hideNav = true;
        return;
      }
    }

    this.hideNav = false;
  }

  hideNav: boolean = true;

  get isLogin() {
    return this.router.url.includes("login");
  }

  get sidebarFixed() {
    return localStorage.getItem("sidebarFixed") === "true";
  }

  falsy(value: any) {
    return value == null || value == undefined || value == "" || value == 0 || value == false;
  }

  configureTranslation() {
    this.primeNG.setTranslation({
      accept: "Aceitar",
      reject: "Cancelar",
      choose: "Escolher",
      upload: "Enviar",
      cancel: "Cancelar",
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      addRule: "Adicionar Regra",
      removeRule: "Remover Regra",
      weekHeader: "Semana",
      today: "Hoje",
      clear: "Limpar",
      dateFormat: "dd/mm/yy",
      firstDayOfWeek: 1,
      after: "Depois",
      before: "Antes",
      startsWith: "Começa com",
      contains: "Contém",
      notContains: "Não contém",
      endsWith: "Termina com",
      equals: "Igual",
      notEquals: "Diferente",
      noFilter: "Sem filtro",
      lt: "Menor que",
      lte: "Menor ou igual a",
      gt: "Maior que",
      gte: "Maior ou igual a",
      is: "É",
      isNot: "Não é",
      dateIs: "Data é",
      dateIsNot: "Data não é",
      dateBefore: "Data antes",
      dateAfter: "Data depois",
      apply: "Aplicar",
      matchAll: "Corresponder todos",
      matchAny: "Corresponder qualquer",
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      weak: "Fraca",
      medium: "Média",
      strong: "Forte",
      passwordPrompt: "Informe uma senha válida",
      emptyMessage: "Sem registros encontrados",
      emptyFilterMessage: "Nenhum resultado encontrado",
    });
  }
}
