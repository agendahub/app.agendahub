import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { PlatformModule } from '@angular/cdk/platform';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { ApiService } from '../services/api-service.service';
import { AuthService } from '../auth/auth-service.service';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    BrowserModule,
    PlatformModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ComponentsModule
  ],
  exports: [
    FormsModule,
    BrowserModule,
    PlatformModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ComponentsModule
  ],
  providers: [ApiService, AuthService, HttpClient],
})
export class SharedModule { }
