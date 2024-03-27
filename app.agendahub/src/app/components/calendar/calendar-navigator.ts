import { Calendar } from "@fullcalendar/core";

export type NavigatorFn = (nav: CalendarNavigator) => void;

export class CalendarNavigator {
  private _calendar!: Calendar;
  private _fns!: Array<Function>;

  public previousEnable!: boolean;
  public nextEnable!: boolean;

  constructor(calendar: Calendar, fns: Array<Function>) {
    this.previousEnable = true;
    this._calendar = calendar;
    this.nextEnable = true;
    this._fns = fns;
    setTimeout(() => {
      this.swipe();
    }, 200);
  }

  public set calendar(calendar: Calendar) {
    this._calendar = calendar;
  }

  public next() {
    this._calendar.next();
    if (this._fns) this._fns.forEach((x) => x(this));
  }

  public previous() {
    this._calendar.prev();
    if (this._fns) this._fns.forEach((x) => x(this));
  }

  swipe() {
    let self = this;
    let skip = false;
    let endX: number;
    let startX: number;

    function handleTouch() {
      if (endX - startX < 0) {
        self.next();
      } else {
        self.previous();
      }
    }

    const calendar = document.querySelector("#calendar");

    self._calendar.on("eventDragStart", () => {
      skip = true;
    });

    self._calendar.on("eventDragStop", () => {
      skip = false;
    });

    calendar?.addEventListener("touchstart", (e: any) => {
      startX = e.touches[0].clientX;
    });

    calendar?.addEventListener("touchend", (e: any) => {
      endX = e.changedTouches[0].clientX;
      if (Math.abs(endX - startX) === 0 || skip) return;
      handleTouch();
    });
  }
}
