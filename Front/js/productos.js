function getProductosAPI() {
  var tablaCuerpo = document.getElementById("tablaProductos");
  tablaCuerpo.innerHTML = "";
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/productos", true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      //console.log(response.data);

      for (var i = 0; i < response.length; i++) {
        /* Must not forget the $ sign */
        var tr = "<tr>";
        tr +=
          "<td>" +
          response[i].name +
          "</td>" +
          "<td>" +
          response[i].descripcion +
          "</td>" +
          "<td>" +
          response[i].stock +
          "</td>" +
          "<td>" +
          response[i].precio +
          "</td>" +
          "<td>" +
          "<button class='btn btn-danger' onclick='deleteProductosAPI(\"" +
          response[i].id +
          "\")'>Eliminar</button>" +
          "</td>" +
          "<td>" +
          "<a class='btn btn-primary' href='/Modificar/Producto.html?id=" +
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

function postProductosAPI() {
  var Articulo = document.getElementById("IP_Articulo").value;
  var Precio = parseInt(document.getElementById("IP_Precio").value);
  var Existencias = parseInt(document.getElementById("IP_Existencias").value);
  var Descripcion = document.getElementById("IP_Descripcion").value;
  var producto = {
    name: Articulo,
    descripcion: Descripcion,
    stock: Existencias,
    precio: Precio,
  };
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:5000/productos", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );

  xhttp.send(JSON.stringify(producto));
  alert("Producto creada");

  location.reload();
}

function deleteProductosAPI(id) {
  fetch(`http://localhost:5000/productos/` + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((data) => location.reload());
}
function PutProductoAPI() {
  const ID = location.search.split("id=")[1];
  var Nombre = document.getElementById("IP_Nombre").value;
  var Descripcion = document.getElementById("IP_Descripcion").value;
  var Existencias = document.getElementById("IP_Existencias").value;
  var Precio = document.getElementById("IP_Precio").value;
  var producto = {
    name: Nombre,
    descripcion: Descripcion,
    stock: Existencias,
    precio: Precio,
  };
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:5000/productos/" + ID, true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  xhttp.send(JSON.stringify(producto));
  alert("Producto actualizado");
  //window.location = "http://127.0.0.1:5500/usuarios.html";

  //location.reload();
}
function getProductoAPI() {
  const ID = location.search.split("id=")[1];
  var IP_Nombre = document.getElementById("IP_Nombre");
  var IP_Descripcion = document.getElementById("IP_Descripcion");
  var IP_Existencias = document.getElementById("IP_Existencias");
  var IP_Precio = document.getElementById("IP_Precio");
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/productos/" + ID, true);
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
      IP_Descripcion.value = response.descripcion;
      IP_Existencias.value = response.stock;
      IP_Precio.value = response.precio;
    }
  };
}
