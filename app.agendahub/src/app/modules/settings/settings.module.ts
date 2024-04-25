import { NgModule } from "@angular/core";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings/settings.component";
import { SharedModule } from "../../shared/shared.module";
import { TabMenuModule } from "primeng/tabmenu";
import { GeneralComponent } from "./tabs/general/general.component";
import { NotificationsComponent } from "./tabs/notifications/notifications.component";
import { AppointmentsComponent } from "./tabs/appointments/appointments.component";
import { SettingsService } from "./services/settings.service";
import { CheckboxModule } from "primeng/checkbox";
import { CalendarModule } from "primeng/calendar";
import { MultiSelectModule } from "primeng/multiselect";
import { TooltipModule } from "primeng/tooltip";

@NgModule({
  declarations: [
    SettingsComponent,
    GeneralComponent,
    NotificationsComponent,
    AppointmentsComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,

    TooltipModule,
    MultiSelectModule,
    CalendarModule,
    TabMenuModule,
    CheckboxModule,
  ],
  exports: [SettingsRoutingModule],
  providers: [SettingsService],
})
export class SettingsModule {}
