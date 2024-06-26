import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { firstValueFrom } from "rxjs";
import { Access } from "../../../auth/acess";
import { AuthService } from "../../../auth/auth-service.service";
import { ApiService } from "../../../services/api-service.service";

@Component({
  selector: "app-birthday",
  templateUrl: "./birthday.component.html",
  styleUrls: ["./birthday.component.scss"],
})
export class BirthdayComponent implements OnInit {
  forkM = moment;

  birthdayList: any[] = [];
  responsiveOptions: any[] = [];

  message = "";
  modalOpened = false;
  phoneInvalid = false;
  birthSelected = null as any;
  canChangeCustomerData!: boolean;

  constructor(private api: ApiService, private auth: AuthService) {
    this.canChangeCustomerData = this.auth.canAccess(Access.Admin);
  }

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: "1199px",
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: "991px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "767px",
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.getData();
  }

  getSeverity(birthday: any) {
    if (!birthday.lastSchedule) return;

    const lastSchedule = moment(birthday.lastSchedule?.dateTime);
    const diff = Math.abs(moment().diff(lastSchedule, "days"));

    if (diff < 10) return "success";
    if (diff > 10 && diff <= 20) return "warning";

    return "danger";
  }

  async getData() {
    try {
      const data = await firstValueFrom(this.api.requestFromApi("User/BirthDays", null, true));
      this.birthdayList = data;
      // .map((item: any) => ({
      //   ...item,
      //   series: [{ name: item.name, color: "#ddd", data: item.series.map((s: any) => s.value) }],
      // }));
      console.log(this.birthdayList);
    } catch (error) {
      console.error(error);
    }
  }

  validateWhatsAppTelefone() {
    const phone = (this.birthSelected!.phone as string).replaceAll(/[\s()-.]/g, "");
    return phone.length >= 10;
  }

  action(birth: any) {
    this.birthSelected = birth;
    this.phoneInvalid = !this.validateWhatsAppTelefone();
    this.modalOpened = true;
  }

  redirectWhatsAppMessage() {
    const message = this.message.trim();
    const phone = (this.birthSelected!.phone as string).replaceAll(/[\s()-.]/g, "");
    const redirectUrl = encodeURI(`https://wa.me/55${phone}${message.length > 1 ? "?text=" + message : ""}`);

    window.open(redirectUrl, "_blank");
  }
}
