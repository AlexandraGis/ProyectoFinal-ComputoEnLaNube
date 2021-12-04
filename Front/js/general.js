function IsLogin() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login.html";
  }
}
function SaveUser(token) {
  localStorage.setItem("token", token);
}
function logout() {
  localStorage.removeItem("token");
}
function GetUser() {
  var token = localStorage.getItem("token"); // jwt token;
  var decoded = jwt_decode(token);
  return decoded;
}
