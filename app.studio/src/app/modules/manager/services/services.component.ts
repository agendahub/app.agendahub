import { Component } from '@angular/core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  visible = false;
  faConfirm = faCheckCircle;
  faDelete = faTimesCircle;
  edit = false;

  confirm() {}
  tryDelete() {}


}
