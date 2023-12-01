import { AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { faCalendarCheck, faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, Calendar, EventClickArg, EventChangeArg } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { CalendarItemDirective } from '../calendar-item.directive';
import { CalendarNavigator } from './calendar-navigator';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit, AfterContentInit {

  @ViewChild("calendar")
  calendarComponent!: FullCalendarComponent;

  @ContentChildren(CalendarItemDirective) calendarItems!: QueryList<CalendarItemDirective>;
  calendarItemsArray!: Array<CalendarItemDirective>;
  
  @Output() OnViewChange = new EventEmitter<{event: any, offset: {start: Date, end: Date}}>()
  @Output() OnDateClick = new EventEmitter<DateClickArg>()
  @Output() OnChange = new EventEmitter<EventChangeArg>()
  @Output() OnClick = new EventEmitter<EventClickArg>()
  @Input() viewDateRange!: Array<Date>
  @Input() editable!: Subject<boolean>
  @Input() clearAll!: Subject<any>
  @Input() addEvent!: Subject<any>
  @Input() header: boolean = true
  @Input() isEditable!: boolean;
  @Input() events!: Array<any>

  public views = ['dayGridMonth', 'timeGridFourDay', 'dayGridWeek', 'dayGridDay'];
  public viewTranslate = ["Mês", "Hora semana", "Semana", "Dia"];
  public view = 'Padrão';

  public faNext = faArrowCircleRight;
  public faOptions = faCalendarCheck;
  public faPrev = faArrowCircleLeft;
  public faConfirm = faCheckCircle;
  public faDelete = faTimesCircle;

  public nav!: CalendarNavigator
 
  constructor(private localStorageService: LocalStorageService) {
    this.nav = new CalendarNavigator(this.Calendar, [this.checkPrevNext.bind(this), this.dispatchViewChange.bind(this)]);
   }

  ngAfterContentInit() {
    this.calendarItemsArray = this.isEditable 
      ? this.calendarItems.toArray()
      : this.calendarItems.toArray().filter(x => x.enableForAll);

      //this.calendarItemsArray = this.calendarItemsArray.sort((a, b) => a.template.elementRef.nativeElement instanceof HTMLButtonElement ? -1 : 1);
  }

  ngAfterViewInit(): void {
    this.view = this.initView;

    this.dispatchViewChange();

    if (!this.addEvent) {
      this.Calendar.addEventSource(this.events);
    }    

    if (this.viewDateRange) {
      console.log(this.viewDateRange);
      this.checkPrevNext();
    }

  }

  ngOnInit(): void {
    this.clearAll?.subscribe(x => this.Calendar.removeAllEvents())
    this.addEvent?.subscribe(x => this.Calendar.addEvent(x))
    this.editable?.subscribe(x => {
      this.isEditable = x;
      this.Calendar.setOption("editable", x);
      this.Calendar.setOption("selectable", x);
    })

    console.log(this.events);
    
  }

  public get month(): string {
    return moment(this.Calendar?.getDate()).format("MMMM").toUpperCapital();
  };

  private get initView() {
    if (this.editable) {
      return this.viewTranslate[this.localStorageService.get("view") ?? 0]
    } else {
      this.Calendar.changeView(this.views[0]); 
      return this.views[0]
    }
  }

  private get Calendar(): Calendar {
    return this.calendarComponent?.getApi();
  }

  public next() {
    this.Calendar.next();
    this.dispatchViewChange();
    this.checkPrevNext();
  }

  public previous() {
    this.Calendar.prev();
    this.dispatchViewChange();
    this.checkPrevNext();
  }

  private checkPrevNext() {
    if (this.viewDateRange) {
      let duration = this.Calendar.view.getOption("duration");
      
      if (duration) {
        
        let start = this.Calendar.view.currentStart;
        let end = this.Calendar.view.currentEnd;
        
        if (start && this.viewDateRange[0]) {
          
          let startDiff = moment(start).subtract(duration, "days");
            //.subtract(moment(this.viewDateRange[0]).days(), "days");

          console.log(startDiff, this.viewDateRange[0]);

          if (startDiff.isBefore(this.viewDateRange[0])) {
            console.log("isBefore");
            this.nav.previousEnable = false;
            
          } else {
            this.nav.previousEnable = true;
          }
          
        }        
        
        if (end && this.viewDateRange[1]) {

          let endDiff = moment(end).add(duration, "days");
            //.add(moment(this.viewDateRange[1]).days(), "days");

          console.log(endDiff, this.viewDateRange[1]);
          
          if (endDiff.isAfter(this.viewDateRange[1])) {
            console.log("isAfter");
            this.nav.nextEnable = false;
            
          } else {
            this.nav.nextEnable = true;
          }

        }
      }
    }
  }

  public calendarOptions: CalendarOptions = {
    locale:"pt-br",
    dayHeaderClassNames: ["uppercase", "tracking-tight", "text-right" , "Roboto"],
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
        slotMaxTime: "23:00:00"
      }
    },
    plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin, listPlugin ],
    eventChange: this.onEventChange.bind(this),
    eventClick : this.onEventClick.bind(this),
    dateClick: this.onDateClick.bind(this),
  };

  public changeView(event: any) {
    const indexView = this.viewTranslate.indexOf(event.value);
    if (indexView != -1) {
      this.localStorageService.set("view", indexView)
      this.localStorageService.set("viewName", this.views[indexView])
    }    
    this.Calendar.changeView(this.views[indexView]);
    this.dispatchViewChange();
  }

  private dispatchViewChange() {
    const offset = {
      start: this.Calendar.getCurrentData().dateProfile.renderRange.start,
      end: this.Calendar.getCurrentData().dateProfile.renderRange.end
    }
    
    this.OnViewChange.emit({event: event, offset: offset});
  }

  onEventClick(arg: EventClickArg) {
    this.OnClick?.emit(arg);
  }

  onEventChange(arg: EventChangeArg) {
    if (this.isEditable) {
      this.OnChange?.emit(arg);
    }
  }

  onDateClick(arg: DateClickArg) {
    if (this.isEditable) {
      this.OnDateClick?.emit(arg);
    }
  }

}
