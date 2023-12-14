import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private auth: AuthService, private api: ApiService) { }

  public setFavicon(image: string | ArrayBuffer | Blob) {
    
    if (image instanceof ArrayBuffer) {
      image = URL.createObjectURL(new Blob([image]))
    } else if (image instanceof Blob) {
      image = URL.createObjectURL(image)
    }

  }

  public getLogoImage() {
    
    return this.auth.getUserData().companyImage;
  }

  private setFavicon_(image: string) {
    let favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement
    if (!favicon) {
      favicon = document.createElement("link")
      favicon.rel = "icon"
      document.head.appendChild(favicon)
    }

    favicon.href = image
  }

}
