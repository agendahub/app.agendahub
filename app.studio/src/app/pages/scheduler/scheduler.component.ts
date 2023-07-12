import { Component } from '@angular/core';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
  calendarOptions: CalendarOptions = {
    locale:"pt-br",
    editable: true,
    slotLabelFormat: "HH:mm",
    allDayText: "24 horas",
    // headerToolbar: false,
    selectable: true,
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

    navLinkDayClick: (a) => console.log(a),
    

    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };
}
