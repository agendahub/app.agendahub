import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { GeneralComponent } from './tabs/general/general.component';
import { NotificationsComponent } from './tabs/notifications/notifications.component';
import { AppointmentsComponent } from './tabs/appointments/appointments.component';

const routes: Routes = [
  { path: '', component: SettingsComponent, 
    children: [
      {path: 'general', component: GeneralComponent},
      {path: 'notifications', component: NotificationsComponent},
      {path: 'appointments', component: AppointmentsComponent}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
