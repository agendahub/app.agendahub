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
import { AuthService } from '../../auth/auth-service.service';
import { Subject } from 'rxjs';
import { rules } from '../../models/rules';
import { mapScheduleToEvent } from '../../utils/util';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  faConfirm = faCheckCircle;
  faDelete = faTimesCircle;
  header!: string

  edit = false;
  visible = false;
  enableEdit = new Subject<boolean>();
  isEditEnable = this.authService.TokenData?.role != "employee";

  form!: FormGroup;
  
  events!: any[];
  employees: User[] = [];
  customers: User[] = [];
  services: Service[] = [];
  schedules: UserSchedule[] = []

  addEvent = new Subject();
  clearEvents = new Subject();

  selectedEmployes = new Array();
  filteredEmployes = new Array();

  constructor(private api: ApiService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.createForm();
    this.loadEvents();
    this.loadCrudResources();
    setTimeout(() => this.enableEdit.next(this.authService.TokenData?.role != "employee"), 100);
  }

  ngOnInit(): void {
  }

  private loadCrudResources() {
    this.api.requestFromApi<Service[]>("Service")?.subscribe(
      x => this.services = x
    );
    this.api.requestFromApi<User[]>("User/Customers")?.subscribe(
      x => this.customers = x
    );
    this.api.requestFromApi<User[]>("User/Employees")?.subscribe(
      x => this.employees = x
    );
  }

  private async loadEvents() {
    this.api.requestFromApi<UserSchedule[]>("Schedule/Schedules")?.subscribe(
      x => {
        this.schedules = x;
        this.events = mapScheduleToEvent(x);
        
        this.events.forEach(x => this.addEvent.next(x))

      }
    )
  }

  private createForm() {
    this.form = this.formBuilder.group({
      startDateTime: ["", [Validators.required, this.validateDates()]],
      finishDateTime: ["", [Validators.required, this.validateDates()]],
      price: [this.services[0]?.price, Validators.required],
      employee: ["", Validators.required],
      customer: ["", Validators.required],
      service: ["", Validators.required],
      schedule: [null],
      note: [""],
      id: [null],
      day: [],
    });

    if (!this.isEditEnable) for( let value of Object.values(this.form.controls)) {
      value.disable();
    }

    this.form.value;

  }

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
      this.form.get("note")?.setValue(schedule["schedule"]["note"])
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

    let startDate = structuredClone(arg.date)
    let finishDate = structuredClone(arg.date)
    startDate.setHours(rules.minHour);
    finishDate.setHours(rules.minHour + 1);

    this.form.get("startDateTime")?.setValue(startDate);
    this.form.get("finishDateTime")?.setValue(finishDate);
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
  
  validateDates() {
    return () => {
      if (this && this.form) {

        const dates = {
          start: this.form.get("startDateTime"),
          finish: this.form.get("finishDateTime"),
        }

        const base = {
          startBase: new Date(dates.start?.value),
          finishBase: new Date(dates.finish?.value)
        }

        base.startBase.setHours(rules.minHour);
        base.finishBase.setHours(rules.maxHour);
    
        if (moment(dates.start?.value).isBefore(base.startBase)) {
          return {error: "O início precisa ser após as 08:00"}
          
        } else if (moment(dates.finish?.value).isAfter(base.finishBase)) {
          return {error: "O fim precisa ser antes das 21:00"}
        }

        if (moment(dates.finish?.value).isBefore(dates.start?.value) || new Date(dates.finish?.value).getTime() === new Date(dates.start?.value).getTime()) {
          return {error: "O fim não pode ser antes ou igual o início"};
        } else {
          dates.start?.setErrors(null);
          dates.finish?.setErrors(null); 
        }

      }
  
      return null;
    }
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

    // offset
    //form.startDateTime.setHours(form.startDateTime.getHours() + 3)
    //form.finishDateTime.setHours(form.finishDateTime.getHours() + 3)

    schedule.id = form.id && form.id != "" ? form.id : 0;
    schedule.customer= Object.assign({}, form.customer);
    schedule.employee = Object.assign({}, form.employee);
    
    const scheduleSaved = this.schedules.find(x => x.id === form.id);

    schedule.schedule = scheduleSaved?.schedule ?? new Schedule();
    schedule.schedule.price = form.price;
    schedule.schedule.service = Object.assign({}, form.service);
    schedule.schedule.finishDateTime = form.finishDateTime.toISOString()
    schedule.schedule.startDateTime = form.startDateTime.toISOString()
    schedule.schedule.note = form.note;

    // console.log(schedule);
    this.save(schedule)
  }

  private save(body: any) {
    this.isEditEnable && this.api.sendToApi("Schedule/Setup", body)?.subscribe(x => {
      console.log(x);
      
      if (x) {
        this.clearEvents.next(null);
        this.loadEvents()
      }

      this.form.reset({note: "", id: 0});
    })
  }

  tryDelete() {
    let id = this.form.value.id;
    const schedule = this.schedules.find(x => x.id = id);
    
    // console.log(schedule);

    schedule && this.isEditEnable && this.api.sendToApi("Schedule/Cancel", schedule)?.subscribe(x => {
      console.log(x);
      
      if (x) {
        // this.Calendar.removeAllEvents();
        this.loadEvents();
        this.clearEvents.next(null)
        
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
