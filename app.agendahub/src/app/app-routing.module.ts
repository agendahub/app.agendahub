import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SchedulerComponent } from "./pages/scheduler/scheduler.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { CommonModule } from "@angular/common";
import { AuthGuardService } from "./auth/auth.guard.service";
import { LinksComponent } from "./pages/links/links.component";
import { ScheduleLinkViewComponent } from "./pages/schedule-link-view/schedule-link-view.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { ResetPasswordComponent } from "./pages/reset-password/reset-password.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "reset-password/:token", component: ResetPasswordComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: "scheduler",
    component: SchedulerComponent,
    canActivate: [AuthGuardService],
    data: { breadcrumb: { label: "Agenda", url: "scheduler", icon: "fa-solid fa-calendar" } },
  },
  {
    path: "links",
    component: LinksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "settings",
    loadChildren: () => import("./modules/settings/settings.module").then((r) => r.SettingsModule),
  },
  {
    path: "manager",
    canActivateChild: [AuthGuardService],
    loadChildren: () => import("./modules/manager/manager-routing.module").then((r) => r.ManagerRoutingModule),
  },
  {
    path: "general",
    canActivateChild: [AuthGuardService],
    loadChildren: () => import("./modules/general/general-routing.module").then((r) => r.GeneralRoutingModule),
  },
  {
    path: "schedule-link",
    component: ScheduleLinkViewComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "profile",
    component: UserProfileComponent,
  },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [CommonModule, RouterModule],
})
export class AppRoutingModule {}
