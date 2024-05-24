import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Access } from "../../../../auth/acess";
import { AuthService } from "../../../../auth/auth-service.service";
import { LoaderService } from "../../../../services/loader.service";
import { FormUtils } from "../../../../utils/form";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.scss"],
})
export class AppointmentsComponent implements OnInit {
  hasWriteAccess!: boolean;
  loading!: boolean;
  futils!: FormUtils;
  state: any;
  days = [
    { label: "Domingo", value: 0 },
    { label: "Segunda", value: 1 },
    { label: "Terça", value: 2 },
    { label: "Quarta", value: 3 },
    { label: "Quinta", value: 4 },
    { label: "Sexta", value: 5 },
    { label: "Sábado", value: 6 },
  ];

  constructor(private settings: SettingsService, private fb: FormBuilder, private auth: AuthService, private loader: LoaderService) {}

  ngOnInit(): void {
    this.checkAccess();
    this.createForm();
    this.loadState();
  }

  createForm() {
    this.futils = new FormUtils(
      this.fb.group({
        openTime: [{ value: "", disabled: !this.hasWriteAccess }, [Validators.required]],
        closeTime: [{ value: "", disabled: !this.hasWriteAccess }, [Validators.required]],
        sendEmailToCustomerScheduleDay: [{ value: false, disabled: !this.hasWriteAccess }],
        days: [{ value: "", disabled: !this.hasWriteAccess }, [Validators.required]],
        isOpen: [{ value: true, disabled: !this.hasWriteAccess }],
        changeOld: [{ value: false, disabled: !this.hasWriteAccess }],
      }),
    );
  }

  checkAccess() {
    this.hasWriteAccess = this.auth.getUserAccess() == Access.Admin;
  }

  async loadState() {
    this.loader.showById("appointments");
    this.state = await this.settings.state("Appointments");
    this.futils.form.patchValue(this.state);
    this.loader.hideById("appointments");
  }

  async save() {
    const form = this.futils.form.value;
    await this.settings.save("Appointments", form);
  }
}
