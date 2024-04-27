import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../../../services/api-service.service";
import { MessageService } from "primeng/api";
import { CustomValidators } from "../../../../utils/validators";
import { AuthService } from "../../../../auth/auth-service.service";

@Component({
  selector: "app-security",
  templateUrl: "./security.component.html",
  styleUrls: ["./security.component.scss"],
})
export class SecurityComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private alert: MessageService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required, CustomValidators.notEqualsTo("oldPassword")]],
      confirmPassword: ["", [Validators.required, CustomValidators.equalsTo("newPassword")]],
    });

    this.form.get("newPassword")?.valueChanges.forEach((x) => this.form.get("confirmPassword")?.updateValueAndValidity());
  }

  save() {
    const { oldPassword, newPassword, confirmPassword } = this.form.value;
    if (newPassword !== confirmPassword) {
      this.alert.add({ severity: "warn", summary: "As senhas não conferem" });
      return;
    }

    this.auth
      .updatePassword({ oldPassword, newPassword, confirmPassword })
      .then((res: any) => {
        if (res.error.hasError) {
          return this.alert.add({ severity: "error", summary: "Erro ao atualizar senha", detail: res.error.error });
        }

        this.alert.add({ severity: "success", summary: "Senha atualizada com sucesso" });
        this.form.reset();
      })
      .catch((err) => {
        this.alert.add({ severity: "error", summary: "Erro ao atualizar senha", detail: err.error.message });
      });
  }
}
