import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from "../../../../services/api-service.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-security",
  templateUrl: "./security.component.html",
  styleUrls: ["./security.component.scss"],
})
export class SecurityComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private alert: MessageService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      password: [""],
      newPassword: [""],
      confirmPassword: [""],
    });
  }

  save() {
    const { password, newPassword, confirmPassword } = this.form.value;
    if (newPassword !== confirmPassword) {
      this.alert.add({ severity: "warn", summary: "As senhas não conferem" });
      return;
    }

    this.apiService.sendToApi("api/CompanyParameter/", { password, newPassword, confirmPassword }).subscribe({
      next: () => {
        this.alert.add({ severity: "success", summary: "Senha alterada com sucesso" });
      },
      error: () => {
        this.alert.add({ severity: "error", summary: "Erro ao alterar a senha" });
      },
    });
  }
}
