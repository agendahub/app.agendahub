import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  events: any[];
  
    constructor() { 
      this.events = [
        {
          status: 'Evento 1',
          date: '01/02/2024',
        },
        {
          status: 'Evento 2',
          date: '03/02/2024',

        },
        {
          status: 'Evento 3',
          date: '05/02/2024',
        },
        {
          status: 'Evento 4',
          date: '07/02/2024',
        },
        {
          status: 'Evento 5',
          date: '09/02/2024',
        },
        {
          status: 'Evento 6',
          date: '11/02/2024',
        }


      ];
    }
    

}
