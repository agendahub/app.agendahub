import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavComponent } from "./nav/nav.component";
import { AppRoutingModule } from "../app-routing.module";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { LoaderComponent } from "./loader/loader.component";
import { AnimateModule } from "primeng/animate";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CalendarComponent } from "./calendar/calendar.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { DropdownModule } from "primeng/dropdown";
import { AccordionModule } from "primeng/accordion";
import { FormsModule } from "@angular/forms";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { OverlayModule } from "primeng/overlay";
import { BadgeModule } from "primeng/badge";
import { NotificationComponent } from "./notification/notification.component";
import { ReadMoreComponent } from "./read-more/read-more.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SpeedDialModule } from "primeng/speeddial";
import { AlertComponent } from "./alert/alert.component";
import { CalendarPreviewComponent } from "./calendar-preview/calendar-preview.component";

@NgModule({
  declarations: [
    NavComponent,
    LoaderComponent,
    SidebarComponent,
    CalendarComponent,
    NotificationComponent,
    ReadMoreComponent,
    BreadcrumbComponent,
    AlertComponent,
    CalendarPreviewComponent,
  ],
  exports: [
    AlertComponent,
    NavComponent,
    LoaderComponent,
    SidebarComponent,
    CalendarComponent,
    NotificationComponent,
    CalendarPreviewComponent,
  ],
  imports: [
    ProgressSpinnerModule,
    AnimateModule,
    CommonModule,
    FormsModule,
    NgxUiLoaderModule,

    FontAwesomeModule,
    FullCalendarModule,
    OverlayPanelModule,

    AccordionModule,
    DropdownModule,
    OverlayModule,
    ButtonModule,
    MenuModule,
    BadgeModule,
    SpeedDialModule,
  ],
})
export class ComponentsModule {}
