// LOGIN
function login(e){
    e.preventDefault();
    alert("Bienvenido al sistema");
    window.location.href = "dashboard.html";
}

// MENSAJE GENERAL
function mensaje(texto){
    alert(texto);
}

// CLIENTES
function guardarCliente(e){
    e.preventDefault();

    let nombre = document.getElementById("nombreCliente").value;

    if(nombre === ""){
        alert("Ingrese un nombre");
        return;
    }

    alert("Cliente registrado: " + nombre);
}

// CITAS
function guardarCita(e){
    e.preventDefault();

    let cliente = document.getElementById("clienteCita").value;

    if(cliente === ""){
        alert("Ingrese el cliente");
        return;
    }

    alert("Cita agendada para: " + cliente);
}

// SERVICIOS
function guardarServicio(e){
    e.preventDefault();

    let servicio = document.getElementById("nombreServicio").value;

    if(servicio === ""){
        alert("Ingrese el servicio");
        return;
    }

    alert("Servicio guardado: " + servicio);
}

// INVENTARIO
function guardarProducto(e){
    e.preventDefault();

    let producto = document.getElementById("nombreProducto").value;

    if(producto === ""){
        alert("Ingrese el producto");
        return;
    }

    alert("Producto registrado: " + producto);
}