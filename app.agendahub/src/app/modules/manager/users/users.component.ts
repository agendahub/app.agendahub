import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Table } from "primeng/table";
import { ApiService } from "../../../services/api-service.service";
import { ScreenHelperService } from "../../../services/screen-helper.service";
import { FormUtils } from "../../../utils/form";
import { customSort } from "../../../utils/util";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
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

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, public sc: ScreenHelperService) {
    apiService.requestFromApi("User")?.subscribe((x) => {
      this.users = x;
    });
    apiService.requestFromApi("UserType")?.subscribe((x) => {
      this.userTypes = x;
    });

    this.formUtils = new FormUtils(
      formBuilder.group({
        id: [0],
        name: ["", Validators.required],
        surname: ["", Validators.required],
        userType: [null, Validators.required],
        dateBirth: ["", Validators.required],
        email: ["", Validators.required],
        phone: ["", Validators.required],
        color: [""],
        isActive: [true],
        password: [""],
      }),
    );

    this.form = this.formUtils.form;

    this.formType = formBuilder.group({
      id: [0],
      code: [""],
      description: [""],
    });
  }

  hide() {
    this.formUtils.reset();
  }

  colorIsSelectable() {
    const userType = this.form.get("userType")?.value;

    if (userType != null) {
      return userType?.code.includes("admin") || userType?.code.includes("employee");
    }

    return false;
  }

  applyFilter(table: Table, event: any, mode: string) {
    table!.filterGlobal((event.target as HTMLInputElement).value, mode);
  }

  confirm() {
    const form = this.form.value;
    this.apiService.sendToApi("User", form)?.subscribe((result) => {
      if (result && result != 0) {
        let index = this.users.findIndex((x) => x.id == result);

        if (index === -1) {
          this.users.push(form);
        } else {
          this.users[index] = { ...this.users[index], ...form };
        }

        this.reset();
      }
    });
  }

  change(user: any) {
    this.form.patchValue(user);
    this.form.get("dateBirth")?.setValue(new Date(user.dateBirth));

    this.edit = true;
    this.visible = true;
  }

  tryDelete() {
    let user = this.form.value;

    user.id &&
      this.apiService.deleteFromApi("User/" + user.id)?.subscribe((x) => {
        if (x) {
          this.users.splice(
            this.users.findIndex((x) => x.id === user.id),
            1,
          );
          this.reset();
        }
      });
  }

  onChangeUser(event: any) {
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
    this.formUtils.reset();
  }
}
