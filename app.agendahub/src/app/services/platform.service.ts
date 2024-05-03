import { Inject, Injectable } from "@angular/core";

const config = {
  theme: {
    background: {
      light: "#fff",
      dark: "#14052a",
    },
  },
};

@Injectable({
  providedIn: "any",
})
export class PlatformService {
  constructor(@Inject(Document) private document: Document) {}

  public async setTheme(theme: "light" | "dark") {
    const { light, dark } = config.theme.background;
    const color = theme === "light" ? light : dark;

    await this.updateManifest({ background_color: color });
  }

  private async updateManifest(manifest: any) {
    const link = this.document.querySelector('link[rel="manifest"]');
    const manifest_ = await fetch("/manifest.webmanifest").then((res) => res.json());

    const stringManifest = JSON.stringify({ ...manifest_, ...manifest });
    const blob = new Blob([stringManifest], { type: "application/json" });
    const manifestURL = URL.createObjectURL(blob);

    if (link) {
      link.setAttribute("href", manifestURL);
    }
  }
}
