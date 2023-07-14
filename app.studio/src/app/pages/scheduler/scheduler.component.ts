import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, Calendar, EventClickArg, EventInput, EventChangeArg } from '@fullcalendar/core';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment/moment';
import { Service, User } from 'src/app/models/entities';
import { faCalendarCheck, faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

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

  faPrev = faArrowCircleLeft;
  faNext = faArrowCircleRight;
  faOptions = faCalendarCheck;
  faConfirm = faCheckCircle;
  faDelete = faTimesCircle;

  visible = false;
  edit = false;

  startDateTime!: Date
  finishDateTime!: Date
  service!: Service
  employee!: User
  customer!: User
  price!: number

  services: Service[] = [];
  employees: User[] = [];
  customers: User[] = [];

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
        hiddenDays: [0],
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
    'timeGridFourDay', 'timeGridWeek', 'timeGridDay',
    'dayGridMonth', 'dayGridWeek', 'dayGridDay',
    'listWeek', 'listDay',
  ]

  viewTranslate = [
    "Padrão", "Horas semana", "Horas dia",
    "Grade mês", "Grade semana", "Grade dia",
    "Lista semana", "Lista dia",
  ]

  view = 'Padrão';
  private _v:any

  constructor() {
    setTimeout(() => {
      this.Calendar.addEventSource(this.events)
    }, 0)
  }

  private get Calendar(): Calendar {
    return this.calendarComponent.getApi();
  }

  changeView(event: any) {
    const indexView = this.viewTranslate.indexOf(event.value);
    this.Calendar.changeView(this.views[indexView]);
  }

  next() {
    this.Calendar.next();
  }

  previous() {
    this.Calendar.prev();
  }

  //#region Members 'Handling click'

  onEventClick(arg: EventClickArg) {
    this.header = `Editar horário - ${moment(arg.event.extendedProps['date']).format("DD/MM/yy")}`
    this.visible = true
    this.edit = true;
    
    console.log(arg);
  }

  onEventChange(arg: EventChangeArg) {
    console.log(arg);
    this.edit = true;
  }

  onDateClick(arg: DateClickArg) {
    this.header = `Marcar horário - ${moment(arg.date).format("DD/MM/yy")}`;
    let date = arg.date;
    this.startDateTime = date;
    date.setHours(date.getHours() + 1);
    this.finishDateTime = date;
    
    this.edit = false;
    
    console.log(arg);
    this.visible = true;

  }

  confirm() {
    const event: EventInput = {
      id: (Math.random() * 100).toString(),
      title: this.startDateTime.getMinutes().toString(),
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
