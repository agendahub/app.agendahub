import { Component } from '@angular/core';

@Component({
  selector: 'app-manager',
  template: `
  <div class="bg-blend-hue bg-opacity-40 bg-slate-900   text-white text-5xl mx-auto max-w-7xl sm:px-6 lg:px-8 lg:rounded-lg md:rounded-md rounded-none p-2" >
    <div class="w-50">
        <span class="text-4xl font-bold tracking-tight sm:text-6xl">
            Gestão
        </span>
    </div>
    <div class="flex justify-center gap-3">
      <a href="/manager/services" class="block rounded-lg p-3 text-sm font-semibold leading-7 text-gray-50 hover:bg-gray-900">Serviços</a>
      <a href="/manager/users" class="block rounded-lg p-3 text-sm font-semibold leading-7 text-gray-50 hover:bg-gray-900">Usuários</a>
    </div>
</div>`,
  styles: []
})
export class ManagerComponent {

}