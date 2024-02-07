import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SchedulingComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    TableModule,
    InputTextModule,
    FormsModule
  ]
})
export class GeneralModule { }
