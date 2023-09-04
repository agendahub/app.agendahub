import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { EventService } from '../../services/event.service';
import { User, UserSchedule } from '../../models/entities';
import { SchedulesDateRangeEnum } from '../../models/enums';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../auth/auth-service.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faCalendar = faCalendar;
  events: UserSchedule[] = [];
  dateRanges = [{label:"Dia", index: 0}, {label:"Semana", index: 1}, {label:"Mês", index: 2}];
  dateRange: FormControl = new FormControl<{label: string, index: SchedulesDateRangeEnum}>(this.dateRanges[1]);

  user!: User;

  constructor(private eventService: EventService, private auth: AuthService) {
    this.user = auth.getUserData();
    console.log(this.user);
    
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

  getColor(userSchedule: UserSchedule) {
        
    return userSchedule.employee.color ?? "#1da1f2"
  }

  onChangeDateRange(event: any) {
    this.getEvents();
    
  }

}
