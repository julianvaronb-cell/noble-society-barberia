
const API_URL = "http://localhost:3000";

// LOGIN REAL CON MYSQL
async function login(e) {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensajeLogin");
    const boton = document.getElementById("btnLogin");

    mensaje.textContent = "";
    boton.disabled = true;
    boton.textContent = "Verificando...";

    try {
        const respuesta = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo, password })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                datos.error || "No fue posible iniciar sesión"
            );
        }

        sessionStorage.setItem("noble_token", datos.token);
        sessionStorage.setItem("noble_usuario", datos.usuario.nombre);

        window.location.href = "dashboard.html";

    } catch (error) {
        mensaje.textContent = error.message;
        console.error("Error de login:", error);
    } finally {
        boton.disabled = false;
        boton.textContent = "Ingresar";
    }
}

// MENSAJE GENERAL
function mensaje(texto) {
    alert(texto);
}

// CLIENTES
function guardarCliente(e) {
    e.preventDefault();

    let nombre = document.getElementById("nombreCliente").value;

    if (nombre === "") {
        alert("Ingrese un nombre");
        return;
    }

    alert("Cliente registrado: " + nombre);
}

// CITAS
function guardarCita(e) {
    e.preventDefault();

    let cliente = document.getElementById("clienteCita").value;

    if (cliente === "") {
        alert("Ingrese el cliente");
        return;
    }

    alert("Cita agendada para: " + cliente);
}

// SERVICIOS
function guardarServicio(e) {
    e.preventDefault();

    let servicio = document.getElementById("nombreServicio").value;

    if (servicio === "") {
        alert("Ingrese el servicio");
        return;
    }

    alert("Servicio guardado: " + servicio);
}

// INVENTARIO
function guardarProducto(e) {
    e.preventDefault();

    let producto = document.getElementById("nombreProducto").value;

    if (producto === "") {
        alert("Ingrese el producto");
        return;
    }

    alert("Producto registrado: " + producto);
}

