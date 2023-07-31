import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private loaderService: LoaderService) {

  }

}
