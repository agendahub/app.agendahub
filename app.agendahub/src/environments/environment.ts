export const environment = {
  production: true,
  uiUrl: window.location.host + "/",
  apiUrl: "https://apiagendahub-demo.up.railway.app/",
  getApiDomain: () => new URL(environment.apiUrl).hostname,
};
