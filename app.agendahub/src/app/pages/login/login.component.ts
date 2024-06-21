import { Platform } from "@angular/cdk/platform";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { environment } from "../../../environments/environment.development";
import { AuthService } from "../../auth/auth-service.service";
import { getRandomImage, notNull } from "../../utils/util";

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

  eyes = {
    pass: false,
  };

  isDevelopment = !environment.production;
  company!: string;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private messageService: MessageService, private platform: Platform) {
    localStorage.clear();

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
    this.changeBackground();
  }

  changeInterval: any;
  changeBackground() {
    this.changeInterval = setInterval(() => {
      this.image = getRandomImage();
    }, 1_000 * 30);
  }

  get isMobile() {
    return this.platform.ANDROID || this.platform.IOS;
  }

  login() {
    const form = structuredClone(this.loginForm.value);

    let params = {
      isMobile: this.isMobile,
    };

    this.authService.login(form.login, form.password, this.company, params).subscribe({
      next: (result: any) => {
        console.log(result);

        if (result.success) {
          this.authService.goFourth({
            timeout: 333,
            target: "home",
            beforeNavigate: () => this.messageService.add({ severity: "success", summary: "Logado com sucesso!", detail: result.message }),
            afterNavigate: () => clearInterval(this.changeInterval),
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
