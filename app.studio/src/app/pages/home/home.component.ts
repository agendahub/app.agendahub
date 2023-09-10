import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { EventService } from '../../services/event.service';
import { User, UserSchedule } from '../../models/entities';
import { SchedulesDateRangeEnum } from '../../models/enums';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../auth/auth-service.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { OverlayPanel } from 'primeng/overlaypanel';
import { mapScheduleToEvent } from '../../utils/util';
import { EventInput } from '@fullcalendar/core';
import { ScreenHelperService } from '../../services/screen-helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  calendarOpen = false;
  faCalendar = faCalendar;
  
  events: UserSchedule[] = [];
  eventsCalendar: EventInput[] = []
  dateRanges = [{label:"Dia", index: 0}, {label:"Semana", index: 1}, {label:"Mês", index: 2}];
  dateRange: FormControl = new FormControl<{label: string, index: SchedulesDateRangeEnum}>(this.dateRanges[1]);

  user!: User;

  constructor(private eventService: EventService, private auth: AuthService, public scHelp: ScreenHelperService) {
    this.user = auth.getUserData();
  }
  
  ngOnInit(): void {
    this.getEvents();
  }

  private getEvents() {
    this.eventService.getCurrentEvents(this.dateRange.value.index)?.subscribe(x => {
      this.events = x;
      console.log(x);
      
    });
  }

  getWidth() {
    switch(this.scHelp.currentDevice()) {
      case 2: return "85%"
      case 1: return "65%"
      default: return "50%"
    }
  }

  getColor(userSchedule: UserSchedule) {
    return userSchedule.employee.color ?? "#1da1f2"
  }

  onChangeDateRange(event: any) {
    this.getEvents();
  }

  showCalendar(event: any, op: OverlayPanel) {
    op.toggle(event);
    this.eventsCalendar = [];
    
    if (this.calendarOpen) {
      this.calendarOpen = false;
    } else setTimeout(() => {
            this.calendarOpen = true;
            this.eventsCalendar = mapScheduleToEvent(this.events);
    });
  }

}
