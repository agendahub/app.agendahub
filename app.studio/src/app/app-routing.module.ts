import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent } from './pages/scheduler/scheduler.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ManagerRoutingModule } from './modules/manager/manager-routing.module';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './auth/auth.guard.service';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "scheduler", component: SchedulerComponent, canActivate: [AuthGuardService]},
  {path: "home", component: HomeComponent, canActivate: [AuthGuardService]},
  {path: "settings", component: SettingsComponent, canActivate: [AuthGuardService]},
  {path: "manager", canActivateChild: [AuthGuardService], loadChildren: () => import("./modules/manager/manager-routing.module").then(r => r.ManagerRoutingModule)},

  {path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [CommonModule, RouterModule],
})
export class AppRoutingModule { }
