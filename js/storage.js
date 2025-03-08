document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    const bienvenida = document.getElementById("bienvenida");
    const mensajeBienvenida = document.getElementById("mensajeBienvenida");
    const mensaje = document.getElementById("mensaje");

    // Verificar si hay datos guardados en localStorage
    const datosGuardados = JSON.parse(localStorage.getItem("usuario"));

    if (datosGuardados) {
        // Si hay datos guardados, mostrar la pantalla de bienvenida
        formulario.style.display = "none";
        bienvenida.style.display = "block";
        mensajeBienvenida.innerText = `Bienvenido, ${datosGuardados.nombre}!`;
        mensaje.innerText = `¿Te gustaría continuar con tu ${datosGuardados.tipoVehiculo} llamado "${datosGuardados.nombreVehiculo}" o iniciar uno nuevo?`;
    } else {
        // Si no hay datos guardados, mostrar el formulario
        formulario.style.display = "block";
        bienvenida.style.display = "none";
    }

    // Guardar los datos y redirigir a amperadora.html
    document.getElementById("guardar").addEventListener("click", () => {
        const nombre = document.getElementById("nombre").value;
        const tipoVehiculo = document.getElementById("tipoVehiculo").value;
        const nombreVehiculo = document.getElementById("nombreVehiculo").value;

        if (nombre && nombreVehiculo) {
            const usuario = { nombre, tipoVehiculo, nombreVehiculo };
            localStorage.setItem("usuario", JSON.stringify(usuario));
            window.location.href = "pages/amperadora.html";
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    // Continuar con el proyecto guardado
    document.getElementById("continuar").addEventListener("click", () => {
        window.location.href = "pages/amperadora.html";
    });

    // Iniciar un nuevo proyecto
    document.getElementById("nuevo").addEventListener("click", () => {
        localStorage.removeItem("usuario");
        location.reload();
    });
});
