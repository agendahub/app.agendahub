import { Component } from '@angular/core';
import { GetTableSchedulingListDto } from '../../models/dtos/dtos';
import { ApiService } from '../../services/api-service.service';
import { MessageService } from 'primeng/api';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  events: any[] = [];
  isEditing: boolean = false;

  name: string = 'Ana Maria';
  email: string = 'ana.maria@email.com';
  dob: string = '10 de Maio de 1985';
  phone: string = '(11) 98765-4321';

  rangeDates: Date[] | undefined;
  searchClient: string = '';
  schedulingList: GetTableSchedulingListDto[] = [];
  filteredSchedulingList: GetTableSchedulingListDto[] = [];

  constructor(private apiService: ApiService, private messageService: MessageService) { }

  ngOnInit() {
    this.getSchedulingList();
  }

  getSchedulingList() {
    this.apiService.requestFromApi<any>('Schedule/GetTableSchedulingList')
      .subscribe({
        next: (response: any) => {
          if (response && response.length > 0) {
            this.schedulingList = response.map((item: any) => ({
              name: item.customerName,
              finishDate: item.endDate,
            }));
            this.events = [...this.schedulingList];
            this.filterSchedulingList();
            console.log(this.events)
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

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveUserInfo() {
    this.isEditing = false;
  }

  filterSchedulingList() {
    this.filteredSchedulingList = this.schedulingList.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchClient.toLowerCase());
    });
  }
}
