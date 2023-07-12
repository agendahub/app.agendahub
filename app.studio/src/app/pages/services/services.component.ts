import { Component } from '@angular/core';
import { Service } from 'src/app/models/entities';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  services: Service[] = []

  constructor(private apiService: ApiService) {
    apiService.requestFromApi<Service[]>("Service").subscribe(r => this.services = r);
  }
}
