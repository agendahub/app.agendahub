import { NO_ERRORS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from './components/components.module';
import { FullCalendarModule } from '@fullcalendar/angular';

/**PrimeNG */
import { InputTextareaModule } from "primeng/inputtextarea";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button"
import { CheckboxModule } from "primeng/checkbox"
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from "primeng/message"
import { ToastModule } from "primeng/toast"
/** */

import { SchedulerComponent } from './pages/scheduler/scheduler.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component'
import { ApiService } from './services/api-service.service';
import { ManagerRoutingModule } from './modules/manager/manager-routing.module';
import { ManagerModule } from './modules/manager/manager.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    LoginComponent,
    HomeComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ManagerRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    
    

    ToastModule,
    DialogModule,
    ButtonModule,
    MessageModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    InputTextModule,
    SplitButtonModule,
    AutoCompleteModule,
    OverlayPanelModule,
    InputTextareaModule,

    FullCalendarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    ComponentsModule,
    ManagerModule
  ],
  providers: [
    HttpClient,
    ApiService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }