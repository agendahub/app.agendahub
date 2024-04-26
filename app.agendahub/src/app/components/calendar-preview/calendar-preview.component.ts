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
import { CalendarNavigator } from "./calendar-navigator";
import { DOCUMENT } from "@angular/common";
import { hexToRgbA, rgbToRgba, rgbaToRgb } from "../../utils/util";
import { SettingsService } from "../../modules/settings/services/settings.service";
import { SettingsApp } from "../../modules/settings/models/settingsApp";

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
  @Output() OnDateClick = new EventEmitter<DateClickArg>();
  @Output() OnChange = new EventEmitter<EventChangeArg>();
  @Output() OnClick = new EventEmitter<EventClickArg>();
  @Output() OnOptionsClick = new EventEmitter<any>();
  @Input() viewDateRange?: Array<Date>;
  @Input() editable!: Subject<boolean>;
  @Input() clearAll!: Subject<any>;
  @Input() addEvent!: Subject<any>;
  @Input() isEditable!: boolean;
  @Input() events!: Array<any>;
  @Input() header!: boolean;
  @Input() options = false;

  public view = "dayGridDayCustom";
  public viewTranslate = ["Mês", "Semana", "Dia"];

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

  public calendarOptions: CalendarOptions = {
    locale: "pt-br",
    height: "calc(100vh - 4.5rem - 64px)",
    aspectRatio: 0.8,
    headerToolbar: false,
    themeSystem: "bootstrap",
    navLinks: true,
    dayMaxEvents: 3,
    eventMinHeight: 50,
    stickyHeaderDates: true,
    eventClassNames: (arg) => {
      return [`text-gray-500`];
    },
    moreLinkClick: this.onMoreLinkClick.bind(this),
    moreLinkContent: (x) => `+${x.num} mais`,
    plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
    views: {
      dayGridDayCustom: {
        type: "timeGrid",
        allDaySlot: false,
        duration: { days: 1 },
        slotMinTime: moment().format("HH:mm:ss"),
        slotMaxTime: moment().add(5, "hours").format("HH:mm:ss"),
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

    if (!this.addEvent) {
      this.Calendar.addEventSource(this.events);
    }
  }

  public ngOnInit(): void {
    this.view = this.initView ?? "Semana";
    this.editable?.subscribe((x) => {
      this.isEditable = x;
      this.Calendar.setOption("editable", x);
      this.Calendar.setOption("selectable", x);
    });
  }

  public updateDateView(offset: { start: Date; end: Date }) {
    const range = { start: moment(offset.start), end: moment(offset.end) };

    this.datePreview = `${
      range.start.diff(range.end, "day") == -1
        ? range.end.format("DD")
        : range.start.format("DD") + " - " + range.end.format("DD")
    } 
            ${range.end.format("MMMM")}, ${range.end.format("YY")}
            `;
  }

  tab = this.view;
  set(tab: string) {
    this.tab = tab;
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

  private onMoreLinkClick(arg: any) {
    setTimeout(() => {
      const close = this.doc.querySelector(".fc-popover-close");
      const icon = this.doc.createElement("i");

      icon.setAttribute("class", "fas fa-times cursor-pointer");
      this.doc.body.onclick = () => {
        (close as any).click();
        this.doc.body.onclick = null;
      };

      close?.setAttribute("style", "display: none");
      close?.before(icon);
    }, 50);
  }

  private get initView() {
    this.Calendar.changeView(this.view);
    return this.view;
  }

  public get Calendar(): Calendar {
    return this.calendarComponent?.getApi();
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

        if (endTime.isAfter(closeTime)) {
          endTime = closeTime;
        }

        if (moment().add(5, "hours").isAfter(closeTime)) {
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
    const currentMonth = currentDate.getMonth();
    return months[currentMonth];
  }
}
