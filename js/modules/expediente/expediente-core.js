/* ============================
   PROGRESO DEL EXPEDIENTE
============================ */

document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".progress-steps .step-item");
    const bar = document.getElementById("barraProgreso");
    const currentStep = 4; // TODO: obtener del backend

    steps.forEach(step => {
        const n = parseInt(step.dataset.step, 10);
        if (n <= currentStep) step.classList.add("active");
    });

    if (bar && steps.length > 1) {
        const pct = ((currentStep - 1) / (steps.length - 1)) * 100;
        bar.style.width = pct + "%";
    }
});

/* ============================
   COLAPSABLES
============================ */

function toggleCollapse(header) {
    const content = header.nextElementSibling;

    header.classList.toggle("active");

    if (content.classList.contains("open")) {
        content.classList.remove("open");
        content.style.maxHeight = null;
    } else {
        content.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

/* ============================
   NAVEGACIÓN
============================ */

function volverAtras() {
    window.history.back();
}

function abrirPagoDocumentos() {
    window.location.href = "../../paginas/expedientes_fichas_y_modales/ficha_pagodocumentos.html";
}

function abrirLiquidacionYCierre() {
    window.location.href = "../../paginas/expedientes_fichas_y_modales/ficha_liquidacionycierre.html";
}

function abrirActividades() {
    window.location.href = "../../paginas/expedientes_fichas_y_modales/ficha_actividades.html";
}

function abrirObservacionesInternas() {
    window.location.href = "../paginas/expedientes_fichas_y_modales/ficha_observacionesinternas.html";
}

function abrirHistorialReclamaciones() {
    window.location.href = "../../paginas/expedientes_fichas_y_modales/ficha_historialreclamaciones.html";
}

function abrirHistorialAcciones() {
    window.location.href = "../../paginas/expedientes_fichas_y_modales/ficha_historialacciones.html";
}

function abrirHistorialObservaciones() {
    window.location.href = "../../paginas/expedientes_fichas_y_modales/ficha_historialobservaciones.html";
}

function abrirCarpetaDigital() {
    window.location.href = "../../paginas/expedientes_fichas_y_modales/ficha_carpetadigital.html";
}

/* ============================
   BLOQUEAR EXPEDIENTE
============================ */

function bloquearExpediente() {
    const aviso = document.createElement("div");
    aviso.className = "aviso-bloqueo";
    aviso.innerHTML = `
        <div class="aviso-contenido">
            <span class="icono">🔒</span>
            <strong>Expediente bloqueado</strong>
            <p>Este expediente ha sido bloqueado correctamente.</p>
        </div>
    `;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.classList.add("show"), 10);
    setTimeout(() => {
        aviso.classList.remove("show");
        setTimeout(() => aviso.remove(), 300);
    }, 2500);
}
document.addEventListener("DOMContentLoaded", () => {
    renderDocumentosNotaria();
});
