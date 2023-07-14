import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent } from './pages/scheduler/scheduler.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ManagerRoutingModule } from './modules/manager/manager-routing.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path: "scheduler", component: SchedulerComponent},
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: "manager", loadChildren: () => import("./modules/manager/manager-routing.module").then(r => r.ManagerRoutingModule)},

  {path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [CommonModule, RouterModule],
})
export class AppRoutingModule { }
