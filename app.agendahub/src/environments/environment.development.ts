export const environment = {
  production: false,
  apiUrl: "http://localhost:5001/",
  uiUrl: "http://localhost:4200/",
  getApiDomain: () => {
    const url = new URL(environment.apiUrl);
    return url.hostname == "localhost" ? url.hostname + ":" + url.port : url.hostname;
  },
};
