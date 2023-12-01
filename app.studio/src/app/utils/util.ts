import { EventInput } from "@fullcalendar/core"
import { UserSchedule } from "../models/entities"
import { SortEvent } from "primeng/api"

export function mapScheduleToEvent(schedules: UserSchedule[], filter: (x: UserSchedule) => boolean = () => true) {
    let events: EventInput[] = []
    schedules.forEach(x => {
      filter(x) && events.push({
        id: x.id.toString(),
        title: `${x.employee.name} - ${x.customer.name}`,
        start: x.schedule.startDateTime,
        end: x.schedule.finishDateTime,
        color: x.employee.color,
        extendedProps: {...x}
      })
    })

    return events;
}

export function customSort(event: SortEvent) {
  event.data?.sort((data1, data2) => {
      
      let value1 = data1[event.field ?? ""];
      let value2 = data2[event.field ?? ""];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      
      return (event.order as number) * result;
  });
}