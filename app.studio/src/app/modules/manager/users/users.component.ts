import { Component } from '@angular/core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

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

}
