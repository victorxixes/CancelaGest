/* ============================
   ACCIONES DEL EXPEDIENTE
============================ */

function seleccionarAccion(id, desc) {
    const fecha = new Date().toLocaleString();

    const tbody = document.getElementById("tablaAccionesExpediente");
    if (!tbody) return;

    tbody.innerHTML = `
        <tr>
            <td>${desc}</td>
            <td>${fecha}</td>
        </tr>
    `;

    cerrarModalAcciones({ target: { id: "modalAcciones" } });
}

/* ============================
   MODAL ACCIONES
============================ */

function abrirModalAcciones() {
    const modal = document.getElementById("modalAcciones");
    const iframe = document.getElementById("iframeAcciones");

    if (!modal || !iframe) return;

    iframe.src = "../expedientes_fichas_y_modales/ficha_acciones.html";
    modal.classList.add("open");
}


function cerrarModalAcciones(e) {
    const modal = document.getElementById("modalAcciones");
    if (!modal) return;

    if (!e || e.target.id === "modalAcciones" || e.target.classList.contains("modal-close")) {
        modal.classList.remove("open");
    }
}

