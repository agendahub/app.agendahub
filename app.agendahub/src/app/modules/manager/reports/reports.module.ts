import { NgModule } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { TabMenuModule } from "primeng/tabmenu";
import { SharedModule } from "../../../shared/shared.module";
import { ReportsRoutingModule } from "./reports-routing.module";
import { ReportsComponent } from "./reports/reports.component";

@NgModule({
  declarations: [ReportsComponent],
  imports: [SharedModule, ReportsRoutingModule, TabMenuModule, NgxChartsModule],
})
export class ReportsModule {}
