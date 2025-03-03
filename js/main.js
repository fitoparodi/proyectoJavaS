// Definir valores por defecto
const valoresPorDefecto = {
    "no_lo_se": 3 // Si el usuario pone "No lo sé", se asigna 3A por defecto
};

// Esperar a que cargue el DOM antes de ejecutar
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("button").addEventListener("click", agregarDispositivo);
});

function agregarDispositivo(event) {
    event.preventDefault()

    let nombre = document.getElementById("dispositivo").value.trim();
    let consumoSelect = document.getElementById("consumo").value;
    let consumoManual = document.getElementById("consumoManual").value.trim();
    
    if (nombre === "") {
        alert("Por favor, ingresa un nombre para el dispositivo.");
        return;
    }

    let consumo;
    if (consumoManual !== "") {
        consumo = parseFloat(consumoManual);
    } else {
        consumo = valoresPorDefecto[consumoSelect] || 0; 
    }

    if (isNaN(consumo) || consumo < 0) {
        alert("Ingresa un consumo válido.");
        return;
    }

    let item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `<span>${nombre}</span> <span>${consumo} A</span>`;
    
    document.getElementById("items").appendChild(item);


    document.getElementById("dispositivo").value = "";
    document.getElementById("consumoManual").value = "";
    document.getElementById("consumo").value = "";
}
