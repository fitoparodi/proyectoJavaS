function exportarProyectoPDF() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
        alert("No hay proyecto para exportar.");
        return;
    }

    const clave = `proyecto_${usuario.nombre}_${usuario.nombreVehiculo}`;
    const dispositivos = JSON.parse(localStorage.getItem(clave)) || [];

    const contenido = document.createElement("div");

    let html = `
        <h2>Proyecto de ${usuario.nombre}</h2>
        <p><strong>Vehículo:</strong> ${usuario.tipoVehiculo} - ${usuario.nombreVehiculo}</p>
        <h3>Dispositivos:</h3>
        <ul>
    `;

    dispositivos.forEach(d => {
        html += `<li>${d.nombre}: ${d.consumo} Amperes</li>`;
    });

    html += "</ul>";

    contenido.innerHTML = html;

    const opciones = {
        margin: 10,
        filename: `proyecto_${usuario.nombre}_${usuario.nombreVehiculo}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(contenido).save();
}
