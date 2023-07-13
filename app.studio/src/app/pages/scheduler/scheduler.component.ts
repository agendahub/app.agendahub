import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, Calendar, EventClickArg, EventInput, EventChangeArg } from '@fullcalendar/core';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventDef } from '@fullcalendar/core/internal';
import { Service, User } from 'src/app/models/entities';
import { faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {

  @ViewChild("calendar")
  calendarComponent!: FullCalendarComponent;
  header!: string;
  clockIcon = faClock.iconName;

  visible = false;
  title!: string;
  date!: Date;

  startDateTime!: Date
  finishDateTime!: Date
  service!: Service
  employee!: User
  customer!: User
  price!: number

  services: Service[] = []
  employees: User[] = []
  customers: User[] = []


  calendarOptions: CalendarOptions = {
    locale:"pt-br",
    buttonText: {
      today: "Hoje",
      month: "Mês",
      day: "Dia",
      next: "Próximo",
      nextYear: "Próximo ano",
      prev: "Anterior",
      prevYear: "Ano anterior",
      week: "Semana"
    },
    headerToolbar: false,
    height: 'auto',
    initialView: 'timeGridFourDay',
    views: {
      timeGridFourDay: {
        type: 'timeGrid',
        allDaySlot: false,
        
        duration: { days: 5 },
        businessHours: true,
        slotMinTime: "08:00:00",
        slotMaxTime: "22:00:00"
      }
    },
    events: [],
    editable: true,
    selectable: true,
    plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin, listPlugin ],
    eventChange: this.onEventChange.bind(this),
    eventClick : this.onEventClick.bind(this),
    dateClick: this.onDateClick.bind(this),
    
  };

  views = [
    'listYear', 'listMonth', 'listWeek', 'listDay',
    'timeGridFourDay', 'timeGridWeek', 'timeGridDay',
    'dayGridYear', 'dayGridMonth', 'dayGridWeek', 'dayGridDay'
  ]

  view = 'timeGridFourDay';

  constructor() {
    setTimeout(() => {
      this.Calendar.addEventSource(this.events)
    }, 0)
  }

  private get Calendar(): Calendar {
    return this.calendarComponent.getApi();
  }

  changeView(event: any) {
    this.Calendar.changeView(event.value)
  }

  next() {
    this.Calendar.next();
  }

  previous() {
    this.Calendar.prev();
  }

  //#region Members 'Handling click'

  onEventClick(arg: EventClickArg) {
    this.header = "Editar horário"
    this.visible = true
    
    console.log(arg);
  }

  onEventChange(arg: EventChangeArg) {
    console.log(arg);
  }

  onDateClick(arg: DateClickArg) {
    this.header = "Marcar horário"
    this.visible = true
    let date = arg.date
    this.startDateTime = date;
    date.setHours(date.getHours() + 1);
    
    this.finishDateTime = date;

    console.log(arg);
  }

  confirm() {
    const event: EventInput = {
      id: (Math.random() * 100).toString(),
      title: this.title, 
      start: this.startDateTime,
      end: this.finishDateTime,
      editable: true,
      extendedProps: {
        start: this.startDateTime,
        end: this.finishDateTime,
      }
    }

    console.log(event);

    this.events = event;
    
    this.Calendar.addEvent(event);

    this.visible = false;
  }

  //#endregion

  //#region Members "Events"

  get events() : any[] {    
    return this.loadStorage()
  }

  set events(event:any) {
    let ev = this.events;
    ev.push(event);
    localStorage.setItem("events", JSON.stringify(ev));
  }
  
  loadStorage() {
    return Array.from(JSON.parse(localStorage.getItem("events")?? "[]"))
  }

  //#endregion


}
