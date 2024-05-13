import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../../services/loader.service";
import { EventService } from "../../models/services/event.service";
import { Schedule, User, UserSchedule } from "../../models/core/entities";
import { SchedulesDateRangeEnum } from "../../models/core/enums";
import { FormControl } from "@angular/forms";
import { AuthService } from "../../auth/auth-service.service";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { OverlayPanel } from "primeng/overlaypanel";
import { mapScheduleToEvent } from "../../utils/util";
import { EventInput } from "@fullcalendar/core";
import { ScreenHelperService } from "../../services/screen-helper.service";
import * as moment from "moment";
import { Subject } from "rxjs";
import { ApiService } from "../../services/api-service.service";
import { GetTableSchedulingListDto } from "../../models/dtos/dtos";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  calendarOpen = false;
  faCalendar = faCalendar;
  inProgress = 0;
  concluded = 0;

  events: UserSchedule[] = [];
  eventsCalendar: EventInput[] = [];
  dateRanges = [
    { label: "Dia", index: 0 },
    { label: "Semana", index: 1 },
    { label: "Mês", index: 2 },
  ];
  dateRange: FormControl = new FormControl<{
    label: string;
    index: SchedulesDateRangeEnum;
  }>(this.dateRanges[2]);

  user!: User;

  schedules: UserSchedule[] = [];
  nextEvents: EventInput[] = [];
  enableEdit = new Subject<boolean>();
  addEvent = new Subject();

  currentDateRange!: {
    start: Date;
    end: Date;
  };

  schedulingList: any[] = [];

  constructor(
    private api: ApiService,
    private eventService: EventService,
    private auth: AuthService,
    public scHelp: ScreenHelperService
  ) {
    this.user = auth.getUserData();
    setTimeout(
      () => this.enableEdit.next(this.auth.TokenData?.role != "employee"),
      100
    );
  }

  ngOnInit(): void {
    this.getEvents();
    this.getSchedulingList();

    console.log(this.schedulingList);
  }

  onViewChange(
    arg: { event: any; offset: { start: Date; end: Date } } | undefined
  ) {
    if (arg) {
      this.currentDateRange = arg.offset;
      this.loadEvents(this.currentDateRange);
    }
  }

  private async loadEvents(range: { start: Date; end: Date } | null = null) {
    let endpoint = range ? "Schedule/ScheduleDay" : "Schedule/Schedules";

    const params = range
      ? {
          startDate: range.start.toISOString(),
          endDate: range.end.toISOString(),
          ignore: this.schedules.length
            ? this.schedules.map((x) => +x.id!)
            : [],
        }
      : undefined;

    this.api
      .requestFromApi<UserSchedule[]>(endpoint, params)
      ?.subscribe((x) => {
        this.schedules.push(...x);
        this.nextEvents = mapScheduleToEvent(this.events);
        this.addEvent.next(this.nextEvents);
      });
  }

  private getEvents() {
    this.eventService
      .getCurrentEvents(this.dateRange.value.index, 3)
      ?.subscribe((events: UserSchedule[]) => {
        this.events = events;
        
    // });
    // this.eventService
    //   .getCurrentEvents(this.dateRange.value.index, 0)
    //   ?.subscribe((events: UserSchedule[]) => {
        
        const eventsToday = events.filter((event) => {
          const today = moment().startOf("day");
          const tomorrow = moment().endOf("day");
          const eventDate = moment(event.schedule.startDateTime);
          return eventDate.isSameOrAfter(today) && eventDate.isBefore(tomorrow);
        });

        this.inProgress = eventsToday.length;
      });

    this.eventService
      .getCompletedDayEvents()
      ?.subscribe((events: UserSchedule[]) => {
        this.concluded = events.filter((event) => {
          return new Date(event.schedule.finishDateTime) < new Date();
        }).length;
      });
  }

  getDayName(date: Date) {
    return moment(date).format("dddd").toUpperCapital();
  }

  getWidth() {
    switch (this.scHelp.currentDevice()) {
      case 2:
        return "85%";
      case 1:
        return "65%";
      default:
        return "50%";
    }
  }

  getColor(userSchedule: UserSchedule) {
    return userSchedule.employee.color ?? "#1da1f2";
  }

  onChangeDateRange(event: any) {
    this.getEvents();
  }

  showCalendar(event: any, op: OverlayPanel, schedule: UserSchedule) {
    op.toggle(event);
    this.eventsCalendar = [];

    if (this.calendarOpen) {
      this.calendarOpen = false;
    } else
      setTimeout(() => {
        this.calendarOpen = true;
        this.eventsCalendar = mapScheduleToEvent([schedule]);
      });
  }

  getSchedulingList() {
    const startDate = moment().startOf("month").toDate().toISOString();
    const endDate = moment().add(1, "day").toDate().toISOString();

    this.api
      .requestFromApi<any>("Schedule/GetTableSchedulingList", {
        startDate,
        endDate,
      })
      .subscribe({
        next: (response: any) => {
          this.schedulingList = response;
          console.log(this.schedulingList); // Verifica os dados recebidos antes de atribuir à schedulingList
        },
        error: (error: any) => {
          console.error("Error fetching scheduling list:", error);
        },
      });
  }
}
