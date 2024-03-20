import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-service.service';
import { MessageService } from 'primeng/api';
import { GetTableSchedulingListDto } from '../../../models/dtos/dtos';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent {
  rangeDates: Date[] | undefined;
  searchClient: string = '';
  schedulingList: GetTableSchedulingListDto[] = [];
  filteredSchedulingList: GetTableSchedulingListDto[] = [];

  constructor(private apiService: ApiService, private messageService: MessageService) { }

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
    this.filteredSchedulingList = this.schedulingList.filter(item =>
      item.CustomerName.toLowerCase().includes(this.searchClient.toLowerCase())
    );
  }

  onSearchChange() {
    this.filterSchedulingList();
  }
}
