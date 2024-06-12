import { Component, OnInit } from "@angular/core";
import { EventInput } from "@fullcalendar/core";
import * as moment from "moment";
import { Subject } from "rxjs";
import { AuthService } from "../../auth/auth-service.service";
import { User, UserSchedule } from "../../models/core/entities";
import { SchedulesDateRangeEnum } from "../../models/core/enums";
import { EventService } from "../../models/services/event.service";
import { ApiService } from "../../services/api-service.service";
import { ScreenHelperService } from "../../services/screen-helper.service";
import { prettyPercent } from "../../utils/number";
import { convertMinutesPretty } from "../../utils/time";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  inProgress = 0;
  concluded = 0;

  events: UserSchedule[] = [];
  eventsCalendar: EventInput[] = [];

  user!: User;

  schedules: UserSchedule[] = [];
  enableEdit = new Subject<boolean>();
  addEvent = new Subject();
  schedulingList: any[] = [];

  analytics: any = {};

  constructor(private api: ApiService, private eventService: EventService, private auth: AuthService, public scHelp: ScreenHelperService) {
    this.user = auth.getUserData();
    setTimeout(() => this.enableEdit.next(this.auth.TokenData?.role != "employee"), 100);
  }

  ngOnInit(): void {
    this.getEvents();
    this.getAnalytics();
    this.getSchedulingList();
  }

  private getEvents() {
    this.eventService.getCurrentEvents(SchedulesDateRangeEnum.Month, 3)?.subscribe((events: UserSchedule[]) => {
      this.events = events;

      const eventsToday = events.filter((event) => {
        const today = moment().startOf("day");
        const tomorrow = moment().endOf("day");
        const eventDate = moment(event.schedule.startDateTime);
        return eventDate.isSameOrAfter(today) && eventDate.isBefore(tomorrow);
      });

      this.inProgress = eventsToday.length;
    });

    this.eventService.getCompletedDayEvents()?.subscribe((events: UserSchedule[]) => {
      this.concluded = events.filter((event) => {
        return new Date(event.schedule.finishDateTime) < new Date();
      }).length;
    });
  }

  private getAnalytics() {
    this.api.requestFromApi<any>("api/UserSchedule/GetAnalyticsPreview").subscribe({
      next: (response: any) => {
        this.analytics = {
          ...response,
          totalTime: convertMinutesPretty(response.totalTime),
          timeIncrease: response.percentTime,
          amountIncrease: response.percentAmount,
          servicesIncrease: response.percentServices,
          schedulesIncrease: response.percentSchedules,
          percentTime: prettyPercent(response.percentTime),
          percentAmount: prettyPercent(response.percentAmount),
          percentServices: prettyPercent(response.percentServices),
          percentSchedules: prettyPercent(response.percentSchedules),
        };

        console.log(this.analytics);
      },
      error: (error: any) => {
        console.error("Error fetching analytics:", error);
      },
    });
  }

  getDayName(date: Date) {
    return moment(date).format("dddd").toUpperCapital();
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
