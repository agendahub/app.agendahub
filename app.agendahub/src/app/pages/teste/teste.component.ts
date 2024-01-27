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
    <!-- <div class="w-screen h-screen bg-[#14052a] overflow-auto">

      <div class="flex">
        <div class="bg-[#23224a] py-2 px-3.5 h-screen fixed md:block hidden min-w-max" (click)="sidebarOpened = true" [ngClass]="{'relative': keepFixed}" (pointerleave)="sidebarOpened = keepFixed">
        
          <div class="h-full flex flex-col items-center gap-4">
              <img class="h-10 w-auto" [src]="icon" alt=""> 
              <div class="flex justify-center">
                <a class="text-white" [routerLink]="['']">
                  <i class="fas fa-home"></i>
                  <span *ngIf="sidebarOpened">Home</span>
                </a>
              </div>
              <div class="flex justify-center">
                <a class="text-white" [routerLink]="['schedule-link']">
                  <i class="fas fa-calendar"></i>
                  <span *ngIf="sidebarOpened">Schedule</span>
                </a>
              </div>
          </div>

          
            
        </div> 
    

        <div class="dark:text-white text-gray-900" style="height: 1000vh; padding: 5rem 1rem 5rem 6rem; max-height: 10rem; text-overflow: ellipsis">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quisquam perspiciatis sapiente eaque amet eveniet enim! Consequuntur, ducimus alias esse, quo officia explicabo voluptates aperiam, fugit sequi sunt ea! Quibusdam?
          </div>
      </div>
        
      
    </div> -->
    <div class="w-screen h-screen overflow-auto dark:bg-slate-700 backdrop-blur-lg bg-gray-300">

      <!-- nav storagex -->
      <!-- <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 shadow-md sticky top-0 left-0 z-40 min-h-[3.75rem]">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
        <img class="h-10 w-auto" [src]="icon" alt=""> 
      <button class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                    id="theme-toggle" type="button">
                    <svg id="theme-toggle-dark-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg id="theme-toggle-light-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            fill-rule="evenodd"
                            clip-rule="evenodd">
                        </path>
                    </svg>
                </button>
        </div>
      </nav> -->

      <!-- sidebar -->
      <sidebar></sidebar>

    </div>
    `,
})
export class TesteComponent implements OnInit {
  
  sidebarOpened: boolean = false
  keepFixed: boolean = false

  constructor() {
    
  }

  ngOnInit(): void {
    // this.toggleHandler()
  }

  get icon() {
            
    return this.sidebarOpened 
      ? "https://storage-production.up.railway.app/wwwroot/logos-agendahub/logo_texto_imagem.png"
      : "https://storage-production.up.railway.app/wwwroot/logos-agendahub/logo_imagem.png";
  }

  toggleHandler() {
    var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')!;
    var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')!;

    // Change the icons inside the button based on previous settings
    if (sessionStorage.getItem('color-theme') === 'dark' || (!('color-theme' in sessionStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }

    var themeToggleBtn = document.getElementById('theme-toggle')!;

    themeToggleBtn.addEventListener('click', function() {

        // toggle icons inside button
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        // if set via local storage previously
        if (sessionStorage.getItem('color-theme')) {
            if (sessionStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                sessionStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                sessionStorage.setItem('color-theme', 'light');
            }

        // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                sessionStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                sessionStorage.setItem('color-theme', 'dark');
            }
        }
        
    });
  }
}
