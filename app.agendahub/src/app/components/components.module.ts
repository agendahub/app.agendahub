import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FullCalendarModule } from "@fullcalendar/angular";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { AccordionModule } from "primeng/accordion";
import { AnimateModule } from "primeng/animate";
import { AvatarModule } from "primeng/avatar";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { MenuModule } from "primeng/menu";
import { OverlayModule } from "primeng/overlay";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SpeedDialModule } from "primeng/speeddial";
import { AlertComponent } from "./alert/alert.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { LoaderComponent } from "./loader/loader.component";
import { NavComponent } from "./nav/nav.component";
import { NotificationComponent } from "./notification/notification.component";
import { ReadMoreComponent } from "./read-more/read-more.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

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
  ],
  exports: [
    NavComponent,
    AlertComponent,
    LoaderComponent,
    SidebarComponent,
    CalendarComponent,
    NotificationComponent,
  ],
  imports: [
    ProgressSpinnerModule,
    AnimateModule,
    CommonModule,
    FormsModule,
    NgxUiLoaderModule,
    AvatarModule,

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
