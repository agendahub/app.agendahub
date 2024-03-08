export function tokenGetter() {
    let token = localStorage.getItem("token");
    token = !token && token != "undefined" ? JSON.parse(token!) : token;
    
    return token
  }
  