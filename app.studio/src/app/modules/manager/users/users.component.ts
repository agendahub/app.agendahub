import { Component } from '@angular/core';
import { faCheckCircle, faPenToSquare, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { ApiService } from '../../../services/api-service.service';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlusCircle, faMagnifyingGlass, faList, faGear, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { ScreenHelperService } from '../../../services/screen-helper.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  
  visible = false;
  faConfirm = faCheckCircle;
  faDelete = faTimesCircle;
  faNew = faPlusCircle;
  faSearch = faMagnifyingGlass;
  faGear = faUserGear
  faList = faList
  
  edit = false;
  form!: FormGroup;
  formType!: FormGroup;
  needPassword = false;
  
  userTypes = new Array();
  users = new Array();

  constructor( private apiService: ApiService, private formBuilder: FormBuilder, public sc: ScreenHelperService ) {
    apiService.requestFromApi("User")?.subscribe(x => {
      this.users = x
    })
    apiService.requestFromApi("UserType")?.subscribe(x => {
      this.userTypes = x
    })

    this.form = formBuilder.group({
      id: [0],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      userType: ["", Validators.required],
      
      email: ["", Validators.required],
      phone: ["", Validators.required],
      dateBirth: ["", Validators.required],
      password: [""],
    })

    this.formType = formBuilder.group({
      id: [0],
      code: [""],
      description: [""],
    })

    
    
  }

  deleteType(id:number) {
    this.apiService.deleteFromApi("UserType/" + id)?.subscribe(x => {
      console.log(x);
      if (x) {
        this.userTypes.splice(this.userTypes.findIndex(x => x.id === id), 1);
        this.visible = false
      }
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

  confirmType() { 
    const form = this.formType.value;
    this.apiService.sendToApi("UserType", form)?.subscribe(x => {
      console.log(x);
      if (x) {
        if (!this.userTypes.some(x => x.id === x)) {
          form.id = x
          this.userTypes.push(form);
          this.formType.reset({id: 0})
        } 
        this.visible = false
      }
    })
  }

  confirm() {
    const form = this.form.value;
    
    console.log(form);
    
    this.apiService.sendToApi("User", form)?.subscribe(x => {
      console.log(x);
      if (x && x != 0) {
        if (!this.users.some(x => x.id === x)) {
          form.id = x
          this.users.push(form);
        } 
        this.visible = false
        this.form.reset()
      }
    })

  }

  change(user: any) {
    this.form.patchValue(user)
    this.form.get("dateBirth")?.setValue(new Date(user.dateBirth));
    console.log(this.form, user);
    
    this.edit = true;
    this.visible = true
  }
  
  tryDelete() {
    let user = this.form.value
    
    user.id && this.apiService.deleteFromApi("User/" + user.id)?.subscribe(x => {
      console.log(x);

      if (x) {
        this.users.splice(this.users.findIndex(x => x.id === user.id), 1);
        this.visible = false
      }

      
    })
  }

  onChangeUser(event: any) {
    console.log(event);
    
    if (event && event.value) {
      if (!new String(event.value.code).includes("customer")) {
        this.needPassword = true;
      } else {
        this.needPassword = false;
      }
    }
  }

}
