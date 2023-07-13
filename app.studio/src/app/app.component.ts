import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

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
    primeNG.overlayOptions = {
      appendTo: "body"
    }
  }

}
