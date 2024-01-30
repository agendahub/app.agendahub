import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-teste',
    styles: [`
    :host {
      display: block;
      scroll-behavior: smooth;
    }
    `],
    template: `
    <div class="w-screen h-screen overflow-auto dark:bg-primary backdrop-blur-lg bg-clean">

      <sidebar></sidebar>

      
      <div class= "sm:pl-14 pl-0">
          <H1>CONTENT</H1>
      </div>

    </div>
    `,
})
export class TesteComponent {
  
  sidebarOpened: boolean = false
  keepFixed: boolean = false

}
