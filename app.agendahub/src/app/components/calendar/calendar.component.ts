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
import { SettingsService } from '../../modules/settings/services/settings.service';
import { SettingsApp } from '../../modules/settings/models/settingsApp';

var self: CalendarComponent;

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent
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

  public views = [
    "dayGridMonth",
    "timeGridFourDay",
    "dayGridDayCustom",
  ];
  public viewTranslate = [
    "Mês",
    "Semana",
    "Dia"
  ];
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
    this.checkPrevNext.bind(this),
    this.dispatchViewChange.bind(this),
  ]);
  public calendarOptions: CalendarOptions = {
    locale: "pt-br",
    height: "calc(100vh - 4.5rem - 64px)",
    aspectRatio: 0.8,
    nowIndicator: true,
    now: () => moment().format("YYYY-MM-DDTHH:mm:ss"),
    headerToolbar: false,
    themeSystem: "bootstrap",
    navLinks: true,
    dayMaxEvents: 3,
    eventMinHeight: 50,
    stickyHeaderDates: true,
    eventClassNames: (arg) => {
      return [`text-gray-500`];
    },
    navLinkDayClick: this.navLinkDayClick.bind(this.Calendar),
    moreLinkClick: this.onMoreLinkClick.bind(this),
    eventChange: this.onEventChange.bind(this),
    eventClick: this.onEventClick.bind(this),
    dateClick: this.onDateClick.bind(this),
    moreLinkContent: (x) => `+${x.num} mais`,
    initialView: this.views[this.localStorageService.get("view") ?? 0],
    plugins: [interactionPlugin, timeGridPlugin, dayGridPlugin],
    views: {
      timeGridFourDay: {
        type: "timeGrid",
        allDaySlot: false,
        duration: { days: 5 },
        hiddenDays: [0],
        slotMinTime: "08:00:00",
        slotMaxTime: "23:00:00",
      },
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
 
  constructor(private localStorageService: LocalStorageService, private settingsService: SettingsService, @Inject(DOCUMENT) private doc: Document) {
  self = this;
  this.state = {};
    this.settingsService.state('Appointments')
      .then(x => {
        this.settings = x;
      })
  }

  public ngAfterContentInit() { }

  public ngAfterViewInit(): void {
    this.configureCalendar();
    this.view = this.initView;
    this.dispatchViewChange();

    if (!this.addEvent) {
      this.Calendar.addEventSource(this.events);
    }

    if (this.viewDateRange) {
      this.checkPrevNext();
    }
  }

  public ngOnInit(): void {
    this.view = this.initView ?? "Semana";
    this.clearAll?.subscribe((x) => this.handleRemoveEvent(x));
    this.addEvent?.subscribe((x) => this.handleAddEvent(x));
    this.editable?.subscribe((x) => {
      this.isEditable = x;
      this.Calendar.setOption("editable", x);
      this.Calendar.setOption("selectable", x);
    });

    setTimeout(() => {
      this.nav.calendar = this.Calendar;
    }, 33);
    this.header = this.header ?? true;
  }

  public updateDateView(offset: { start: Date; end: Date }) {
    const range = { start: moment(offset.start), end: moment(offset.end) };
    
    this.datePreview = `${ range.start.diff(range.end, "day") == -1 ? range.end.format("DD") : range.start.format("DD") + " - " + range.end.format("DD")} 
            ${range.end.format("MMMM")}, ${range.end.format("YY")}
            `
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

  clickDay(day: {date: Date}) {
    if (this.view == "Mês") {
      return;
    }

    this.state["skipReload"] = true;
    this.view = this.viewTranslate[2];
    this!.changeView(this.view);
    this!.Calendar.gotoDate(day.date);
    delete this.state["skipReload"];
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
    if (this.editable) {
      return this.viewTranslate[this.localStorageService.get("view") ?? 0];
    } else {
      this.Calendar.changeView(this.views[0]);
      return this.views[0];
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

  private handleRemoveEvent(event: EventInput | EventInput[] | undefined) {
    if (event) {
      if (event instanceof Array) {
        event.forEach((e) => this.Calendar.getEventById(e.id!)?.remove());
      } else {
        this.Calendar.getEventById(event.id!)?.remove();
      }
    } else {
      this.Calendar.removeAllEvents();
    }
  }
  private configureCalendar() {
    const sync = setInterval(() => {
      if (this.settings) {
        clearInterval(sync);
        this.Calendar.setOption("businessHours", {
          daysOfWeek: this.settings.days.map(x => x),
          startTime: this.settings.openTime,
          endTime: this.settings.closeTime
        });
    
        this.Calendar.setOption("views", {
          timeGridFourDay: {
            type: 'timeGrid',
            allDaySlot: false,
            duration: { days: this.settings.days.length },
          }
        })
    
        const hiddenDays = [0, 1, 2, 3, 4, 5, 6].filter(x => !this.settings.days.includes(x));
        this.Calendar.setOption("hiddenDays", hiddenDays);
        this.Calendar.setOption("duration", { days: this.settings.days.length });
        this.Calendar.setOption("slotMinTime", moment(this.settings.openTime).format("HH:mm:ss")); 
        this.Calendar.setOption("slotMaxTime", moment(this.settings.closeTime).add(1, 'h').format("HH:mm:ss"));
      }
    }, 100);
  }

  private checkPrevNext() {
    if (this.viewDateRange) {
      let duration = this.Calendar.view.getOption("duration");

      if (duration) {
        let start = this.Calendar.view.currentStart;
        let end = this.Calendar.view.currentEnd;

        if (start && this.viewDateRange[0]) {
          let startDiff = moment(start).subtract(duration, "days");

          if (startDiff.isBefore(this.viewDateRange[0])) {
            this.nav.previousEnable = false;
          } else {
            this.nav.previousEnable = true;
          }
        }

        if (end && this.viewDateRange[1]) {
          let endDiff = moment(end).add(duration, "days");

          if (endDiff.isAfter(this.viewDateRange[1])) {
            this.nav.nextEnable = false;
          } else {
            this.nav.nextEnable = true;
          }
        }
      }
    }
  }

  private getDateRange() {
    return {
      start: this.Calendar.getCurrentData().dateProfile.renderRange.start,
      end: this.Calendar.getCurrentData().dateProfile.renderRange.end,
    };
  }

  private dispatchViewChange() {
    const offset = this.getDateRange(); 
    setTimeout(() => this.updateDateView(offset));
    this.OnViewChange.emit({ event: event, offset: offset });
  }

  public changeView(event: any) {
    const indexView = this.viewTranslate.indexOf(event);
    if (indexView != -1) {
      this.view = event;
      this.localStorageService.set("view", indexView);
      this.localStorageService.set("viewName", this.views[indexView]);
      this.Calendar.changeView(this.views[indexView]);

      if (!this.state["skipReload"]) {
        this.dispatchViewChange();
      }
    }
  }

  public onEventClick(arg: EventClickArg) {
    this.OnClick?.emit(arg);
  }

  public onEventChange(arg: EventChangeArg) {
    if (this.isEditable) {
      this.OnChange?.emit(arg);
    } else arg.revert();
  }

  public onDateClick(arg: DateClickArg) {
    if (this.isEditable) {
      this.OnDateClick?.emit(arg);
    }
  }

  public setEditable(value: boolean) {
    this.Calendar.setOption("editable", value);
    this.Calendar.setOption("selectable", value);
    this.Calendar.setOption("eventAllow", () => value);
  }

  public navLinkDayClick(this: CalendarApi, date: Date, jsEvent?: UIEvent) {
    self.state["skipReload"] = true;
    self.view = self.viewTranslate[2];
    self!.changeView(self.view);
    self!.Calendar.gotoDate(date);
    delete self.state["skipReload"];
  }
}
