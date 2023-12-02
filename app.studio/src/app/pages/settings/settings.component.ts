import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api-service.service';
import { ScheduleViewLinkDto } from '../../models/dtos';
import { CustomValidators } from '../../utils/validators';
import { customSort } from '../../utils/util';
import { environment } from '../../../environments/environment.development';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  form!: FormGroup;
  today = new Date();

  employees: any[] = [];
  services: any[] = [];

  linkEnvironment = environment.uiUrl + "schedule-link?token=";

  viewLinks: ScheduleViewLinkDto[] = [];
  dialog = false;

  constructor(private formB: FormBuilder, private apiService: ApiService) {
    this.form = this.formB.group({
      timePeriod: [[], Validators.required],
      expirationDate: ['', [Validators.required, CustomValidators.dateRange]],
      employee: ['', Validators.required],
      service: ['']
    });
   }
  
  ngOnInit() {
    this.getResources();
  }

  prepareForm() {
    let form = this.form.value;

    return {
      expirationDate: form.expirationDate,
      fromDateTime: form.timePeriod[0],
      toDateTime: form.timePeriod[1],
      employee: form.employee,
      service: form.service,
    }
  }

  createLink() {
    let value = this.prepareForm();
    console.log(this.form.value, value);
    
    this.apiService.sendToApi("Schedule/CreateLinkView", value).subscribe(x => {
      console.log(x);
    })
  }

  getResources() {
    this.apiService.requestFromApi<any>("Service").subscribe(x => {
      this.services = x;
    });

    this.apiService.requestFromApi<any>("User/Employees").subscribe(x => {
      this.employees = x;
    })

    this.apiService.requestFromApi<any>("Schedule/LinksView").subscribe(x => {
      this.viewLinks = x;
    })

  }

  toggle(link: ScheduleViewLinkDto) {
    this.apiService.updateToApi("Schedule/ToggleActiveLink", null, {linkId: link.id}).subscribe(x => {
      console.log(x);
      if (x instanceof Error) return;
      link.isActive = !link.isActive;
    })
  }

  remove(link: ScheduleViewLinkDto) {
    this.apiService.deleteFromApi("Schedule/DeleteLinkView", {linkId: link.id}).subscribe(x => {
      console.log(x);
      if (x instanceof Error) return;
      if (x) {
        this.viewLinks.splice(this.viewLinks.findIndex(x => x.id === link.id), 1);
      }
    })
  }

}
