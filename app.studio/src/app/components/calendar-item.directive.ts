import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[calendarItem]'
})
export class CalendarItemDirective {

  @Input('enableForAll') enableForAll!: boolean;
  constructor(readonly template: TemplateRef<any>) {}

}
