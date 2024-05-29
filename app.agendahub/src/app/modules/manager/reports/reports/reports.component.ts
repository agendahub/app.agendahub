import { Component, OnInit } from "@angular/core";
import { LegendPosition } from "@swimlane/ngx-charts";
import { MenuItem, PrimeNGConfig } from "primeng/api";
import { firstValueFrom } from "rxjs";
import { ApiService } from "../../../../services/api-service.service";
import { ScreenHelperService } from "../../../../services/screen-helper.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  item!: MenuItem;

  items: MenuItem[] = [
    { label: "Resumo", icon: "pi pi-fw pi-home" },
    // { label: "Serviços", icon: "pi pi-fw pi-tags" },
    // { label: "Clientes", icon: "pi pi-fw pi-users" },
    // { label: "Funcionários", icon: "pi pi-fw pi-dollar" },
  ];

  preview: any = null;
  chartData = [] as any[];
  legendPos = LegendPosition.Below;
  legend: any = false;

  constructor(private prime: PrimeNGConfig, private api: ApiService, private help: ScreenHelperService) {
    this.legend = help.isMobile;
    prime.ripple = false;
  }

  ngOnInit(): void {
    this.item = this.items[0];

    firstValueFrom(this.api.requestFromApi("api/UserSchedule/GetWeekPreviewReport")).then((data) => {
      this.preview = data;
      this.chartData = data.series;
    });
  }
}
