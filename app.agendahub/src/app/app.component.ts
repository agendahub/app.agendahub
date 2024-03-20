import { Component } from "@angular/core";
import * as moment from "moment";
import { PrimeNGConfig } from "primeng/api";
import { Router } from "@angular/router";
import { skipRoutes } from "./models/core/rules";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  template: `
    <loader></loader>
    <p-toast
      [breakpoints]="{ '920px': { width: '100%', right: '0', left: '0' } }"
    ></p-toast>
    <!-- <app-nav *ngIf="!isLogin && !hideNav"></app-nav> -->

    <div id="app-container"
      class="w-screen h-screen overflow-auto dark:bg-primary backdrop-blur-lg bg-clean"
      [ngClass]="{ flex: sidebarFixed }"
    >
      <sidebar *ngIf="!isLogin && !hideNav"></sidebar>

      <div
        class="relative w-full md:h-full h-max overflow-auto"
        [ngClass]="{ 'sm:pl-14 pl-0 ': !isLogin && !hideNav }"
      >
        <router-outlet></router-outlet>
      </div>
    </div>

    <!-- <div class="isolate overflow-hidden">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem] h-full overflow-h-scroll" aria-hidden="true">
      <div class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      <div class="md:hidden block relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>  
    

    <div class="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-10 " aria-hidden="true">
      <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
  </div> -->
  `,
  styles: [],
})
export class AppComponent {
  constructor(
    private primeNG: PrimeNGConfig,
    private router: Router,
    private title: Title
  ) {
    moment.locale("pt-br");
    this.configureTranslation();

    primeNG.overlayOptions = {
      appendTo: "body",
    };

    title.setTitle("AgendaHub | Sistema de Gestão de Atividades");
  }

  get hideNav() {
    return skipRoutes.includes(location.pathname.replaceAll("/", ""));
  }

  get isLogin() {
    return this.router.url.includes("login");
  }

  get sidebarFixed() {
    return localStorage.getItem("sidebarFixed") === "true";
  }

  configureTranslation() {
    this.primeNG.setTranslation({
      accept: "Aceitar",
      reject: "Cancelar",
      choose: "Escolher",
      upload: "Enviar",
      cancel: "Cancelar",
      dayNames: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ],
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
