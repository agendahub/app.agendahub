import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BirthdayComponent } from "./birthday/birthday.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SchedulingComponent } from "./scheduling/scheduling.component";

const breadcrumb = {
  label: "General",
  icon: "fa-solid fa-cog",
};

const routes: Routes = [
  {
    path: "scheduling",
    component: SchedulingComponent,
    data: { breadcrumb: [{ label: "Agendamentos", icon: "fa-solid fa-calendar" }] },
  },
  {
    path: "notifications",
    component: NotificationsComponent,
    data: { breadcrumb: [{ label: "Notificações", icon: "fa-solid fa-bell" }] },
  },
  {
    path: "birthdays",
    component: BirthdayComponent,
    data: { breadcrumb: [{ label: "Aniversariantes", icon: "fa-solid fa-birthday-cake" }] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
