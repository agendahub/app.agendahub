import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  setFavicon(image: string | ArrayBuffer | Blob) {
    
    if (image instanceof ArrayBuffer) {
      image = URL.createObjectURL(new Blob([image]))
    } else if (image instanceof Blob) {
      image = URL.createObjectURL(image)
    }

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
