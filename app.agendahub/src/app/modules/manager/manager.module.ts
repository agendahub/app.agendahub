import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ManagerRoutingModule } from "./manager-routing.module";
import { ManagerComponent } from "./manager.component";
import { ServicesComponent } from "./services/services.component";
import { UsersComponent } from "./users/users.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { ColorPickerModule } from "primeng/colorpicker";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";

@NgModule({
  declarations: [ServicesComponent, UsersComponent, ManagerComponent],
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
    TagModule,
    CheckboxModule,
  ],
})
export class ManagerModule {}
