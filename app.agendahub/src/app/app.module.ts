import { ClipboardModule } from "@angular/cdk/clipboard";
import { PlatformModule } from "@angular/cdk/platform";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule, isDevMode } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FullCalendarModule } from "@fullcalendar/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";

/**PrimeNG */
import { JwtModule } from "@auth0/angular-jwt";
import { AutoCompleteModule } from "primeng/autocomplete";
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ListboxModule } from "primeng/listbox";
import { MessageModule } from "primeng/message";
import { MultiSelectModule } from "primeng/multiselect";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { SidebarModule } from "primeng/sidebar";
import { SplitButtonModule } from "primeng/splitbutton";
import { TimelineModule } from "primeng/timeline";
import { ToastModule } from "primeng/toast";

import { NgOptimizedImage } from "@angular/common";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MessageService } from "primeng/api";
import { MegaMenuModule } from "primeng/megamenu";
import { TableModule } from "primeng/table";
import { environment } from "../environments/environment.development";
import { AuthService } from "./auth/auth-service.service";
import { tokenGetter } from "./auth/auth-utils";
import { AuthGuardService } from "./auth/auth.guard.service";
import { GeneralModule } from "./modules/general/general.module";
import { ManagerRoutingModule } from "./modules/manager/manager-routing.module";
import { ManagerModule } from "./modules/manager/manager.module";
import { HomeComponent } from "./pages/home/home.component";
import { LinksComponent } from "./pages/links/links.component";
import { LoginComponent } from "./pages/login/login.component";
import { ResetPasswordComponent } from "./pages/reset-password/reset-password.component";
import { ScheduleLinkViewComponent } from "./pages/schedule-link-view/schedule-link-view.component";
import { SchedulerComponent } from "./pages/scheduler/scheduler.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { ApiService } from "./services/api-service.service";
import { loadTypes } from "./types/typing";

@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    LoginComponent,
    HomeComponent,
    ScheduleLinkViewComponent,
    UserProfileComponent,
    LinksComponent,
    ScheduleLinkViewComponent,
    ResetPasswordComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    PlatformModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgOptimizedImage,

    FontAwesomeModule,
    ManagerRoutingModule,
    GeneralModule,
    MatSnackBarModule,

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
    SidebarModule,
    TimelineModule,
    FullCalendarModule,
    AvatarModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.getApiDomain()],
        disallowedRoutes: [environment.getApiDomain() + "/auth/login"],
      },
    }),

    ComponentsModule,
    ManagerModule,
  ],
  providers: [HttpClient, ApiService, AuthService, MessageService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    loadTypes();
  }
}
