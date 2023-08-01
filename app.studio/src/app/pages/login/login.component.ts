import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private messageService: MessageService) {
    this.loginForm = formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  
  login() {
    const form = structuredClone(this.loginForm.value);

    this.authService.login(form.login, form.password).subscribe((result: any) => {
      console.log(result);
      
      if (result.result.success) {
        this.messageService.add({severity: "success", summary: "Logado com sucesso!", detail: result.result.message})
        location.assign("/home");
      } else {
        this.messageService.add({severity: "error", summary: "Erro ao logar!", detail: result.result.message})
      }


    });
  }
}
