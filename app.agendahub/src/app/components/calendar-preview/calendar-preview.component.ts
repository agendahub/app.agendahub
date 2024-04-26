import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { LocalStorageService } from "../../services/local-storage.service";
import {
  faCalendarCheck,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { FullCalendarComponent } from "@fullcalendar/angular";
import {
  CalendarOptions,
  Calendar,
  EventClickArg,
  EventChangeArg,
  EventInput,
  CalendarApi,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Subject } from "rxjs";
import * as moment from "moment";
import { DOCUMENT } from "@angular/common";
import { hexToRgbA, rgbToRgba, rgbaToRgb } from "../../utils/util";
import { SettingsService } from "../../modules/settings/services/settings.service";
import { SettingsApp } from "../../modules/settings/models/settingsApp";
import { CalendarNavigator } from "../calendar/calendar-navigator";

var self: CalendarPreviewComponent;

@Component({
  selector: "app-calendar-preview",
  templateUrl: "./calendar-preview.component.html",
  styleUrls: ["./calendar-preview.component.scss"],
})
export class CalendarPreviewComponent
  implements OnInit, AfterViewInit, AfterContentInit
{
  @ViewChild("calendar")
  calendarComponent!: FullCalendarComponent;

  @Output() OnViewChange = new EventEmitter<{
    event: any;
    offset: { start: Date; end: Date };
  }>();

  @Output() OnChange = new EventEmitter<EventChangeArg>();
  @Output() OnClick = new EventEmitter<EventClickArg>();
  @Output() OnOptionsClick = new EventEmitter<any>();
  @Input() viewDateRange?: Array<Date>;
  @Input() editable!: Subject<boolean>;
  @Input() clearAll!: Subject<any>;
  @Input() addEvent!: Subject<any>;
  @Input() isEditable!: false;
  @Input() events!: Array<any>;
  @Input() header!: boolean;
  @Input() options = false;

  public views = "dayGridDayCustom";
  public viewTranslate = ["Mês", "Semana", "Dia"];
  public view!: string;

  public faOptions = faCalendarCheck;

  public faConfirm = faCheckCircle;
  public faDelete = faTimesCircle;

  public state!: Record<string, any>;
  public datePreview = moment().format("MMMM").toUpperCapital();
  public today = moment();

  public fork = {
    rgbToRgba: rgbToRgba,
    rgbaToRgb: rgbaToRgb,
    hexToRgba: hexToRgbA,
  };

  public nav: CalendarNavigator = new CalendarNavigator(this.Calendar, [
    this.dispatchViewChange.bind(this),
  ]);
  public calendarOptions: CalendarOptions = {
    locale: "pt-br",
    height: "auto",
    aspectRatio: 0.8,
    headerToolbar: false,
    themeSystem: "bootstrap",
    navLinks: true,
    dayMaxEvents: 3,
    eventMinHeight: 50,
    stickyHeaderDates: true,
    editable: false,
    eventClassNames: (arg) => {
      return [`text-gray-500`];
    },
    initialView: this.views,
    plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
    views: {
      dayGridDayCustom: {
        type: "timeGrid",
        allDaySlot: false,
        duration: { days: 1 },
        slotMinTime: "08:00:00",
        slotMaxTime: "23:00:00",
      },
    },
  };

  private settings!: SettingsApp;

  constructor(
    private localStorageService: LocalStorageService,
    private settingsService: SettingsService,
    @Inject(DOCUMENT) private doc: Document
  ) {
    self = this;
    this.state = {};
    this.settingsService.state("Appointments").then((x) => {
      this.settings = x;
    });
  }

  public ngAfterContentInit() {}

  public ngAfterViewInit(): void {
    this.configureCalendar();
    this.view = this.initView;
    this.dispatchViewChange();

    if (!this.addEvent) {
      this.Calendar.addEventSource(this.events);
    }
  }

  public ngOnInit(): void {
    this.view = this.initView ?? "Semana";
    this.addEvent?.subscribe((x) => this.handleAddEvent(x));
    this.editable?.subscribe((x) => {
      this.isEditable = false;
      this.Calendar.setOption("editable", x);
      this.Calendar.setOption("selectable", x);
    });
  }

  momentHeader(day: any) {
    let m = moment(day.date);
    if (this.view == "Mês") {
      m = m.add(1, "day");
    }
    return m;
  }

  isToday(day: any) {
    let mom = this.momentHeader(day);
    return mom.isSame(moment(), "d") || mom.get("e") == moment().get("e");
  }

  formatHeaderDay(day: any, format: string) {
    let m = this.momentHeader(day);

    let dayNumber = m.date();
    let dayName = m.format(format);

    return {
      dayNumber: dayNumber,
      dayName: dayName,
    };
  }

  private get initView() {
    if (this.editable) {
      return this.viewTranslate[
        this.localStorageService.get("view") ?? this.views
      ];
    } else {
      this.Calendar.changeView(this.views);
      return this.views;
    }
  }

  public get Calendar(): Calendar {
    return this.calendarComponent?.getApi();
  }

  private handleAddEvent(event: EventInput | EventInput[]) {
    const checkEvent = (e: EventInput) => {
      var enable = this.isEditable && moment(e.end).isAfter(moment());
      e.durationEditable = enable;
      e.startEditable = enable;
      e.interactive = enable;
      e.editable = enable;
    };

    if (event instanceof Array) {
      event.forEach((e) => checkEvent(e));
      this.Calendar.addEventSource(event);
    } else {
      checkEvent(event);
      this.Calendar.addEvent(event);
    }
  }

  private configureCalendar() {
    const sync = setInterval(() => {
      if (this.settings) {
        clearInterval(sync);
        const openTime = moment().startOf("hour");
        const closeTime = moment(this.settings.closeTime, "HH:mm:ss").startOf(
          "hour"
        );

        const currentTime = moment().startOf("hour");
        let endTime = moment().add(5, "hours").startOf("hour");

        if (endTime.isBefore(closeTime)) {
          endTime = closeTime;
        }

        this.Calendar.setOption("businessHours", {
          daysOfWeek: this.settings.days.map((x) => x),
          startTime: openTime.format("HH:mm:ss"),
          endTime: closeTime.format("HH:mm:ss"),
        });

        const hiddenDays = [0, 1, 2, 3, 4, 5, 6].filter(
          (x) => !this.settings.days.includes(x)
        );
        this.Calendar.setOption("hiddenDays", hiddenDays);
        this.Calendar.setOption("duration", {
          days: this.settings.days.length,
        });
        this.Calendar.setOption("slotMinTime", currentTime.format("HH:mm:ss"));
        this.Calendar.setOption(
          "slotMaxTime",
          endTime.add(1, "h").format("HH:mm:ss")
        );
      }
    }, 100);
  }

  private getDateRange() {
    return {
      start: this.Calendar.getCurrentData().dateProfile.renderRange.start,
      end: this.Calendar.getCurrentData().dateProfile.renderRange.end,
    };
  }

  private dispatchViewChange() {
    const offset = this.getDateRange();
    this.OnViewChange.emit({ event: event, offset: offset });
  }

  public getMonthHeader(): string {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const currentDate = new Date();
    return `${currentDate.getDate()}/${months[currentDate.getMonth()]}`;
  }
}
