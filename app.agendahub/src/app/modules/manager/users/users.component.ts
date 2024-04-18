import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-service.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScreenHelperService } from '../../../services/screen-helper.service';
import { customSort } from '../../../utils/util';
import { UserType } from '../../../models/core/entities';
import { FormUtils } from '../../../utils/form';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent {

  visible = false;
  
  edit = false;
  formUtils!: FormUtils;
  form!: FormGroup;
  formType!: FormGroup;
  needPassword = false;
  
  userTypes = new Array();
  users = new Array();

  customSort = customSort;

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
      userType: [null, Validators.required],
      dateBirth: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      color: [""],
      password: [""],
    })

    this.formUtils = new FormUtils(this.form);

    this.formType = formBuilder.group({
      id: [0],
      code: [""],
      description: [""],
    })
    
  }

  validatorIntern() {

  }

  colorIsSelectable() {
    const userType = this.form.get("userType")?.value;

    if (userType != null) {
      return userType?.code.includes("admin") || userType?.code.includes("employee");
    }
    
    return false;
  }

  deleteType(id:number) {
    this.apiService.deleteFromApi("UserType/" + id)?.subscribe(x => {
      console.log(x);
      if (x) {
        this.userTypes.splice(this.userTypes.findIndex(x => x.id === id), 1);
        this.reset();
      }
    })
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
        } 
        
        this.reset();
      }
    })
  }

  confirm() {
    const form = this.form.value;
    this.apiService.sendToApi("User", form)?.subscribe(result => {
      console.log(result);

      if (result && result != 0) {
        let index = this.users.findIndex(x => x.id == result);
        
        if (index === -1) {
          this.users.push(form);
          form.id = result;
        } else {
          this.users[index] = {...this.users[index], ...form};
        }

        this.reset();
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
        this.reset();
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

  reset() {
    this.visible = false;
    this.formType.reset({id: 0});
    this.form.reset({id:0, password: ""});
  }

  isDeletable(type: UserType) {
    return !["admin", "employee", "customer"].includes(type.code)
  }

}
