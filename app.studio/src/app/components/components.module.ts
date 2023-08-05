import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderComponent } from './loader/loader.component';
import { AnimateModule } from 'primeng/animate';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavComponent,
    LoaderComponent,
    CalendarComponent
  ],
  exports: [
    NavComponent,
    LoaderComponent,
    CalendarComponent
  ],
  imports: [
    ProgressSpinnerModule,
    AppRoutingModule,
    AnimateModule,
    CommonModule,
    FormsModule,

    FontAwesomeModule,
    FullCalendarModule,
    
    DropdownModule,
    ButtonModule,
    MenuModule
  ]
})
export class ComponentsModule { }
