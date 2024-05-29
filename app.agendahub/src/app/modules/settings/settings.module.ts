import { NgModule } from "@angular/core";

import { ConfirmationService } from "primeng/api";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { PasswordModule } from "primeng/password";
import { TabMenuModule } from "primeng/tabmenu";
import { TooltipModule } from "primeng/tooltip";
import { SharedModule } from "../../shared/shared.module";
import { SettingsService } from "./services/settings.service";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings/settings.component";
import { AppointmentsComponent } from "./tabs/appointments/appointments.component";
import { GeneralComponent } from "./tabs/general/general.component";
import { NotificationsComponent } from "./tabs/notifications/notifications.component";
import { SecurityComponent } from "./tabs/security/security.component";

@NgModule({
  declarations: [SettingsComponent, GeneralComponent, NotificationsComponent, AppointmentsComponent, SecurityComponent],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    InputTextModule,
    InputSwitchModule,
    TooltipModule,
    MultiSelectModule,
    CalendarModule,
    TabMenuModule,
    CheckboxModule,
    PasswordModule,
    ConfirmDialogModule,
  ],
  exports: [SettingsRoutingModule],
  providers: [SettingsService, ConfirmationService],
})
export class SettingsModule {}
