function login() {
  var Correo = document.getElementById("IP_Correo").value;
  var Contraseña = document.getElementById("IP_Contraseña").value;
  Contraseña = CryptoJS.MD5(Contraseña).toString();
  var cliente = {
    email: Correo,
    pass: Contraseña,
  };
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        var response = JSON.parse(xhttp.response);
        //console.log(response.token);
        SaveUser(response.token);
        console.log(Contraseña);
        window.location.href = "./index.html";
      } else {
        alert("Usuario o contraseña incorrecta");
      }
    }
  };
  xhttp.open("POST", "http://localhost:5000/users/authenticate", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify(cliente));

  //location.reload();
}
function getClientesAPI() {
  var tablaCuerpo = document.getElementById("tablaAdmi");
  tablaCuerpo.innerHTML = "";
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/users", true);
  xhttp.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      //console.log(response.data);

      for (var i = 0; i < response.length; i++) {
        var tr = "<tr>";
        /* Must not forget the $ sign */
        tr +=
          "<td>" +
          response[i].name +
          "</td>" +
          "<td>" +
          response[i].lastName +
          "</td>" +
          "<td>" +
          response[i].email +
          "</td>" +
          "<td>" +
          "<button class='btn btn-danger' onclick='deleteClientesAPI(\"" +
          response[i].id +
          "\")'>Eliminar</button>" +
          "</td>" +
          "<td>" +
          "<a class='btn btn-primary' href='/Modificar/Cliente.html?id=" +
          response[i].id +
          "'>Editar</a>" +
          "</td>" +
          "</tr>";

        /* We add the table row to the table body */
        tablaCuerpo.innerHTML += tr;
      }
    }
  };
}
function postClientesAPI() {
  var Nombre = document.getElementById("IP_Nombre").value;
  var Apellido = document.getElementById("IP_Apellido").value;
  var Correo = document.getElementById("IP_Correo").value;
  var Contraseña = document.getElementById("IP_Contraseña").value;
  var cliente = {
    name: Nombre,
    lastName: Apellido,
    email: Correo,
    pass: Contraseña,
  };
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:5000/users/register", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify(cliente));
  alert("cliente creado");
  //window.location = "http://127.0.0.1:5500/login.html";

  //location.reload();
}

function deleteClientesAPI(id) {
  fetch(`http://localhost:5000/users/` + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((data) => location.reload());
}

function PutClienteAPI() {
  const ID = location.search.split("id=")[1];
  var Nombre = document.getElementById("IP_Nombre").value;
  var Apellido = document.getElementById("IP_Apellido").value;
  var Correo = document.getElementById("IP_Correo").value;
  var Contraseña = document.getElementById("IP_Contraseña").value;
  var cliente = {
    name: Nombre,
    lastName: Apellido,
    email: Correo,
    pass: Contraseña,
  };
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:5000/users/" + ID, true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  xhttp.send(JSON.stringify(cliente));
  alert("cliente actualizado");
  //window.location = "http://127.0.0.1:5500/usuarios.html";

  //location.reload();
}
function getClienteAPI() {
  const ID = location.search.split("id=")[1];
  var IP_Nombre = document.getElementById("IP_Nombre");
  var IP_Apellido = document.getElementById("IP_Apellido");
  var IP_Correo = document.getElementById("IP_Correo");

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/users/" + ID, true);
  xhttp.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      //console.log(response.data);
      IP_Nombre.value = response.name;
      IP_Apellido.value = response.lastName;
      IP_Correo.value = response.email;
    }
  };
}
