import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { PlatformModule } from '@angular/cdk/platform';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../services/api-service.service';
import { AuthService } from '../auth/auth-service.service';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    PlatformModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    PlatformModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
})
export class SharedModule { }
