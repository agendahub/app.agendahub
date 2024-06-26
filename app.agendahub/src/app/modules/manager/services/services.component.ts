import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Table } from "primeng/table";
import { ApiService } from "../../../services/api-service.service";
import { ScreenHelperService } from "../../../services/screen-helper.service";
import { FormUtils } from "../../../utils/form";
import { customSort } from "../../../utils/util";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent {
  visible = false;

  customSort = customSort;

  edit = false;
  form!: FormGroup;
  formType!: FormGroup;
  formUtils!: FormUtils;

  serviceTypes = new Array();
  services = new Array();

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, public sc: ScreenHelperService) {
    console.log(sc.specs);

    apiService.requestFromApi("Service")?.subscribe((x) => {
      this.services = x;
    });
    apiService.requestFromApi("ServiceType")?.subscribe((x) => {
      this.serviceTypes = x;
    });

    this.form = formBuilder.group({
      id: [0],
      code: [""],
      timespan: [""],
      description: [""],
      serviceType: [""],
      price: [""],
      note: [""],
    });

    this.formType = formBuilder.group({
      id: [0],
      code: [""],
      description: [""],
    });

    this.formUtils = new FormUtils(this.form);
  }

  deleteType(id: number) {
    this.apiService.deleteFromApi("ServiceType/" + id)?.subscribe((x) => {
      console.log(x);
      if (x) {
        this.serviceTypes.splice(
          this.serviceTypes.findIndex((x) => x.id === id),
          1,
        );
        this.visible = false;
      }
    });
  }

  applyFilter(table: Table, event: any, mode: string) {
    table!.filterGlobal((event.target as HTMLInputElement).value, mode);
  }

  confirmType() {
    const form = this.formType.value;
    this.apiService.sendToApi("ServiceType", form)?.subscribe((x) => {
      console.log(x);
      if (x) {
        if (!this.serviceTypes.some((x) => x.id === x)) {
          form.id = x;
          this.serviceTypes.push(form);
        }
        this.formType.reset({ id: 0 });
        this.visible = false;
      }
    });
  }

  confirm() {
    const form = this.form.value;

    console.log(form);

    this.apiService.sendToApi("Service", form)?.subscribe((result) => {
      console.log(result);
      if (result) {
        if (!this.services.some((service) => service.id === result)) {
          form.id = result;
          this.services.push(form);
        }
        this.form.reset({ id: 0 });
        this.visible = false;
      }
    });
  }

  change(service: any) {
    this.form.patchValue(service);
    console.log(this.form, service);

    this.edit = true;
    this.visible = true;
  }

  tryDelete() {
    let service = this.form.value;

    service.id &&
      this.apiService.deleteFromApi("Service/" + service.id)?.subscribe((x) => {
        console.log(x);

        if (x) {
          this.services.splice(
            this.services.findIndex((x) => x.id === service.id),
            1,
          );
          this.visible = false;
        }
      });
  }
}
