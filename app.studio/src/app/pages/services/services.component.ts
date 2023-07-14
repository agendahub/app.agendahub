import { Component } from '@angular/core';
import { Service } from '../../models/entities';
import { ApiService } from '../../services/api-service.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  services: Service[] = []

  constructor(private apiService: ApiService) {
    apiService.requestFromApi<Service[]>("Service")?.subscribe(r => this.services = r);
  }
}
