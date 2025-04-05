document.addEventListener("DOMContentLoaded", function () {

    //mostrar usuario y vehículo al momoento de cargar segunda pagina
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
        const info = document.getElementById("infoUsuario");

        let username = mayusculaPrimera(usuario.nombre);
        let vehiname = mayusculaPrimera(usuario.nombreVehiculo);

        info.innerHTML = `
            <p><strong>Usuario:</strong> ${username}</p>
            <p><strong>Vehículo:</strong> ${usuario.tipoVehiculo} - ${vehiname}</p>
        `;
    }

    //recuperar lso items si habia
    const clave = `proyecto_${usuario.nombre}_${usuario.nombreVehiculo}`;
    const dispositivosGuardados = JSON.parse(localStorage.getItem(clave));

    if (dispositivosGuardados && Array.isArray(dispositivosGuardados)) {
        const contenedorItems = document.getElementById("items");

        dispositivosGuardados.forEach(dispositivo => {
            const item = document.createElement("div");
            item.classList.add("item");
            item.innerHTML = `<span>${dispositivo.nombre}</span> <span>${dispositivo.consumo} Amperes</span>`;
            contenedorItems.appendChild(item);
        });
    }


    //agregar los items
    const botonAgregar = document.querySelector("button[type='button']");
    botonAgregar.addEventListener("click", agregarDispositivo);

    //esto es para el boton volver
    history.pushState(null, null, location.href);

    window.addEventListener("popstate", function () {
        let confirmacion = confirm("Usted está abandonando su proyecto. NO SE GUARDARAN LOS CAMBIOS.. Desea Continuar?");
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

//uppercase
function mayusculaPrimera(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
}

//items
function agregarDispositivo(event) {
    event.preventDefault();

    let nombre = document.getElementById("dispositivo").value.trim();
    nombre = mayusculaPrimera(nombre);

    let consumoManual = document.getElementById("consumoManual").value.trim();

    if (nombre === "") {
        mostrarMensaje("Completá el nombre del dispositivo");
        return;
    }

    let consumo;
    if (consumoManual !== "") {
        consumo = parseFloat(consumoManual);
    }

    if (isNaN(consumo) || consumo < 0) {
        mostrarMensaje("Completá el amperaje o poné 0");
        return;
    }

    let item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `<span>${nombre}</span> <span>${consumo} Amperes</span>`;

    document.getElementById("items").appendChild(item);

    document.getElementById("dispositivo").value = "";
    document.getElementById("consumoManual").value = "";

}



//guardar los items
document.getElementById("guardar").addEventListener("click",guardarDispositivos);

function guardarDispositivos(){
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const clave=`proyecto_${usuario.nombre}_${usuario.nombreVehiculo}`;

    const items= document.querySelectorAll("#items .item");
    const dispositivos=[];

    items.forEach(item => {
        const spans=item.querySelectorAll("span");
        const nombre= spans[0].innerText;
        const consumo= parseFloat(spans[1].innerText.replace(" Amperes",""));
        dispositivos.push({nombre,consumo});
    });

localStorage.setItem(clave, JSON.stringify(dispositivos));
mostrarMensaje("Proyecto guardado con éxito");  

}

//salir de la pagina y guardar o no

function saliryguardar() {

    const mensajeEmergente = document.getElementById("mensajeEmergenteSalida");
    const mensajeTexto = document.getElementById("mensajeTextoSalida");

    mensajeTexto.textContent = "¿Deseás guardar antes de salir?";
    mensajeEmergente.style.display = "block";

    document.getElementById("aceptarSalir").onclick = function () {
        guardarDispositivos();
        window.location.href = "./../index.html";
    };

    document.getElementById("noguardarSalir").onclick = function () {
        window.location.href = "./../index.html";
    };
}

document.getElementById("salir").addEventListener("click", saliryguardar);

//exportar pdf
document.getElementById("exportar").addEventListener("click", exportarProyectoPDF);
