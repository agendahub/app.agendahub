import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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

}
