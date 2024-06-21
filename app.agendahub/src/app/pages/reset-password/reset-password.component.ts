import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "../../auth/auth-service.service";
import { getRandomImage } from "../../utils/util";
import { CustomValidators } from "../../utils/validators";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token!: string;
  image!: string;

  eyes = {
    pass: false,
    confirm: false,
  };

  constructor(private fb: FormBuilder, private authService: AuthService, private activated: ActivatedRoute, private alert: MessageService) {}

  ngOnInit(): void {
    this.buildForm();
    this.getToken();
    this.image = getRandomImage();
    this.changeBackground();
  }

  changeInterval: any;
  changeBackground() {
    this.changeInterval = setInterval(() => {
      this.image = getRandomImage();
    }, 1_000 * 30);
  }

  getToken() {
    this.token = this.activated.snapshot.params["token"];
  }

  buildForm() {
    this.resetForm = this.fb.group({
      email: [""],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required, CustomValidators.equalsTo("password")]],
    });

    this.resetForm.get("password")?.valueChanges.forEach((x) => this.resetForm.get("confirmPassword")?.updateValueAndValidity());
  }

  async resetPassword() {
    const form = this.resetForm.value;
    const response: any = await this.authService.resetPassword(this.token, form.password, form.email);

    if (response.error.hasError) {
      return this.alert.add({ severity: "error", summary: "Erro ao resetar senha!", detail: response.error.error });
    }

    this.authService.goFourth({
      timeout: 333,
      target: "login",
      beforeNavigate: () => this.alert.add({ severity: "success", summary: "Senha resetada com sucesso!", detail: "Redirecionando para login..." }),
      afterNavigate: () => clearInterval(this.changeInterval),
    });
  }
}
