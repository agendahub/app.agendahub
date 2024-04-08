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

    <div
      id="app-container"
      class="w-screen h-screen overflow-auto dark:bg-primary backdrop-blur-lg bg-very-clean"
      [ngClass]="{ flex: sidebarFixed }"
    >
      <sidebar *ngIf="!hideNav"></sidebar>

      <div class="relative w-full md:h-full h-max overflow-auto">
        <div
          class="sm:block hidden sticky right-0 top-0 z-10"
          *ngIf="!hideNav"
          [ngClass]="{ '-ml-1': sidebarFixed, 'pl-2': !sidebarFixed }"
        >
          <app-nav></app-nav>
        </div>
        <div [ngClass]="{ 'ml-16': !sidebarFixed || true }">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
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
      monthNames: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      monthNamesShort: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      weak: "Fraca",
      medium: "Média",
      strong: "Forte",
      passwordPrompt: "Informe uma senha válida",
      emptyMessage: "Sem registros encontrados",
      emptyFilterMessage: "Nenhum resultado encontrado",
    });
  }
}
