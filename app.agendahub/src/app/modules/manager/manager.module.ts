import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ServicesComponent } from './services/services.component';
import { UsersComponent } from './users/users.component';
import { ManagerComponent } from './manager.component';

import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { TagModule } from "primeng/tag"
import { TableModule } from "primeng/table"
import { DialogModule } from "primeng/dialog"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    ServicesComponent,
    UsersComponent,
    ManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManagerRoutingModule,
    FontAwesomeModule,


    ButtonModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    ColorPickerModule,
    OverlayPanelModule,
    InputTextareaModule,
    InputNumberModule,
    DataViewModule,
    DialogModule,
    TableModule,
    TagModule
  ]
})
export class ManagerModule { }