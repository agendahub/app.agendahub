import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './pages/services/services.component';
import { SchedulerComponent } from './pages/scheduler/scheduler.component';

const routes: Routes = [
  {path: "services", component: ServicesComponent},
  {path: "scheduler", component: SchedulerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
