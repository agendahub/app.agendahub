import { Component } from '@angular/core';
import { faCheckCircle, faPenToSquare, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { ApiService } from '../../../services/api-service.service';
import { SortEvent } from 'primeng/api';
import { faList, faMagnifyingGlass, faPencil, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  visible = false;
  faConfirm = faCheckCircle;
  faDelete = faTimesCircle;
  faNew = faPlusCircle;
  faSearch = faMagnifyingGlass;
  faEdit = faPenToSquare
  faList = faList
  
  edit = false;
  form!: FormGroup;
  formType!: FormGroup;

  serviceTypes = new Array();
  services = new Array();

  constructor( private apiService: ApiService, private formBuilder: FormBuilder ) {
    apiService.requestFromApi("Service")?.subscribe(x => {
      this.services = x
    })
    apiService.requestFromApi("ServiceType")?.subscribe(x => {
      this.serviceTypes = x
    })

    this.form = formBuilder.group({
      id: [0],
      code: [""],
      description: [""],
      serviceType: [""],
      price: [""],
      note: [""],
    })

    this.formType = formBuilder.group({
      id: [0],
      code: [""],
      description: [""],
    })

    
    
  }

  customSort(event: SortEvent) {
    event.data?.sort((data1, data2) => {
        //@ts-ignore
        let value1 = data1[event.field];
        //@ts-ignore
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        //@ts-ignore
        return event.order * result;
    });
  }

  applyFilter(table: Table, event: any, mode: string) {
    table!.filterGlobal((event.target as HTMLInputElement).value, mode);
  }

  newType() {}

  confirmType() { 
    const form = this.formType.value;
    this.apiService.sendToApi("ServiceType", form)?.subscribe(x => {
      console.log(x);
      if (x) {
        if (!this.serviceTypes.some(x => x.id === x)) {
          form.id = x
          this.serviceTypes.push(form);
          this.formType.reset({id: 0})
        } 
        this.visible = false
      }
    })
  }

  confirm() {
    const form = this.form.value;
    
    console.log(form);
    
    this.apiService.sendToApi("Service", form)?.subscribe(x => {
      console.log(x);
      if (x) {
        if (!this.services.some(x => x.id === x)) {
          form.id = x
          this.services.push(form);
          this.formType.reset({id: 0})
        } 
        this.visible = false
      }
    })

  }

  change(service: any) {
    this.form.patchValue(service)
    console.log(this.form, service);
    
    this.edit = true;
    this.visible = true
  }
  
  tryDelete() {
    let service = this.form.value
    
    service.id && this.apiService.deleteFromApi("Service/" + service.id)?.subscribe(x => {
      console.log(x);

      if (x) {
        this.services.splice(this.services.findIndex(x => x.id === service.id), 1);
        this.visible = false
      }

      
    })
  }

}
