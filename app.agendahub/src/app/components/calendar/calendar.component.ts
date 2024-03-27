import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  inject,
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
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Subject } from "rxjs";
import * as moment from "moment";
import { CalendarItemDirective } from "./calendar-item.directive";
import { CalendarNavigator } from "./calendar-navigator";
import { DOCUMENT } from "@angular/common";
import { Tooltip } from "primeng/tooltip";
import { hexToRgbA, isMobile, rgbToRgba, rgbaToRgb } from "../../utils/util";

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

  @ContentChildren(CalendarItemDirective)
  calendarItems!: QueryList<CalendarItemDirective>;
  calendarItemsArray!: Array<CalendarItemDirective>;

  @Output() OnViewChange = new EventEmitter<{
    event: any;
    offset: { start: Date; end: Date };
  }>();
  @Output() OnDateClick = new EventEmitter<DateClickArg>();
  @Output() OnChange = new EventEmitter<EventChangeArg>();
  @Output() OnClick = new EventEmitter<EventClickArg>();
  @Input() viewDateRange?: Array<Date>;
  @Input() editable!: Subject<boolean>;
  @Input() clearAll!: Subject<any>;
  @Input() addEvent!: Subject<any>;
  @Input() isEditable!: boolean;
  @Input() events!: Array<any>;
  @Input() header!: boolean;

  public views = [
    "dayGridMonth",
    "timeGridFourDay",
    "dayGridWeek",
    "dayGridDayCustom",
  ];
  public viewTranslate = ["Mês", "Hora semana", "Semana", "Dia"];
  public view = "Hora semana";

  public faNext = faArrowCircleRight;
  public faOptions = faCalendarCheck;
  public faPrev = faArrowCircleLeft;
  public faConfirm = faCheckCircle;
  public faDelete = faTimesCircle;

  public state!: Record<string, any>;
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
    height: "auto",
    dayMaxEvents: 3,
    nowIndicator: true,
    now: () => moment().format("YYYY-MM-DDTHH:mm:ss"),
    headerToolbar: false,
    themeSystem: "bootstrap",
    navLinks: true,
    eventMinHeight: 50,
    stickyHeaderDates: true,
    eventClassNames: (arg) => {
      return [`text-gray-500`];
    },
    eventMouseEnter: this.handleTooltip.bind(this),
    eventMouseLeave: this.handleTooltip.bind(this),
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

  constructor(
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private doc: Document
  ) {
    self = this;
    this.state = {};
  }

  public ngAfterContentInit() {
    this.calendarItemsArray = this.isEditable
      ? this.calendarItems.toArray()
      : this.calendarItems.toArray().filter((x) => x.enableForAll);
  }

  public ngAfterViewInit(): void {
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

  public get month(): string {
    return moment(this.Calendar?.getDate()).format("MMMM").toUpperCapital();
  }

  momentHeader(day: any) {
    let m = moment(day.date);
    if (this.view == "Mês") {
      m = m.subtract(1, "day");
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
    if (this.editable) {
      return this.viewTranslate[this.localStorageService.get("view") ?? 0];
    } else {
      this.Calendar.changeView(this.views[0]);
      return this.views[0];
    }
  }

  private get Calendar(): Calendar {
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
    console.log(event);

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

  @ViewChild("tooltip") tooltip!: ElementRef<HTMLDivElement>;
  private handleTooltip(event: { event: any; el: any; jsEvent: any }) {
    if (isMobile()) {
      return;
    }

    const color = event.el.style.backgroundColor;

    const toggle = (type: "enter" | "leave") => {
      event.el.style.backgroundColor = rgbToRgba(rgbaToRgb(color), 0.5);
      this.tooltip.nativeElement.style.zIndex = "0";
      this.tooltip.nativeElement.classList.remove(
        type == "enter" ? "hidden" : "block"
      );
      this.tooltip.nativeElement.classList.add(
        type == "enter" ? "block" : "hidden"
      );
    };

    if (event.jsEvent.type == "mouseleave") {
      return toggle("leave");
    }

    const coord = event.el.getBoundingClientRect();
    this.tooltip.nativeElement.style.top = event.jsEvent.y - 40 + "px";
    this.tooltip.nativeElement.style.left = coord.left + coord.width / 3 + "px";

    toggle("enter");

    setTimeout(() => this.tooltip.nativeElement.style.zIndex = "99999", 75);
    event.el.style.color = color;
    event.el.style.backgroundColor = rgbToRgba(color, 0.6);
    this.tooltip.nativeElement.innerHTML = event.event.title;
    this.tooltip.nativeElement.style.top = coord.top - this.tooltip.nativeElement.clientHeight - 7 + "px";
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

  private dispatchViewChange() {
    const offset = {
      start: this.Calendar.getCurrentData().dateProfile.renderRange.start,
      end: this.Calendar.getCurrentData().dateProfile.renderRange.end,
    };

    this.OnViewChange.emit({ event: event, offset: offset });
  }

  public changeView(event: any) {
    const indexView = this.viewTranslate.indexOf(event.value);
    if (indexView != -1) {
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

  public navLinkDayClick(this: CalendarApi, date: Date, jsEvent: UIEvent) {
    self.state["skipReload"] = true;
    self.view = self.viewTranslate[1];
    self!.changeView({ value: self.view });
    self!.Calendar.gotoDate(date);
    delete self.state["skipReload"];
  }
}
