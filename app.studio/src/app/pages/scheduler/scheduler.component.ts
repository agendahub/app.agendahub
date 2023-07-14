import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, Calendar, EventClickArg, EventInput, EventChangeArg } from '@fullcalendar/core';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment/moment';

import { faCalendarCheck, faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Service, User, UserSchedule } from '../../models/entities';
import { ApiService } from '../../services/api-service.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  form!: FormGroup;

  services: Service[] = [];
  employees: User[] = [];
  customers: User[] = [];
  schedules: UserSchedule[] = []

  calendarOptions: CalendarOptions = {
    locale:"pt-br",
    dayHeaderClassNames: ["uppercase", "tracking-tight", "text-right" , "font-sans"],
    
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



  constructor(private api: ApiService, private formBuilder: FormBuilder) {
    setTimeout(() => {
      this.Calendar.addEventSource(this.events);
      api.offline.subscribe(x => {
        console.log(x);
        
      })
    }, 0)

    this.loadResources();
    this.createForm();
  }

  private async loadResources() {
    this.api.requestFromApi<Service[]>("Service")?.subscribe(
      x => this.services = x
    );
    this.api.requestFromApi<User[]>("User/Customers")?.subscribe(
      x => this.customers = x
    );
    this.api.requestFromApi<User[]>("User/Employees")?.subscribe(
      x => this.employees = x
    );
    this.api.requestFromApi<UserSchedule[]>("Schedule/Schedules")?.subscribe(
      x => {
        this.schedules = x;
        this.mapSchedulesToEvent(x)
      }
    )
  }

  private createForm() {
    this.form = this.formBuilder.group({
      startDateTime: ["", Validators.required],
      finishDateTime: ["", Validators.required],
      service: ["", Validators.required],
      schedule: [null],
      employee: ["", Validators.required],
      customer: ["", Validators.required],
      price: [this.services[0]?.price, Validators.required],
      note: [""],
      id: [null]
    });

  }


  //#region Members "Calendar ItSelf"

  private get Calendar(): Calendar {
    return this.calendarComponent.getApi();
  }

  next() {
    this.Calendar.next();
  }

  previous() {
    this.Calendar.prev();
  }

  //#endregion

  //#region Members "View"

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

  changeView(event: any) {
    const indexView = this.viewTranslate.indexOf(event.value);
    this.Calendar.changeView(this.views[indexView]);
  }

  //#endregion

  //#region Members 'Handling click'

  onEventClick(arg: EventClickArg) {
    this.header = `Editar horário - ${moment(arg.event.extendedProps['date']).format("DD/MM/yy")}`
    
    
    this.form.get("startDateTime")?.setValue(arg.event.start);
    this.form.get("finishDateTime")?.setValue(arg.event.end ?? arg.event.start);
    this.form.get("customer")?.setValue(arg.event.extendedProps["customer"])
    this.form.get("service")?.setValue(arg.event.extendedProps["schedule"]["service"])
    this.form.get("schedule")?.setValue(arg.event.extendedProps["schedule"])
    this.form.get("employee")?.setValue(arg.event.extendedProps["employee"])
    this.form.get("id")?.setValue(arg.event.extendedProps["id"])
    
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
    this.edit = false;
    this.visible = true;
    
    this.form.get("startDateTime")?.setValue(arg.date);
    this.form.get("finishDateTime")?.setValue(arg.date);
        
    console.log(arg);
  }

  confirm() {

    
    this.trySave()
    this.visible = false;
  }

  //#endregion

  //#region Members "Events"

  get events() : any[] {    
    return this.loadStorage()
  }

  set events(event:any) {
    let ev = this.events;
    ev.push(...event);
    localStorage.setItem("events", JSON.stringify(ev));
  }
  
  loadStorage() {
    return Array.from(JSON.parse(localStorage.getItem("events")?? "[]"))
  }

  changeService(event: any) {
    if (event.value) {
      this.form.get("price")?.setValue(event.value.price)
    }
  }

  //#endregion

  mapSchedulesToEvent(schedules: UserSchedule[]) {
    let events: EventInput[] = []
    schedules.forEach(x => {
      events.push({
        id: x.id.toString(),
        title: `${x.employee.name} - ${x.customer.name}`,
        start: x.schedule.startDateTime,
        end: x.schedule.finishDateTime,
        extendedProps: {...x}
      })
    })
    events.forEach(x => this.Calendar.addEvent(x));
    console.log(events);
    
  }

  trySave() {
    const form = this.form.value;

    
    const schedule = new UserSchedule()
    
    schedule.id = form.id && form.id != "" ? form.id : 0;
    schedule.customer= Object.assign({}, form.customer);
    schedule.employee = Object.assign({}, form.employee);
    
    delete form.customer;
    delete form.employee;
    delete form.schedule;

    schedule.schedule = {...form, id: form.schedule?.id && form.schedule?.id != "" ? form.schedule?.id : 0}
    schedule.schedule.finishDateTime = schedule.schedule.finishDateTime.toISOString() as unknown as Date;
    schedule.schedule.startDateTime = schedule.schedule.startDateTime.toISOString() as unknown as Date;
    
    console.log(schedule);

    this.api.sendToApi("Schedule/Setup", schedule)?.subscribe(x => {
      console.log(x);
      
      if (x) {
        this.Calendar.removeAllEvents();
        this.loadResources()

        
      }

      this.form.reset();
    })


    
  }

  tryDelete() {
    let id = this.form.value.id;
    const schedule = this.schedules.find(x => x.id = id);
    
    console.log(schedule);

    schedule && this.api.sendToApi("Schedule/Cancel", schedule)?.subscribe(x => {
      console.log(x);
      
      if (x) {
        this.Calendar.removeAllEvents();
        this.loadResources();
        
      }

      this.visible = false;
    })
  }

}
