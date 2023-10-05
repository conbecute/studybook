class Authentication {
  constructor() {}
  isAuthentication() {
    const token = localStorage.getItem("token");
    return token;
  }
}

export default new Authentication();
