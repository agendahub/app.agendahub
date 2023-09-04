import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';
import * as moment from 'moment';
import { SchedulesDateRangeEnum } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private today = moment();
  constructor(private apiService: ApiService) { }

  public getCurrentEvents(DateRangeType: SchedulesDateRangeEnum = 0) {
    let query = "Schedule/ScheduleDay?date=" + this.today.toISOString();
    let endDate = this.today.clone();

    switch (DateRangeType) {
      case 2:
         query += `&endDate=${endDate.add(1, "month").toISOString()}` 
        break;
      case 1:
        query += `&endDate=${endDate.add(1, "week").toISOString()}`
        break;
    }

    console.log(query);
    

    return this.apiService.requestFromApi(query)
  }

}
 