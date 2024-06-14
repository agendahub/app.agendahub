import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { defer } from "../../decorators/defer";
import { User } from "../../models/core/entities";
import { GetTableSchedulingListDto } from "../../models/dtos/dtos";
import { ApiService } from "../../services/api-service.service";
import { ScreenHelperService } from "../../services/screen-helper.service";
import { AuthService } from "./../../auth/auth-service.service";
import { EventService } from "./../../models/services/event.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent {
  events: any[] = [];
  form!: FormGroup;

  items = [] as any[];
  user: User = {} as User;
  imageReady: boolean = false;

  rangeDates: Date[] | undefined;
  searchClient: string = "";
  schedulingList: GetTableSchedulingListDto[] = [];
  filteredSchedulingList: GetTableSchedulingListDto[] = [];
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private eventService: EventService,
    private messageService: MessageService,
    private fb: FormBuilder,
    public helper: ScreenHelperService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [""],
      phone: [""],
      dateBirth: [""],
    });

    const hasPhoto = this.authService.getUserData().imageUrl;
    this.getEvents();
    this.getInfoUser();

    this.items = [
      {
        label: hasPhoto ? "Trocar foto" : "Adicionar foto",
        icon: "fa-solid fa-camera",
        command: () => {
          this.upload();
        },
      },
      {
        label: "Remover",
        icon: "fa-solid fa-trash",
        command: () => {
          this.deleteImage();
        },
      },
    ];
  }

  private getEvents() {
    this.eventService.getHistoricEvents()?.subscribe((x) => {
      this.events = x;
    });
  }

  @defer(3_3_3)
  public getInfoUser() {
    let info = this.authService.getUserData();
    this.apiService.requestFromApi("user/" + info.nameid).subscribe((x: User) => {
      this.user = x;
      this.user.imageUrl = this.authService.getUserData().imageUrl;

      if (this.user.imageUrl) {
        this.loadImage();
      } else {
        this.imageReady = true;
      }
    });
  }

  loadImage() {
    requestAnimationFrame(() => {
      this.imageReady = true;
    });
  }

  toggleEdit() {
    this.form.patchValue({
      ...this.user,
      dateBirth: this.user.dateBirth ? new Date(this.user.dateBirth) : undefined,
    });
  }

  reset() {
    this.form.reset({});
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  saveUserInfo() {
    this.user = { ...this.user, ...this.form.value };
    this.apiService.sendToApi("user/EditUserProfile", this.user).subscribe((x) => {
      this.messageService.add({
        severity: "success",
        summary: "Sucesso",
        detail: "Dados salvos com sucesso!",
      });
      this.authService.tryRefreshToken();
      this.reset();
    });
  }

  deleteImage() {
    this.apiService.deleteFromApi("user/DeleteProfileImage").subscribe((x) => {
      this.user.imageUrl = undefined;
      this.authService.tryRefreshToken();
    });
  }

  async upload() {
    const cc = async () => {
      var inp = document.createElement("input");

      inp.accept = "image/*";
      inp.type = "file";
      inp.click();

      return await new Promise<any>((re, rj) => {
        inp.onchange = (x) => {
          return re(x);
        };
        inp.remove();
      });
    };

    const formData = new FormData();
    for (let file of (await cc()).currentTarget?.files) {
      formData.append("file", file);
    }

    this.apiService.sendToApi("user/UploadProfileImage", formData).subscribe((x) => {
      this.user.imageUrl = x.data;
      this.authService.tryRefreshToken();
    });
  }
}
