import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SchedulerComponent } from "./pages/scheduler/scheduler.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { CommonModule } from "@angular/common";
import { AuthGuardService } from "./auth/auth.guard.service";
import { LinksComponent } from "./pages/links/links.component";
import { ScheduleLinkViewComponent } from "./pages/schedule-link-view/schedule-link-view.component";
import { SchedulingComponent } from "./modules/general/scheduling/scheduling.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: "scheduler",
    component: SchedulerComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "links",
    component: LinksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "settings",
    canActivateChild: [AuthGuardService],
    loadChildren: () =>
      import("./modules/settings/settings-routing.module").then(
        (r) => r.SettingsRoutingModule
      ),
  },
  {
    path: "manager",
    canActivateChild: [AuthGuardService],
    loadChildren: () =>
      import("./modules/manager/manager-routing.module").then(
        (r) => r.ManagerRoutingModule
      ),
  },
  {
    path: "general",
    canActivateChild: [AuthGuardService],
    loadChildren: () =>
      import("./modules/general/general-routing.module").then(
        (r) => r.GeneralRoutingModule
      ),
  },

  {
    path: "schedule-link",
    component: ScheduleLinkViewComponent,
    canActivate: [AuthGuardService],
  },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [CommonModule, RouterModule],
})
export class AppRoutingModule {}
