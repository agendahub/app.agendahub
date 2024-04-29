export const environment = {
  production: true,
  uiUrl: window.location.host + "/",
  apiUrl: "https://apiagendahub-demo.up.railway.app/",
  notifierUrl: "https://notifierstudioagenda-development.up.railway.app/",
  getApiDomain: () => new URL(environment.apiUrl).hostname,
};
