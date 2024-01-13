import { Component, OnInit } from '@angular/core';
import { EventClickArg, EventChangeArg, EventInput } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import * as moment from 'moment/moment';

import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { Schedule, Service, User, UserSchedule } from '../../models/core/entities';
import { ApiService } from '../../services/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth-service.service';
import { Subject } from 'rxjs';
import { rules } from '../../models/core/rules';
import { mapScheduleToEvent } from '../../utils/util';
import { CustomValidators, ValidatorsHelper } from '../../utils/validators';
import { LoaderService } from '../../services/loader.service';


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
  
  employees: User[] = [];
  customers: User[] = [];
  services: Service[] = [];
  events: EventInput[] = [];
  schedules: UserSchedule[] = []

  addEvent = new Subject();
  clearEvents = new Subject();

  selectedEmployes = new Array();
  selectedCustomers = new Array();
  selectedServices = new Array();
  
  filter! : {
    employee: number[],
    customer: number[],
    service: number[]
  }

  currentDateRange! : {
    start: Date,
    end: Date
  }

  oldScheduleDisabled = false;
  validHelper = ValidatorsHelper;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private authService: AuthService, private loader: LoaderService) {
    this.createForm();
    this.loadCrudResources();
    setTimeout(() => this.enableEdit.next(this.authService.TokenData?.role != "employee"), 100);
    this.filter = {
      employee: [],
      customer: [],
      service: []
    }
  }

  ngOnInit(): void {
  }
  
  // #region Form

  private createForm() {
    this.form = this.formBuilder.group({
      startDateTime: ["", [Validators.required, this.validateDates()]],
      finishDateTime: ["", [Validators.required, this.validateDates()]],
      price: [this.services[0]?.price, Validators.required],
      employee: ["", Validators.required],
      customer: ["", [
                      Validators.required, 
                      CustomValidators.notEqualsTo("employee", (o: User, c: User) => o && c && o.id !== c.id, 
                                                "O cliente não pode ser o mesmo que o funcionário")
                    ]],
      service: ["", Validators.required],
      schedule: [null],
      note: [""],
      id: [null],
      day: [],
    });

    this.checkFormValidation();
  }

  checkFormValidation() {
    if (!this.isEditEnable || this.disableFormByOldDate()) for( let value of Object.values(this.form.controls)) {
      value.disable();
    }

    if (!this.disableFormByOldDate()) for( let value of Object.values(this.form.controls)) {
      value.enable();
    }
  }

  disableFormByOldDate() {
    if (!this.form.get("startDateTime")?.value) {
      this.oldScheduleDisabled = false;
    }

    this.oldScheduleDisabled = moment(this.form.get("startDateTime")?.value).isBefore(new Date());
    return this.oldScheduleDisabled;
  }

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
          return {error: "O fim precisa ser antes das 23:00"}
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

  getValidHour(date: Date) {
    let hour = date.getHours();
    if  (hour >= rules.minHour && hour <= rules.maxHour) {
      return date.getHours();
    }
    return rules.minHour;
  }

  //#endregion

  //#region Members 'Handling click'

  onEventClick(arg: EventClickArg) {
    console.log(arg);
    
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

      this.checkFormValidation();

      // console.log(new Date(arg.event.extendedProps['schedule']['startDateTime']),
      // new Date(arg.event.extendedProps['schedule']['finishDateTime']));
    }
  }

  onEventChange(arg: EventChangeArg) {
    this.edit = true;

    let id = + arg.event._def.publicId;
    let schedule = this.schedules.find(x => x.id === id);

    if (schedule) {
      schedule.schedule.startDateTime = arg.event.start?.toISOString() as any;
      schedule.schedule.finishDateTime = arg.event.end?.toISOString() as any;

      if (this.isEditEnable && moment(schedule.schedule.finishDateTime).isBefore(moment())) {
        arg.revert();
        return
      }

      this.save(schedule, arg);
      
    }
  }

  onDateClick(arg: DateClickArg) {
    this.header = `Marcar horário - ${moment(arg.date).format("DD/MM/yy")}`;
    this.edit = false;
    this.visible = true;

    let startDate = structuredClone(arg.date)
    let finishDate = structuredClone(arg.date)

    startDate.setHours(this.getValidHour(arg.date));
    finishDate.setHours(this.getValidHour(arg.date) + 1);

    this.form.get("startDateTime")?.setValue(startDate);
    this.form.get("finishDateTime")?.setValue(finishDate);
    this.form.get("day")?.setValue(arg.date.getDate());

    console.log(this.form.value);

    this.checkFormValidation();
  }

  //#endregion

  //#region Members "Events"

  changeService(formService: any) {
    if (formService.value) {
      let service = formService.value;
      let form = this.form.value;
      this.form.get("price")?.setValue(form.price ?? service.price)
      
      if (service.timespan) {        

        if (form.startDateTime) {
          let endTime = moment(form.startDateTime).add(service.timespan, "minute").toDate();
          this.form.get("finishDateTime")?.setValue(endTime);
        }
      }
    }
  }

  onViewChange(arg: {event:any, offset: {start: Date, end: Date}} | undefined) {
    console.log(arg);
    if (arg) {
      this.currentDateRange = arg.offset;
      this.loadEvents(this.currentDateRange);
    }

  }

  changeEmployees(event: any) {
    this.clearEvents.next(0);
    if (event && event.value.length) {
      this.filter.employee = event.value.map((x: any) => x.id);
      let schedulesfiltered = this.schedules.filter(x => this.filter.employee.includes(x.employee.id));
      mapScheduleToEvent(schedulesfiltered).forEach(x => this.addEvent.next(x));
    } else {
      this.loadEvents(this.currentDateRange);      
      this.filter.employee = [];
    }
  }

  changeCustomers(event: any) {
    this.clearEvents.next(0);
    if (event && event.value.length) {
      this.filter.customer = event.value.map((x: any) => x.id);
      let schedulesfiltered = this.schedules.filter(x => this.filter.customer.includes(x.customer.id));
      mapScheduleToEvent(schedulesfiltered).forEach(x => this.addEvent.next(x));
    } else {
      this.loadEvents(this.currentDateRange);      
      this.filter.customer = [];
    }
  }

  changeServices(event: any) {
    this.clearEvents.next(0);
    if (event && event.value.length) {
      this.filter.service = event.value.map((x: any) => x.id);
      let schedulesfiltered = this.schedules.filter(x => this.filter.service.includes(x.schedule.service.id));
      mapScheduleToEvent(schedulesfiltered).forEach(x => this.addEvent.next(x));
    } else {
      this.loadEvents(this.currentDateRange);      
      this.filter.service = [];
    }
  }

  //#endregion

  //#region Filter

  doFilter(schedules: UserSchedule[]) {
    return schedules.filter(x => {
      if (this.filter.customer.length && !this.filter.customer.includes(x.customer.id)) {
        return false;
      } return true;})
      .filter(x => {
        if (this.filter.employee.length && !this.filter.employee.includes(x.employee.id)) {
          return false;
        } return true;
      })
      .filter(x => {
        if (this.filter.service.length && !this.filter.service.includes(x.schedule.service.id)) {
          return false;
        } return true;
      })
  }

  get hasFilter() {
    return this.filter.customer.length || this.filter.employee.length || this.filter.service.length;
  }

  clearFilter() {
    this.filter = {
      employee: [],
      customer: [],
      service: []
    }

    this.selectedCustomers = [];
    this.selectedEmployes = [];
    this.selectedServices = [];

    this.loadEvents(this.currentDateRange);
  }

  //#endregion

  confirm() {
    this.trySave()
    this.visible = false;
  }
  
  trySave() {
    const schedule = new UserSchedule();
    const form = structuredClone(this.form.value);   

    form.startDateTime = new Date(form.startDateTime);
    form.finishDateTime = new Date(form.finishDateTime);
    
    if (form.day) {
      form.startDateTime.setDate(form.day);
      form.finishDateTime.setDate(form.day);
    }

    schedule.customer= Object.assign({}, form.customer);
    schedule.employee = Object.assign({}, form.employee);
    schedule.id = form.id && form.id != "" ? form.id : 0;
    
    const scheduleSaved = this.schedules.find(x => x.id === form.id);

    schedule.schedule.note = form.note;
    schedule.schedule.price = form.price;
    schedule.schedule.service = Object.assign({}, form.service);
    schedule.schedule = scheduleSaved?.schedule ?? new Schedule();
    schedule.schedule.startDateTime = form.startDateTime.toISOString();
    schedule.schedule.finishDateTime = form.finishDateTime.toISOString();

    this.save(schedule);
  }

  tryDelete() {
    this.loader.showBackground();
    const id = this.form.value.id;
    const schedule = this.schedules.find(x => x.id = id);
    
    schedule && this.isEditEnable && this.api.sendToApi("Schedule/Cancel", schedule, false)?.subscribe({
      next: x => {
        if (x) {
          this.schedules = this.schedules.filter(x => x.id != id);
          this.clearEvents.next(this.events.filter(x => x.id == id));
        }
        
        this.visible = false;
        this.form.reset({note: "", id: 0});
      }, complete: () => this.loader.hideBackground()
    })
  }

  private loadCrudResources() {
    this.api.requestFromApi<Service[]>("Service", null, false)?.subscribe(x => this.services = x);
    this.api.requestFromApi<User[]>("User/Customers", null, false)?.subscribe(x => this.customers = x);
    this.api.requestFromApi<User[]>("User/Employees", null, false)?.subscribe(x => this.employees = x);
  }

  private async loadEvents(range: { start: Date, end: Date } | null = null) {
    let endpoint = range ? "Schedule/ScheduleDay" : "Schedule/Schedules";

    const params = range ? {
        startDate:range.start.toISOString(), endDate:range.end.toISOString(), 
        ignore: this.schedules.length ? this.schedules.map(x => + x.id!) : [] } : undefined;
      
    this.api.requestFromApi<UserSchedule[]>(endpoint, params)?.subscribe(
      x => {
        this.schedules.push(...x);
        this.events = mapScheduleToEvent(this.hasFilter ? this.doFilter(x) : x);
        this.addEvent.next(this.events)
      }
    )
  }

  private save(body: any, arg?: EventChangeArg) {
    this.loader.showBackground();
    this.isEditEnable && this.api.sendToApi("Schedule/Setup", body, false)?.subscribe({
      next: x => {
        if (x) {
          if (this.schedules.some(y => y.id == x)) {
            let index = this.schedules.findIndex(y => y.id == x);
            this.schedules[index] = body;
          } else {
            let schedule = {...body, id: x};
            this.schedules.push(schedule);
            this.addEvent.next(mapScheduleToEvent([schedule]));
          }
        }
  
        this.form.reset({note: "", id: 0});
      },
      error: x => arg ? arg.revert(): void 0,
      complete: () => this.loader.hideBackground()
    })
  }

}