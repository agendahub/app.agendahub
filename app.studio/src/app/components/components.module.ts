import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderComponent } from './loader/loader.component';
import { AnimateModule } from 'primeng/animate';

@NgModule({
  declarations: [
    NavComponent,
    LoaderComponent
  ],
  exports: [
    NavComponent,
    LoaderComponent
  ],
  imports: [
    ProgressSpinnerModule,
    AppRoutingModule,
    AnimateModule,
    CommonModule
  ]
})
export class ComponentsModule { }
