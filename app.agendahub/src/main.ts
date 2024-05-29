import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment.development";

if (environment.production) {
  injectSpeedInsights();
  enableProdMode();
  inject();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
