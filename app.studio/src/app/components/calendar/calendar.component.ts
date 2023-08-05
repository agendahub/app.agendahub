import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { faClock, faCalendarCheck, faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, Calendar, EventClickArg, EventInput, EventChangeArg } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { LoaderService } from '../../services/loader.service';
import { Subject } from 'rxjs';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @ViewChild("calendar")
  calendarComponent!: FullCalendarComponent;
  clockIcon = faClock.iconName;

  faPrev = faArrowCircleLeft;
  faNext = faArrowCircleRight;
  faOptions = faCalendarCheck;
  faConfirm = faCheckCircle;
  faDelete = faTimesCircle;

  @Output() OnChange = new EventEmitter<EventChangeArg>()
  @Output() OnClick = new EventEmitter<EventClickArg>()
  @Output() OnDateClick = new EventEmitter<DateClickArg>()
  
  @Input() events!: Array<any>
  @Input() editable!: Subject<boolean>
  @Input() clearAll!: Subject<any>
  @Input() addEvent!: Subject<any>
  private isEditable!: boolean;

  public get month(): string {
    return moment(this.Calendar?.getDate()).format("MMMM").toUpperCapital();
  };

  constructor(private localStorageService: LocalStorageService, private loaderService: LoaderService) {
    this.view = this.viewTranslate[this.localStorageService.get("view") ?? 0]

    setTimeout(() => {
      this.clearAll.subscribe(x => this.Calendar.removeAllEvents())
      this.addEvent.subscribe(x => this.Calendar.addEvent(x))
      this.editable.subscribe(x => {
        this.isEditable = x;
        this.Calendar.setOption("editable", x);
        this.Calendar.setOption("selectable", x);
      })
    })

  }

  private get Calendar(): Calendar {
    return this.calendarComponent?.getApi();
  }

  next() {
    this.Calendar.next();
  }

  previous() {
    this.Calendar.prev();
  }

  views = ['dayGridMonth', 'timeGridFourDay', 'dayGridWeek', 'dayGridDay']
  viewTranslate = ["Mês", "Hora semana", "Semana", "Dia"]

  calendarOptions: CalendarOptions = {
    locale:"pt-br",
    dayHeaderClassNames: ["uppercase", "tracking-tight", "text-right" , "font-sans"],
    headerToolbar: false,
    height: 'auto',
    initialView: this.views[this.localStorageService.get("view") ?? 0],
    views: {
      timeGridFourDay: {
        type: 'timeGrid',
        allDaySlot: false,
        duration: { days: 5 },
        hiddenDays: [0],
        slotMinTime: "08:00:00",
        slotMaxTime: "22:00:00"
      }
    },
    events: [],
    // selectable: true,
    plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin, listPlugin ],
    eventChange: this.onEventChange.bind(this),
    eventClick : this.onEventClick.bind(this),
    dateClick: this.onDateClick.bind(this),
  };

  view = 'Padrão';

  changeView(event: any) {
    const indexView = this.viewTranslate.indexOf(event.value);
    if (indexView != -1) {
      this.localStorageService.set("view", indexView)
      this.localStorageService.set("viewName", this.views[indexView])
    }
    
    this.Calendar.changeView(this.views[indexView]);
  }

  onEventClick(arg: EventClickArg) {
    this.OnClick.emit(arg);
  }

  onEventChange(arg: EventChangeArg) {
    if (this.isEditable) {
      this.OnChange.emit(arg);
    }
  }

  onDateClick(arg: DateClickArg) {
    if (this.isEditable) {
      this.OnDateClick.emit(arg);
    }
  }


}
