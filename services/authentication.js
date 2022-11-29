import axios from "axios";

class Authentication {
  createNewUser(new_user) {
    return axios({
      method: "post",
      url: "http://localhost:8082/authenticate/create",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: new_user,
    });
  }

  login(email, password) {
    return axios.post("http://localhost:8082/authenticate/login", {
      email,
      password,
    });
  }

  getUserDetails() {
    const accountId = sessionStorage.getItem("id");
    const accountType = sessionStorage.getItem("accountType");
    
    if(accountType === "TENANT") {
      return axios({
        method: "get",
        url: "http://localhost:8082/tenant/" + accountId,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    } else {
      return axios({
        method: "get",
        url: "http://localhost:8082/landlord/" + accountId,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }


  }

  updateAccountDetails(newDetails) {
    const accountId = sessionStorage.getItem("id");
    return axios({
      method: "post",
      url: "http://localhost:8082/landlord",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: newDetails,
    });
  }

  createProperty(payload) {
    return axios({
      method: "post",
      url: "http://localhost:8082/property",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: payload,
    });
  }

  updateFault(id) {
    return axios({
      method: "post",
      url: "http://localhost:8082/fault/status/"+id,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  createFault(payload) {
    return axios({
      method: "post",
      url: "http://localhost:8082/fault",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: payload,
    });
  }

  getFaultsByTenant() {
    const accountId = sessionStorage.getItem("user");
    return axios({
      method: "get",
      url: "http://localhost:8082/faults/tenant/" + accountId,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  getProperties() {
    const accountId = sessionStorage.getItem("id");
    return axios({
      method: "get",
      url: "http://localhost:8082/property/" + accountId,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  getTenants() {
    return axios({
      method: "get",
      url: "http://localhost:8082/tenant",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  getFaults() {
    const accountId = sessionStorage.getItem("id");
    return axios({
      method: "get",
      url: "http://localhost:8082/faults/" + accountId,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  createJWTToken(token) {
    return "Bearer " + token;
  }

  create_login_session(data) {
    sessionStorage.setItem("user", data.email);
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("id", data.accountId);
    sessionStorage.setItem("accountType", data.accountType);
    sessionStorage.setItem("enabled", data.enabled);
    this.setupAxiosInterceptor(this.createJWTToken(data.token));
  }

  logout() {
    sessionStorage.clear();
    axios.interceptors.request.use((config) => {
      config.headers.authorization = null;
      return config;
    });
  }

  setupAxiosInterceptor(token) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization = token;
        return config;
      }
      return config;
    });
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("user");

    if (user === null) {
      return false;
    }

    if (user === "undefined") {
      return false;
    }

    return true;
  }
}

export default new Authentication();
