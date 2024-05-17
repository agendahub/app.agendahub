import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { NgApexchartsModule } from "ng-apexcharts";
import { CalendarModule } from "primeng/calendar";
import { CarouselModule } from "primeng/carousel";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ComponentsModule } from "../../components/components.module";
import { BirthdayComponent } from "./birthday/birthday.component";
import { GeneralRoutingModule } from "./general-routing.module";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SchedulingComponent } from "./scheduling/scheduling.component";

@NgModule({
  declarations: [SchedulingComponent, NotificationsComponent, BirthdayComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    GeneralRoutingModule,
    TableModule,
    InputTextModule,
    FormsModule,
    CarouselModule,
    TagModule,
    CalendarModule,
    DialogModule,
    NgApexchartsModule,
  ],
})
export class GeneralModule {}
