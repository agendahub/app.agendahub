import { Calendar } from '@fullcalendar/core';

export type NavigatorFn = (nav: CalendarNavigator) => void;

export class CalendarNavigator {

    private _calendar!: Calendar;
    private _fns!: Array<Function>;

    public previousEnable: boolean = true;
    public nextEnable: boolean = true;

    constructor(calendar: Calendar, fns: Array<Function>) {
        this._calendar = calendar;
        this._fns = fns;
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