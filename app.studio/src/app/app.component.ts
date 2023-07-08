import { Component } from '@angular/core';
import { faAnchor } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  template: `
    <div class="relative overflow-hidden bg-white">
  <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
    <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
      <div class="sm:max-w-lg">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Summer styles are finally here
          <fa-icon [icon]="faCoffee"></fa-icon>
        </h1>
        <p class="mt-4 text-xl text-gray-500">This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you live or die.</p>
      </div>
    </div>
  </div>
</div>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'app.studio';
  faCoffee = faAnchor;
}
