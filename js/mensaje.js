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
