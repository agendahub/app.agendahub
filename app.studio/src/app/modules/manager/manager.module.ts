import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ServicesComponent } from './services/services.component';
import { UsersComponent } from './users/users.component';
import { ManagerComponent } from './manager.component';

import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { TagModule } from "primeng/tag"
import { TableModule } from "primeng/table"


@NgModule({
  declarations: [
    ServicesComponent,
    UsersComponent,
    ManagerComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,

    DataViewModule,
    TableModule,
    TagModule
  ],
 
  schemas : [NO_ERRORS_SCHEMA]
})
export class ManagerModule { }
