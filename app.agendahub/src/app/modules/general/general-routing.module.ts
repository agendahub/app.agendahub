import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SchedulingComponent } from "./scheduling/scheduling.component";
import { AuthGuardService } from "../../auth/auth.guard.service";
import { NotificationsComponent } from "./notifications/notifications.component";

const routes: Routes = [
  {
    path: "scheduling",
    component: SchedulingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "notifications",
    component: NotificationsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
