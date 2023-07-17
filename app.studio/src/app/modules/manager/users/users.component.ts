import { Component } from '@angular/core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { ApiService } from '../../../services/api-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  users = []

  visible = false;
  faConfirm = faCheckCircle;
  faDelete = faTimesCircle;
  edit = false;

  confirm() {}
  tryDelete() {}

  constructor( private apiService: ApiService ) {
    apiService.requestFromApi("User")?.subscribe(x => {
      this.users = x
    })
  }

}
