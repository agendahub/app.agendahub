import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Access } from "../../../auth/acess";
import { AuthService } from "../../../auth/auth-service.service";
import { defer } from "../../../utils/async";
import { SettingsService } from "../services/settings.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  constructor(private service: SettingsService, private auth: AuthService, private router: Router) {}

  items: MenuItem[] = [];
  item: MenuItem | undefined;

  ngOnInit() {
    this.mountItems();
    this.service.locks().subscribe((lock) => {
      if (lock) {
        const item = this.items.find((item) => item.id === lock);
        this.items = this.items.filter((item) => item.id !== lock).map((x) => ({ ...x, disabled: true }));
        this.items.push({ ...item, disabled: false });
      } else {
        this.items = this.items.map((x) => ({ ...x, disabled: false }));
      }
    });
  }

  private mountItems() {
    this.items = [
      // { label: 'Gerais', icon: 'fa-solid fa-globe mr-1', routerLink: 'general', replaceUrl: false, id: 'General'},
      { label: "Notificações", icon: "fa-solid fa-bell mr-1", routerLink: "notifications", replaceUrl: false, id: "Notifications" },
      {
        label: "Agendamentos",
        icon: "fa-solid fa-clock mr-1",
        routerLink: "appointments",
        replaceUrl: false,
        id: "Appointments",
        state: { readOnly: this.auth.getUserAccess() !== Access.Admin },
      },
      { label: "Segurança", icon: "fa-solid fa-shield-halved mr-1", routerLink: "security", replaceUrl: false, id: "Security" },
    ];

    defer(() => {
      this.item = this.items[0];

      const current = this.router.url.split("/").pop();

      if (current && current.trim() && current !== "settings") {
        this.item = this.items.find((item) => item.routerLink === current);
      }

      this.router.navigate([`/settings/${this.item?.routerLink}`], { replaceUrl: false });
    }, 1);
  }
}
