import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SchedulingComponent } from "./scheduling/scheduling.component";
import { AuthGuardService } from "../../auth/auth.guard.service";
import { NotificationsComponent } from "./notifications/notifications.component";

const breadcrumb = {
  label: "General",
  icon: "fa-solid fa-cog",
};

const routes: Routes = [
  {
    path: "scheduling",
    component: SchedulingComponent,
    canActivate: [AuthGuardService],
    data: { breadcrumb: [{ label: "Agendamentos", icon: "fa-solid fa-calendar" }] },
  },
  {
    path: "notifications",
    component: NotificationsComponent,
    canActivate: [AuthGuardService],
    data: { breadcrumb: [{ label: "Notificações", icon: "fa-solid fa-bell" }] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
