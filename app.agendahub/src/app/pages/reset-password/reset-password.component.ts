import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth-service.service';
import { defer } from '../../types/typing';
import { getRandomImage } from '../../utils/util';
import { CustomValidators } from '../../utils/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup
  token!: string
  image!: string

  constructor(private fb: FormBuilder, private authService: AuthService, private activated: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.buildForm();
    this.getToken()
    this.image = getRandomImage("#reset_page");
  }

  getToken() {
    this.token = this.activated.snapshot.params["token"];
  }

  buildForm() {
    this.resetForm = this.fb.group({
      email: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, CustomValidators.equalsTo("password")]]
    })

    this.resetForm.get("password")?.valueChanges.forEach(x => this.resetForm.get("confirmPassword")?.updateValueAndValidity())
  }
  
  async resetPassword() {
    const form = this.resetForm.value;
    const response = this.authService.resetPassword(this.token, form.password);
  }

}
