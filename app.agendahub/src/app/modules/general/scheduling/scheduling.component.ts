import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-service.service';
import { MessageService } from 'primeng/api';
import { GetTableSchedulingListDto } from '../../../models/dtos/dtos';
import * as moment from 'moment';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {
  rangeDates: Date[] | undefined;
  searchClient: string = '';
  schedulingList: GetTableSchedulingListDto[] = [];
  filteredSchedulingList: GetTableSchedulingListDto[] = [];

  constructor(private apiService: ApiService, private messageService: MessageService) { }

  ngOnInit() {
    this.setDefaultDateRange();
    this.getSchedulingList();
  }

  setDefaultDateRange() {
    const endDate = moment().toDate(); // Data atual
    const startDate = moment().subtract(30, 'days').toDate(); // Data de 30 dias atrás

    this.rangeDates = [startDate, endDate];
  }

  getSchedulingList() {
    if (!this.rangeDates || this.rangeDates.length !== 2) {
      return;
    }

    const startDate = this.rangeDates[0].toISOString();
    const endDate = this.rangeDates[1].toISOString();

    this.apiService.requestFromApi<any>('Schedule/GetTableSchedulingList', { startDate, endDate })
      .subscribe({
        next: (response: any) => {
          if (response && response.length > 0) {
            this.schedulingList = response.map((item: any) => ({
              name: item.customerName,
              startDate: item.startDate,
              finishDate: item.endDate,
              appointmentCount: item.total
            }));
            this.filteredSchedulingList = [...this.schedulingList];
            this.filterSchedulingList();
          } else {
            this.schedulingList = [];
            this.filteredSchedulingList = [];
          }
        },
        error: (error: any) => {
          console.error('Error fetching scheduling list:', error);
        }
      });
  }

  filterSchedulingList() {
    this.filteredSchedulingList = this.schedulingList.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchClient.toLowerCase());
    });
  }

  onSearchChange() {
    this.filterSchedulingList();
  }
}
