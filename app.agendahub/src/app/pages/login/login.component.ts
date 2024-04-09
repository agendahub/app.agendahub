import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  image! : string;

  constructor(@Inject(DOCUMENT) private document: Document,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private platform: Platform) {
    this.loginForm = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required]
    });

  }

  ngOnInit(): void {
    this.image = this.getRandomImage();
  }

  get isMobile() {
    return this.platform.ANDROID || this.platform.IOS;
  }
  
  login() {
    const form = structuredClone(this.loginForm.value);

    this.authService.login(form.login, form.password, {isMobile: this.isMobile}).subscribe({
      next: (result: any) => {
        console.log(result);
        
        if (result.success) {
          this.authService.goFourth({
            timeout: 333,
            target: "home",
            beforeNavigate: () => this.messageService.add({severity: "success", summary: "Logado com sucesso!", detail: result.message})
          })
  
        } else {
          this.messageService.add({severity: "error", summary: "Erro ao logar!", detail: result.message})
        }
      }, error: (err: any) => {
        this.messageService.add({severity: "error", summary: "Erro ao logar!", detail: err.message})
      }
    });
  }

  getRandomImage() {
    const thisPage = this.document.querySelector("#login_page") as HTMLElement;
    const [width, height] = [thisPage.clientWidth - 200, thisPage.clientHeight];
    
    return `https://source.unsplash.com/random/${height}x${width}/?landscape?grayscale`;
  }
}
