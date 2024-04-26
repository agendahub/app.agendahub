import { AuthService } from './../../auth/auth-service.service';
import { EventService } from './../../models/services/event.service';
import { Component } from '@angular/core';
import { GetTableSchedulingListDto } from '../../models/dtos/dtos';
import { ApiService } from '../../services/api-service.service';
import { MessageService } from 'primeng/api';
import { co } from '@fullcalendar/core/internal-common';
import { ServiceUser, User } from '../../models/core/entities';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  events: any[] = [];
  isEditing: boolean = false;

  user!: User;

  rangeDates: Date[] | undefined;
  searchClient: string = '';
  schedulingList: GetTableSchedulingListDto[] = [];
  filteredSchedulingList: GetTableSchedulingListDto[] = [];

  constructor(private authService: AuthService, private apiService: ApiService, private eventService: EventService, private messageService: MessageService) { }

    
  ngOnInit(): void {
    this.getEvents();
    this.getInfoUser();
  }

  private getEvents() {
    this.eventService.getHistoricEvents()?.subscribe(x => {
      this.events = x;
      
    });
  }

  public getInfoUser(){
    let info = this.authService.getUserData();
    this.apiService.requestFromApi('user/' + info.nameid).subscribe((x: User) => {
      this.user = x;
    });
  }


  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveUserInfo() {
    this.isEditing = false;
  }

}