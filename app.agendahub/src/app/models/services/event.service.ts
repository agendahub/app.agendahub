import { Injectable } from "@angular/core";
import { ApiService } from "../../services/api-service.service";
import * as moment from "moment";
import { SchedulesDateRangeEnum } from "../core/enums";

@Injectable({
  providedIn: "root",
})
export class EventService {
  private today = moment();
  constructor(private apiService: ApiService) {}

  public getCurrentEvents(
    DateRangeType: SchedulesDateRangeEnum = 0,
    Quantity: number = 0
  ) {
    let query = "Schedule/ScheduleDay";
    let today = this.today.clone();
    let endDate = today.clone();

    switch (DateRangeType) {
      case 2:
        endDate = endDate.add(1, "month");
        break;
      case 1:
        endDate = endDate.add(1, "week");
        break;
    }

    let params = {
      startDate: today.toISOString(),
      endDate: endDate.toISOString(),
      onlyMine: true,
      quantity: Quantity,
    };

    console.log(params);

    return this.apiService.requestFromApi(query, params);
  }
  public getHistoricEvents() {
    let query = "Schedule/ScheduleDay";
    let today = this.today.clone();
    let startDate = today.clone().subtract(1, "month");

    let params = {
      startDate: startDate.toISOString(),
      endDate: today.toISOString(),
      onlyMine: true,
      quantity: 5,
    };

    return this.apiService.requestFromApi(query, params);
  }

  public getCompletedDayEvents() {
    let query = "Schedule/ScheduleDay";
    let now = this.today.clone();
    let startOfDay = now.clone().startOf("day");
    let endOfNow = now.clone().endOf("day");
    let params = {
      startDate: startOfDay.toISOString(),
      endDate: endOfNow.toISOString(),
      onlyMine: true,
    };

    return this.apiService.requestFromApi(query, params);
  }
}
