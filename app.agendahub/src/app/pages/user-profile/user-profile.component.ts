import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
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
  isEditing: boolean = false;

  user!: User;
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
    public helper: ScreenHelperService
  ) {}

  ngOnInit(): void {
    this.getEvents();
    this.getInfoUser();
  }

  private getEvents() {
    this.eventService.getHistoricEvents()?.subscribe((x) => {
      this.events = x;
    });
  }

  public getInfoUser() {
    let info = this.authService.getUserData();
    this.apiService
      .requestFromApi("user/" + info.nameid)
      .subscribe((x: User) => {
        this.user = x;
        this.user.imageUrl = this.authService.getUserData().imageUrl;

        this.user.imageUrl && this.loadImage();
      });
  }

  loadImage() {
    requestAnimationFrame(() => {
      this.imageReady = true;
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveUserInfo() {
    this.apiService
      .sendToApi("user/EditUserProfile", this.user)
      .subscribe((x) => {
        this.messageService.add({
          severity: "success",
          summary: "Sucesso",
          detail: "Dados salvos com sucesso!",
        });
        this.isEditing = false;
        this.authService.tryRefreshToken();
      });
  }

  public upload(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.files) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      this.apiService
        .sendToApi("user/UploadProfileImage", formData)
        .subscribe((x) => {
          this.user.imageUrl = x.data;
          this.authService.tryRefreshToken();
        });
    }
  }
}
