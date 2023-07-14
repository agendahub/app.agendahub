import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { UsersComponent } from './users/users.component';
import { ManagerComponent } from './manager.component';

const routes: Routes = [
  {path: "services", component: ServicesComponent},
  {path: "users", component: UsersComponent},
  {path: "dash", component: ManagerComponent},

  {path: "**", redirectTo: "dash"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
