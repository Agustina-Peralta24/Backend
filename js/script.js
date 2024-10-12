

function cargarPedidos() {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidosGuardados.forEach(pedido => {
        agregarPedidoALaLista(pedido.pedido, pedido.cliente, false);
    });
}


function agregarPedido() {
    let nuevoPedidoTexto = document.getElementById("nuevoPedido").value;
    let nombreCliente = document.getElementById("nombreCliente").value;

    if (nuevoPedidoTexto === "" || nombreCliente === "") {
        alert("Debe completar los campos para continuar");
        return;
    }

    agregarPedidoALaLista(nuevoPedidoTexto, nombreCliente, true);

    // Limpiar los campos de texto
    document.getElementById("nuevoPedido").value = "";
    document.getElementById("nombreCliente").value = "";
}


function agregarPedidoALaLista(pedidoTexto, clienteTexto, guardarEnLocalStorage = true) {
    let nuevoPedido = document.createElement("li");
    nuevoPedido.textContent = `Pedido: ${pedidoTexto}, Cliente: ${clienteTexto} `;

 
    let botonHecho = document.createElement("button");
    let iconoHecho = document.createElement("img");
    iconoHecho.src = "img/checkIcon.png";
    iconoHecho.alt = "Pedido completado";
    iconoHecho.width = 18;
    iconoHecho.height = 18;
    botonHecho.appendChild(iconoHecho);

    botonHecho.onclick = function () {
        if (nuevoPedido.style.textDecoration === "line-through") {
            nuevoPedido.style.textDecoration = "none";
        } else {
            nuevoPedido.style.textDecoration = "line-through";
        }
    }

    nuevoPedido.appendChild(botonHecho);



    let botonEliminar = document.createElement("button");
    let iconoEliminar = document.createElement("img");
    iconoEliminar.src = "img/deleteIcon.png";
    iconoEliminar.alt = "Eliminar";
    iconoEliminar.width = 18;
    iconoEliminar.height = 18;
    botonEliminar.appendChild(iconoEliminar);

    botonEliminar.onclick = function () {
        nuevoPedido.remove();
        eliminarPedidoDelLocalStorage(pedidoTexto, clienteTexto);
    }

    nuevoPedido.appendChild(botonEliminar);

    document.getElementById("listaPedidos").appendChild(nuevoPedido);

    
    if (guardarEnLocalStorage) {
        guardarPedidoEnLocalStorage(pedidoTexto, clienteTexto);
    }
}


function guardarPedidoEnLocalStorage(pedidoTexto, clienteTexto) {
    let pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidosGuardados.push({ pedido: pedidoTexto, cliente: clienteTexto });
    localStorage.setItem("pedidos", JSON.stringify(pedidosGuardados));
}


function eliminarPedidoDelLocalStorage(pedidoTexto, clienteTexto) {
    let pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidosGuardados = pedidosGuardados.filter(pedido => pedido.pedido !== pedidoTexto || pedido.cliente !== clienteTexto);
    localStorage.setItem("pedidos", JSON.stringify(pedidosGuardados));
}


cargarPedidos();
