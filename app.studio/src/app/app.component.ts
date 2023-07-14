import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>

    <div class="relative overflow-hidden">
      <router-outlet></router-outlet>
    </div>

  `,
  styles: []
})
export class AppComponent {

  constructor(private primeNG: PrimeNGConfig) {
    // moment.updateLocale("pt-br", null)
    moment.locale("pt-br")
    
    
    primeNG.overlayOptions = {
      appendTo: "body"
    }
  }

}
