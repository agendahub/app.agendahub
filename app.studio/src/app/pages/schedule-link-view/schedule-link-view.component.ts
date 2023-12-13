import { Component, OnInit } from '@angular/core';
import { RetornoDto, ScheduleViewLinkDto } from '../../models/dtos/dtos';
import { ApiService } from '../../services/api-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { mapScheduleToEvent } from '../../utils/util';
import { MessageService } from 'primeng/api';
import { User } from '../../models/core/entities';
import * as moment from 'moment';

type Response = {schedules: any[], scheduleViewAccess: ScheduleViewLinkDto}

@Component({
  selector: 'app-schedule-link-view',
  templateUrl: './schedule-link-view.component.html',
  styleUrls: ['./schedule-link-view.component.scss']
})
export class ScheduleLinkViewComponent implements OnInit {

  response!: Partial<RetornoDto<Response>>
  tokenData!: ScheduleViewLinkDto
  schedules?: any[] = [] 
  token!: string;

  constructor(private apiService: ApiService, private messageService: MessageService, private router: ActivatedRoute) {
    this.token = this.getToken();
  }

  ngOnInit(): void {
    this.getSchedulesFromTokenLink();
  }

  getSchedulesFromTokenLink() {

    this.apiService.requestFromApi<Partial<RetornoDto<Response>>>("Schedule/GetSchedulesFromLinkView", {token: this.token})
      .subscribe({
        next: x => {
          this.response = x;
          this.schedules = undefined;
          console.log(x);
          
          if (!x.hasError) {
            
            setTimeout(() => {
              this.schedules = x.data!.schedules ? mapScheduleToEvent(x.data!.schedules) : [];
            }, 10);
            this.tokenData = x.data!.scheduleViewAccess;
            
            if (x.data!.schedules.length == 0) {
              this.messageService.add({severity:'info', summary: "Agenda livre!", detail: x.message, life: 2000});
            }
          }
          
        }, error: x => {
          console.log(x);
          this.response = {hasError: true, message: x.error.message, errorDescription: x.error.errorDescription};
        }
      })
  }

  getToken() {
    return this.router.snapshot.queryParams["token"];
  }

}
