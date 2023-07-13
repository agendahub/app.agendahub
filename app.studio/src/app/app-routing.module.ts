import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './pages/services/services.component';
import { SchedulerComponent } from './pages/scheduler/scheduler.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: "services", component: ServicesComponent},
  {path: "scheduler", component: SchedulerComponent},
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent},

  {path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
