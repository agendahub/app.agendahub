import { Component, ViewChild } from '@angular/core';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarData, EventStore } from '@fullcalendar/core/internal';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {

  visible = false;
  date!: Date;
  title!: string

  calendarOptions: CalendarOptions = {
    locale:"pt-br",
    buttonText: {
      today: "Hoje",
      month: "Mês",
      day: "Dia",
      next: "Próximo",
      nextYear: "Próximo ano",
      prev: "Anterior",
      prevYear: "Ano anterior",
      week: "Semana"
    },
    height: 'auto',
    initialView: 'timeGridFourDay',
    views: {
      timeGridFourDay: {
        type: 'timeGrid',
        allDaySlot: false,
        duration: { days: 4 },
        slotMinTime: "08:00:00",
        slotMaxTime: "20:00:00"
      }
    },
    editable: true,
    selectable: true,
    plugins: [interactionPlugin, timeGridPlugin ],
    dateClick: this.onDateClick.bind(this),
  };

  @ViewChild("calendar")
  calendarComponent!: FullCalendarComponent;

  private get Calendar(): Calendar {
    return this.calendarComponent.getApi();
  }

  onDateClick(arg: DateClickArg) {
    this.visible = true
    this.date = arg.date;

  }

  confirm() {
    console.log({
      title: this.title, date: this.date
    });
    
    this.Calendar.addEvent({
      title: this.title, date: this.date
    });

    this.visible = false;
  }

}
