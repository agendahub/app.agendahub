import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "./settings/settings.component";
import { GeneralComponent } from "./tabs/general/general.component";
import { NotificationsComponent } from "./tabs/notifications/notifications.component";
import { AppointmentsComponent } from "./tabs/appointments/appointments.component";

const config = { label: "Configurações", url: "settings", icon: "fa-solid fa-cog" };
const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    data: { breadcrumb: config },
    children: [
      { path: "general", component: GeneralComponent, data: { breadcrumb: [config, { label: "Geral", icon: "fa-solid fa-cog" }] } },
      { path: "notifications", component: NotificationsComponent, data: { breadcrumb: [config, { label: "Notificações", icon: "fa-solid fa-bell" }] } },
      { path: "appointments", component: AppointmentsComponent, data: { breadcrumb: [config, { label: "Agendamentos", icon: "fa-solid fa-clock" }] } },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
