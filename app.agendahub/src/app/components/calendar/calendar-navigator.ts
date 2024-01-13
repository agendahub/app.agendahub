import { Calendar } from '@fullcalendar/core';

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
    }

    public set calendar(calendar: Calendar) {
        this._calendar = calendar;
    }

    public next() {
        this._calendar.next();
        if (this._fns) 
            this._fns.forEach(x => x(this))
      }
    
    public previous() {
        this._calendar.prev();
        if (this._fns) 
            this._fns.forEach(x => x(this))
    }
}