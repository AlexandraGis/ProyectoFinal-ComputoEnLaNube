var productos = [];
function read() {
  var sel = document.getElementById("selectProducto");
  var cantidadIp = document.getElementById("cantidad");
  var producto = sel.options[sel.selectedIndex].text;
  var precio = sel.value;
  var cantidad = cantidadIp.value;
  //console.log(producto + " " + precio + " " + cantidad);

  var table = document.getElementById("listaroductos");
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(1);
  cell1.innerHTML = producto;
  cell2.innerHTML = precio;
  cell3.innerHTML = cantidad;

  var productoOb = {
    name: producto,
    precio: precio,
    cantidad: cantidad,
  };
  productos.push(productoOb);
  console.log(productos);
}
function getProductosAPI() {
  var cliente = GetUser().user.id;
  document.getElementById("IP_Clinte").value = cliente;
  var selectProductos = document.getElementById("selectProducto");
  selectProductos.innerHTML = "";
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/productos", true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.response);

      for (var i = 0; i < response.length; i++) {
        /* Must not forget the $ sign */
        var tr = "";
        tr +=
          "<option value=" +
          "'" +
          response[i].precio +
          "'>" +
          response[i].name +
          "</option>";

        /* We add the table row to the table body */
        selectProductos.innerHTML += tr;
      }
    }
  };
}

function enviar() {
  //cliente = document.getElementById("IP_Clinte");

  cliente = document.getElementById("IP_Clinte").value;
  productos = JSON.stringify(productos);

  peticion = {
    cliente: cliente,
    productos: productos,
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:5000/pedidos", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );

  xhttp.send(JSON.stringify(peticion));
  alert("venta creada");
}
function getPedidosAPI() {
  var tablaCuerpo = document.getElementById("tablaPedidos");
  tablaCuerpo.innerHTML = "";
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/pedidos", true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      //console.log(response.data);

      for (var i = 0; i < response.length; i++) {
        /* Must not forget the $ sign */
        var tr = "";
        tr +=
          "<td>" +
          moment(response[i].Fecha).format("DD/MM/YYYY") +
          "</td>" +
          "<td>" +
          response[i].Cliente +
          "</td>" +
          "<td>" +
          response[i].Total +
          "</td>" +
          "<td>" +
          response[i].Producto +
          "</td>" +
          "<td>" +
          "<button class='btn btn-danger' onclick='deleteVentasAPI(\"" +
          response[i].id +
          "\")'>Eliminar</button>" +
          "</td>" +
          "<td>" +
          "<button class='btn btn-primary' onclick='PutClientesAPI(\"" +
          response[i].id +
          "\")'>Editar</button>" +
          "</td>" +
          "</tr>";

        /* We add the table row to the table body */
        tablaCuerpo.innerHTML += tr;
      }
    }
  };
}
function postPedidosAPI() {
  var Monto = parseInt(document.getElementById("IP_Monto").value);
  var Cliente = document.getElementById("IP_Cliente").value;

  var input = document.getElementsByName("listArticulos[]");

  var k = "";

  for (var i = 0; i < input.length; i++) {
    var a = input[i];
    k = k + a.innerText + ", ";
  }

  var ids = document.getElementsByName("productos[]");

  console.log(ids);

  var idList = [];

  for (var i = 0; i < ids.length; i++) {
    var valores = ids[i];
    console.log(valores);
    idList[i] = valores.value;
  }

  var producto = {
    Descripcion: k,
    Cliente: Cliente,
    idProductos: idList,
  };
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:5000/Pedidos", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.send(JSON.stringify(producto));
  alert("venta creada");
  window.location = "http://127.0.0.1:5500/Pedido.html";

  //location.reload();
}

function deleteVentasAPI(id) {
  fetch(`http://localhost:5000/pedidos/` + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((data) => location.reload());
}

function getProductosAPI2() {
  var selectProductos = document.getElementById("IP_TipoArticulo");
  selectProductos.innerHTML = "";
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/pedidos", true);
  xhttp.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);

      for (var i = 0; i < response.length; i++) {
        /* Must not forget the $ sign */
        var tr = "";
        console.log(response);

        /* Must not forget the $ sign */
        var tr = "<tr>";
        tr +=
          "<td>" +
          moment(response[i].fecha).format("DD/MM/YYYY") +
          "</td>" +
          "<td>" +
          response[i].cliente.name +
          "</td>" +
          "<td>" +
          response[i].total +
          "</td>" +
          "<td>" +
          "<button class='btn btn-danger' onclick='deleteVentasAPI(\"" +
          response[i].id +
          "\")'>Eliminar</button>" +
          "</td>" +
          "<td>" +
          "<button class='btn btn-primary' onclick='PutClientesAPI(\"" +
          response[i].id +
          "\")'>Editar</button>" +
          "</td>" +
          "</tr>";

        /* We add the table row to the table body */
        selectProductos.innerHTML += tr;
      }
    }
  };
}
function agregarProducto(selectObject) {
  var texto = selectObject.options[selectObject.selectedIndex].text;
  var value = selectObject.value;
  var precio =
    selectObject.options[selectObject.selectedIndex].getAttribute("precio");
  texto = texto + " $" + precio;
  /*if (document.body.contains(document.getElementById("listArticulos"))) {
    if (document.getElementById("listArticulos").contains("Blusa")) {
      console.log("ya existe");
    }
  }*/
  var node = document.createElement("LI"); // Create a <li> node
  var nodeID = document.createElement("DIV"); // Create a <li> node
  var input = document.createElement("input");
  input.type = "hidden";
  input.name = "productos[]";
  input.value = value;
  nodeID.appendChild(input); // put it into the DOM
  node.setAttribute("name", "listArticulos[]");
  var textnode = document.createTextNode(texto); // Create a text node
  node.appendChild(textnode); // Append the text to <li>
  document.getElementById("listaProductos").append(node); // Append <li> to <ul> with id="myList"
  document.getElementById("listaIdProductos").append(nodeID); // Append <li> to <ul> with id="myList"
}
