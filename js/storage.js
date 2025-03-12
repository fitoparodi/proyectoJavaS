document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    const bienvenida = document.getElementById("bienvenida");
    const mensajeBienvenida = document.getElementById("mensajeBienvenida");
    const mensaje = document.getElementById("mensaje");
    const opciones = document.querySelectorAll(".opcion img");
    let vehiculoSeleccionado = null;

    //mensaje de campos vacios
    function mostrarMensaje(texto) {
        const mensajeEmergente = document.getElementById("mensajeEmergente");
        const mensajeTexto = document.getElementById("mensajeTexto");

        mensajeTexto.innerText = texto;
        mensajeEmergente.style.display = "block";
    }

    document.getElementById("cerrarMensaje").addEventListener("click", () => {
        document.getElementById("mensajeEmergente").style.display = "none";
    });



    //verificar si existe usuario
    const datosGuardados = JSON.parse(localStorage.getItem("usuario"));

    if (datosGuardados) {

        formulario.style.display = "none";
        bienvenida.style.display = "block";
        mensajeBienvenida.innerText = `Bienvenido, ${datosGuardados.nombre}!`;
        mensaje.innerText = `¿Te gustaría continuar con tu ${datosGuardados.tipoVehiculo} llamado "${datosGuardados.nombreVehiculo}" o iniciar uno nuevo?`;

    } else {

        formulario.style.display = "block";
        bienvenida.style.display = "none";
    }

    // seleccion de imagenes
    opciones.forEach((img) => {

        img.addEventListener("click", function () {

            opciones.forEach((imagen) => imagen.classList.remove("seleccionado"));
            this.classList.add("seleccionado");

            vehiculoSeleccionado = this.alt;
        });
    });


    // guardar
    document.getElementById("guardar").addEventListener("click", () => {

        const nombre = document.getElementById("nombre").value;
        const nombreVehiculo = document.getElementById("nombreVehiculo").value;

        if (nombre == null || nombre === "") {

            mostrarMensaje("Completá tu nombre!")

        } else if (nombreVehiculo == null || nombreVehiculo === "") {

            mostrarMensaje("Completá el nombre del vehículo")

        } else if (vehiculoSeleccionado === null) {

            mostrarMensaje("Seleccioná un vehículo")

        } else {

            const usuario = { nombre, tipoVehiculo: vehiculoSeleccionado, nombreVehiculo };
            localStorage.setItem("usuario", JSON.stringify(usuario));
            window.location.href = "./pages/amperadora.html";

        }
    });


    //continuar
    document.getElementById("continuar").addEventListener("click", () => {
        window.location.href = "./pages/amperadora.html";
    });

    //nuevo
    document.getElementById("nuevo").addEventListener("click", () => {
        localStorage.removeItem("usuario");
        location.reload();
    });
});
