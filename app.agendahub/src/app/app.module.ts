import { NO_ERRORS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PlatformModule} from '@angular/cdk/platform';
import { ClipboardModule } from '@angular/cdk/clipboard';

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
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';


/** */

import { JwtModule } from "@auth0/angular-jwt"

import { SchedulerComponent } from './pages/scheduler/scheduler.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component'
import { ApiService } from './services/api-service.service';
import { ManagerRoutingModule } from './modules/manager/manager-routing.module';
import { ManagerModule } from './modules/manager/manager.module';
import { MessageService } from 'primeng/api';
import { AuthService } from './auth/auth-service.service';
import { AuthGuardService } from './auth/auth.guard.service';
import { SettingsComponent } from './pages/settings/settings.component';
import { ScheduleLinkViewComponent } from './pages/schedule-link-view/schedule-link-view.component';
import { TableModule } from 'primeng/table';
import { MegaMenuModule } from 'primeng/megamenu';
import { TesteComponent } from './pages/teste/teste.component';
import { GeneralModule } from './modules/general/general.module';

export function tokenGetter() {
  let token = localStorage.getItem("token");
  token = !token && token != "undefined" ? JSON.parse(token!) : token;
  
  return token
}


@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    LoginComponent,
    HomeComponent,
    SettingsComponent,
    ScheduleLinkViewComponent,
    TesteComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  imports: [
    FormsModule,
    BrowserModule,
    PlatformModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ManagerRoutingModule,
    BrowserAnimationsModule,
    GeneralModule,
    
    ListboxModule,
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
    ClipboardModule,
    MegaMenuModule,
    TableModule,
    InputSwitchModule,
    MultiSelectModule,
    

    FullCalendarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001", "192.168.0.67:7777", "apistudioagenda-development.up.railway.app", "api-dev.agendahub.app"],
        // disallowedRoutes: ["apistudioagenda-development.up.railway.app/Auth/Login"],
      },
    }),

    ComponentsModule,
    ManagerModule
  ],
  providers: [
    HttpClient,
    ApiService,
    AuthService,
    MessageService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

String.prototype.toLowerCapital = function(this: string) {
  return this[0].toLowerCase() + this.slice(1);
}

String.prototype.toUpperCapital = function(this: string) {
  return this[0].toUpperCase() + this.slice(1);
}
