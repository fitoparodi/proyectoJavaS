document.addEventListener("DOMContentLoaded", function () {

    // Mostrar usuario y vehículo al momoento de cargar segunda pagina
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
        const info = document.getElementById("infoUsuario");
        info.innerHTML = `
            <p><strong>Usuario:</strong> ${usuario.nombre}</p>
            <p><strong>Vehículo:</strong> ${usuario.tipoVehiculo} - ${usuario.nombreVehiculo}</p>
        `;
    }


    const botonAgregar = document.querySelector("button[type='button']");
    botonAgregar.addEventListener("click", agregarDispositivo);

    history.pushState(null, null, location.href);

    window.addEventListener("popstate", function () {
        let confirmacion = confirm("Usted está abandonando su proyecto. Los cambios serán guardados. ¿Desea continuar?");
        if (confirmacion) {
            window.location.href = "./../index.html";
        } else {
            history.pushState(null, null, location.href);
        }

        history.pushState(null, null, location.href);

        window.addEventListener("popstate", function () {
            location.reload();

        });
    });
});

function agregarDispositivo(event) {
    event.preventDefault();

    let nombre = document.getElementById("dispositivo").value.trim();
    let consumoManual = document.getElementById("consumoManual").value.trim();

    if (nombre === "") {
        mostrarMensaje("probando");
        return;
    }

    let consumo;
    if (consumoManual !== "") {
        consumo = parseFloat(consumoManual);
    }

    if (isNaN(consumo) || consumo < 0) {
        mostrarMensaje("completa gil");
        return;
    }

    let item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `<span>${nombre}</span> <span>${consumo} A</span>`;

    document.getElementById("items").appendChild(item);

    document.getElementById("dispositivo").value = "";
    document.getElementById("consumoManual").value = "";

}
