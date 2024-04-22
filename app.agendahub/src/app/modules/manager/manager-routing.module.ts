import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { UsersComponent } from './users/users.component';
import { ManagerComponent } from './manager.component';

const breadcrumb = {
  label: "Gestão",
  icon: "fa-solid fa-cog"
};
const routes: Routes = [
  {path: "services", component: ServicesComponent, data: {breadcrumb: [breadcrumb, {label: "Serviços", icon: "fa-solid fa-tools"}]}},
  {path: "users", component: UsersComponent, data: {breadcrumb: [breadcrumb, {label: "Usuários", icon: "fa-solid fa-users"}]}},
  {path: "dash", component: ManagerComponent, data: {breadcrumb: breadcrumb}},
  {path: "**", redirectTo: "dash"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
