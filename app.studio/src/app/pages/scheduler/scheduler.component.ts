import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Schedule, Service, User, UserSchedule } from '../../models/entities';
import { ApiService } from '../../services/api-service.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

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
  events = new Array();

  selectedEmployes = new Array();
  filteredEmployes = new Array();

  constructor(private api: ApiService, private formBuilder: FormBuilder, private localStorageService: LocalStorageService) {
    setTimeout(() => {
      this.Calendar.addEventSource(this.events);
      
    }, 0)

    this.loadResources();
    this.createForm();

    this.view = this.viewTranslate[this.localStorageService.get("view") ?? 0]
  }

  ngOnInit(): void {
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
      day: [],
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

  views = ['timeGridFourDay', 'dayGridMonth', 'dayGridWeek', 'dayGridDay']
  viewTranslate = ["Padrão", "Grade mês", "Grade semana", "Grade dia"]

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
    editable: true,
    selectable: true,
    plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin, listPlugin ],
    eventChange: this.onEventChange.bind(this),
    eventClick : this.onEventClick.bind(this),
    dateClick: this.onDateClick.bind(this),
  };

  view = 'Padrão';
  private _v:any

  changeView(event: any) {

    const indexView = this.viewTranslate.indexOf(event.value);
    if (indexView != -1) {
      this.localStorageService.set("view", indexView)
      this.localStorageService.set("viewName", this.views[indexView])
    }
    
    this.Calendar.changeView(this.views[indexView]);
  }

  //#endregion

  //#region Members 'Handling click'

  onEventClick(arg: EventClickArg) {
    this.header = `Editar horário - ${moment(arg.event.extendedProps['schedule']['startDateTime']).format("DD/MM/yy")}`
    
    let id = + arg.event._def.publicId;
    let schedule = this.schedules.find(x => x.id === id);

    if (schedule) {
      this.form.get("id")?.setValue(id);
      this.form.get("day")?.setValue(new Date(arg.event.extendedProps['schedule']['startDateTime']).getDate());
      this.form.get("startDateTime")?.setValue(new Date(arg.event.extendedProps['schedule']['startDateTime']));
      this.form.get("finishDateTime")?.setValue(new Date(arg.event.extendedProps['schedule']['finishDateTime']));
      this.form.get("service")?.setValue(schedule["schedule"]["service"])
      this.form.get("price")?.setValue(schedule["schedule"]["price"])
      this.form.get("customer")?.setValue(schedule["customer"])
      this.form.get("schedule")?.setValue(schedule["schedule"])
      this.form.get("employee")?.setValue(schedule["employee"])
      
      this.visible = true
      this.edit = true;

      console.log(new Date(arg.event.extendedProps['schedule']['startDateTime']),
      new Date(arg.event.extendedProps['schedule']['finishDateTime']));
    }
  }

  onEventChange(arg: EventChangeArg) {
    this.edit = true;

    let id = + arg.event._def.publicId;
    let schedule = this.schedules.find(x => x.id === id);

    if (schedule) {
      schedule.schedule.startDateTime = arg.event.start?.toISOString() as any;
      schedule.schedule.finishDateTime = arg.event.end?.toISOString() as any;

      this.save(schedule);
      
    }
  }

  onDateClick(arg: DateClickArg) {
    this.header = `Marcar horário - ${moment(arg.date).format("DD/MM/yy")}`;
    this.edit = false;
    this.visible = true;

    let date = structuredClone(arg.date)
    this.form.get("startDateTime")?.setValue(date);
    this.form.get("finishDateTime")?.setValue(date);
    this.form.get("day")?.setValue(arg.date.getDate());

    console.log(this.form.value);
    

  }

  confirm() {
    this.trySave()
    this.visible = false;
  }

  //#endregion

  //#region Members "Events"

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
        start: new String(x.schedule.startDateTime).replace("Z", ""),
        end: new String(x.schedule.finishDateTime).replace("Z", ""),
        extendedProps: {...x}
      })
    })
    events.forEach(x => this.Calendar.addEvent(x));
    console.log(events);
    
  }

  trySave() {

    const form = structuredClone(this.form.value);   
    const schedule = new UserSchedule()

    // console.log(form);

    form.startDateTime = new Date(form.startDateTime);
    form.finishDateTime = new Date(form.finishDateTime);
    
    if (form.day) {
      form.startDateTime.setDate(form.day);
      form.finishDateTime.setDate(form.day);
    }

    schedule.id = form.id && form.id != "" ? form.id : 0;
    schedule.customer= Object.assign({}, form.customer);
    schedule.employee = Object.assign({}, form.employee);
    
    const scheduleSaved = this.schedules.find(x => x.id === form.id);

    schedule.schedule = scheduleSaved?.schedule ?? new Schedule();
    schedule.schedule.price = form.price;
    schedule.schedule.service = Object.assign({}, form.service);
    schedule.schedule.finishDateTime = form.finishDateTime as any
    schedule.schedule.startDateTime = form.startDateTime as any
    schedule.schedule.note = form.note;

    // console.log(schedule);
    this.save(schedule)
  }

  private save(body: any) {
    this.api.sendToApi("Schedule/Setup", body)?.subscribe(x => {
      console.log(x);
      
      if (x) {
        this.Calendar.removeAllEvents();
        this.loadResources()
      }

      this.form.reset({note: ""});
    })
  }

  tryDelete() {
    let id = this.form.value.id;
    const schedule = this.schedules.find(x => x.id = id);
    
    // console.log(schedule);

    schedule && this.api.sendToApi("Schedule/Cancel", schedule)?.subscribe(x => {
      console.log(x);
      
      if (x) {
        this.Calendar.removeAllEvents();
        this.loadResources();
        
      }

      this.visible = false;
    })
  }

  filterEmployee(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.employees as any[]).length; i++) {
        let country = (this.employees as any[])[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.filteredEmployes = filtered;
  }

}
