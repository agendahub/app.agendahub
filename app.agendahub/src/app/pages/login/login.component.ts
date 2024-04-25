import { Component, Inject, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth-service.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { defer } from "../../types/typing";
import { getRandomImage, notNull } from "../../utils/util";
import { of, delay, firstValueFrom } from "rxjs";
import { Moment } from "moment";
import * as moment from "moment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  forgotten: boolean = false;
  sending: boolean = false;
  send: boolean = false;
  sendCountDown: number = 10;
  tries: number = 0;

  loginForm!: FormGroup;
  forgotForm!: FormGroup;

  image!: string;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private messageService: MessageService, private platform: Platform) {
    this.loginForm = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.forgotForm = this.formBuilder.group({
      email: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.image = getRandomImage();
  }

  get isMobile() {
    return this.platform.ANDROID || this.platform.IOS;
  }

  login() {
    const form = structuredClone(this.loginForm.value);

    this.authService.login(form.login, form.password, { isMobile: this.isMobile }).subscribe({
      next: (result: any) => {
        console.log(result);

        if (result.success) {
          this.authService.goFourth({
            timeout: 333,
            target: "home",
            beforeNavigate: () => this.messageService.add({ severity: "success", summary: "Logado com sucesso!", detail: result.message }),
          });
        } else {
          this.messageService.add({ severity: "error", summary: "Erro ao logar!", detail: result.message });
        }
      },
      error: (err: any) => {
        this.messageService.add({ severity: "error", summary: "Erro ao logar!", detail: err.message });
      },
    });
  }

  remember() {
    this.forgotten = false;
  }

  forgot() {
    const login = this.loginForm.value.login;

    if (notNull(login) && typeof login == "string" && login.includes("@")) {
      this.forgotForm.reset({ email: login });
    }

    this.forgotten = true;
  }

  async sendRecover() {
    this.sending = true;
    this.tries = 0.6;
    const email = this.forgotForm.value.email;
    await this.authService.forgotPassword(email);

    this.sending = false;
    this.send = true;

    this.countDown();
  }

  private countDown() {
    let count = setInterval(() => {
      this.sendCountDown--;

      if (this.sendCountDown === 0) {
        clearInterval(count);
        this.sendCountDown = 10;
        this.send = false;
        this.tries += 0.6;
      }
    }, 1000);
  }
}
