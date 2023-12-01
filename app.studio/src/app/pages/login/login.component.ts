import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private messageService: MessageService, private platform: Platform) {
    this.loginForm = formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get isMobile() {
    return this.platform.ANDROID || this.platform.IOS;
  }
  
  login() {
    const form = structuredClone(this.loginForm.value);

    this.authService.login(form.login, form.password, {isMobile: this.isMobile}).subscribe((result: any) => {
      console.log(result);
      
      if (result.success) {
        this.authService.goFourth({
          target: "home",
          beforeNavigate: () => this.messageService.add({severity: "success", summary: "Logado com sucesso!", detail: result.message}), 
          afterNavigate: () => this.messageService.add({severity: "success", summary: "Visualize suas tarefas para hoje!"})
        })

      } else {
        this.messageService.add({severity: "error", summary: "Erro ao logar!", detail: result.message})
      }


    });
  }
}
