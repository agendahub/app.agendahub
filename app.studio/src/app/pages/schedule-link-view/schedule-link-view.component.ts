import { Component, OnInit } from '@angular/core';
import { RetornoDto, ScheduleViewLinkDto } from '../../models/dtos';
import { ApiService } from '../../services/api-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { mapScheduleToEvent } from '../../utils/util';
import { MessageService } from 'primeng/api';

type Response = {schedules: any[], scheduleAccessView: ScheduleViewLinkDto}

@Component({
  selector: 'app-schedule-link-view',
  templateUrl: './schedule-link-view.component.html',
  styleUrls: ['./schedule-link-view.component.scss']
})
export class ScheduleLinkViewComponent implements OnInit {

  response!: RetornoDto<Response>
  tokenData!: ScheduleViewLinkDto
  schedules: any[] = [] 
  token!: string;

  constructor(private apiService: ApiService, private messageService: MessageService, private router: ActivatedRoute) {
    this.token = this.getToken();
  }

  ngOnInit(): void {
    this.getSchedulesFromTokenLink();
  }

  getSchedulesFromTokenLink() {
    this.apiService.requestFromApi<RetornoDto<Response>>("Schedule/GetSchedulesFromLinkView", {token: this.token}).subscribe(x => {
      this.response = x;
      if (!x.hasError) {
        this.schedules = x.data.schedules ? mapScheduleToEvent(x.data.schedules) : [];
        this.tokenData = x.data.scheduleAccessView;

        if (x.data.schedules.length == 0) {
          this.messageService.add({severity:'info', summary: "Agenda livre!", detail: x.message, life: 2000});
        }
      }
      
    })
  }

  getToken() {
    return this.router.snapshot.queryParams["token"];
  }

}
