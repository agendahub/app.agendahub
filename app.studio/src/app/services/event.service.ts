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
    let query = "Schedule/ScheduleDay";
    let today = this.today.clone();
    let endDate = today.clone();


    switch (DateRangeType) {
      case 2:
        // query += `&endDate=${endDate.add(1, "month").toISOString()}` 
        endDate = endDate.add(1, "month");
        break;
      case 1:
        // query += `&endDate=${endDate.add(1, "week").toISOString()}`
        endDate = endDate.add(1, "week");
        break;
    }

    let params = {
      startDate: today.toISOString(),
      endDate: endDate.toISOString()
    }

    console.log(params);
    

    return this.apiService.requestFromApi(query, params)
  }

}
 