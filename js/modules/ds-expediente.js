/* ============================================================
   DS-EXPEDIENTE.JS — GLASS LUXE 2027
   MÓDULO UNIFICADO DEL EXPEDIENTE
============================================================ */
/* ============================================================
   1. SISTEMA DE MODALES (BASE) — GLASS LUXE 2027
============================================================ */
let modalAbierto = null;

// ===============================
// ABRIR MODAL
// ===============================
function abrirModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    // Evitar duplicados
    if (modalAbierto === modal) return;

    modalAbierto = modal;

    modal.classList.add("is-open");
    modal.classList.remove("is-closing");

    // Cerrar con ESC (listener único)
    document.addEventListener("keydown", handleEscape);

    // Cerrar clic fuera (listener único)
    modal.addEventListener("click", handleClickOutside);
}
// ===============================
// CERRAR MODAL
// ===============================
function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.add("is-closing");
    modal.classList.remove("is-open");

    // Animación de cierre
    setTimeout(() => {
        modal.classList.remove("is-closing");
        modalAbierto = null;
    }, 180);

    // Eliminar listeners globales
    document.removeEventListener("keydown", handleEscape);
    modal.removeEventListener("click", handleClickOutside);
}
// ===============================
// HANDLERS
// ===============================
function handleEscape(e) {
    if (e.key === "Escape" && modalAbierto) {
        cerrarModal(modalAbierto.id);
    }
}

function handleClickOutside(e) {
    if (modalAbierto && e.target === modalAbierto) {
        cerrarModal(modalAbierto.id);
    }
}
/* ============================================================
   2. MODALES ESPECÍFICOS (ALIAS)
   Alias limpios para abrir/cerrar modales concretos
============================================================ */
const abrirModalActividades = () => abrirModal("modalActividades");
const cerrarModalActividades = () => cerrarModal("modalActividades");

const abrirModalDocumento = () => abrirModal("modalDocumento");
const cerrarModalDocumento = () => cerrarModal("modalDocumento");

const abrirModalPPAD = () => abrirModal("modalPPAD");
const cerrarModalPPAD = () => cerrarModal("modalPPAD");

const abrirModalFincas = () => abrirModal("modalFincas");
const cerrarModalFincas = () => cerrarModal("modalFincas");

const abrirModalPDF = () => abrirModal("modalPDF");
const cerrarModalPDF = () => cerrarModal("modalPDF");

const abrirModalCarpetaDigital = () => abrirModal("modalCarpetaDigital");
const cerrarModalCarpetaDigital = () => cerrarModal("modalCarpetaDigital");

const abrirModalAcciones = () => abrirModal("modalAcciones");
const cerrarModalAcciones = () => cerrarModal("modalAcciones");

const abrirModalComentarios = () => abrirModal("modalComentarios");
const cerrarModalComentarios = () => cerrarModal("modalComentarios");

const abrirModalPago = () => abrirModal("modalPago");
const cerrarModalPago = () => cerrarModal("modalPago");
/* ============================================================
   3. COMENTARIOS PENDIENTES — GLASS LUXE 2027
============================================================ */

let comentariosPendientes = [
    { fecha: "28/05/2026", origen: "Apoderado", texto: "Falta copia de DNI.", estado: "Pendiente" },
    { fecha: "29/05/2026", origen: "Notaría", texto: "Revisar protocolo.", estado: "Pendiente" }
];

// ===============================
// RENDERIZAR TABLA DE COMENTARIOS
// ===============================
function renderComentariosPendientes() {
    const tbody = document.getElementById("tablaComentariosPendientes");
    if (!tbody) return;

    tbody.innerHTML = "";

    comentariosPendientes.forEach((c, idx) => {
        const tr = document.createElement("tr");

        const chipEstado = c.estado === "Pendiente"
            ? `<span class="chip chip-warn">Pendiente</span>`
            : `<span class="chip chip-ok">Validado</span>`;

        tr.innerHTML = `
            <td>${c.fecha}</td>
            <td>${c.origen}</td>
            <td>${c.texto}</td>
            <td>${chipEstado}</td>
            <td>
                ${c.estado === "Pendiente" 
                    ? `<button class="btn btn-small" onclick="validarComentario(${idx})">Validar</button>`
                    : `<span class="text-muted">✔</span>`
                }
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// ===============================
// ABRIR MODAL DE COMENTARIOS
// ===============================
function abrirModalComentariosPendientes() {
    renderComentariosPendientes();
    abrirModal("modalComentarios");
}

// ===============================
// VALIDAR COMENTARIO
// ===============================
function validarComentario(index) {
    comentariosPendientes[index].estado = "Validado";

    // Animación Glass Luxe 2027
    const row = document.querySelector(`#tablaComentariosPendientes tr:nth-child(${index + 1})`);
    if (row) {
        row.classList.add("row-validated");
        setTimeout(() => {
            renderComentariosPendientes();
        }, 300);
    } else {
        renderComentariosPendientes();
    }
}
/* ============================================================
   4. PPAD — AÑADIR / LISTAR / ELIMINAR — GLASS LUXE 2027
============================================================ */

let listaPPAD = [];

// ===============================
// GUARDAR PPAD
// ===============================
function guardarPPAD() {
    const tipo = document.getElementById("ppad_tipo").value.trim();
    const importe = document.getElementById("ppad_importe").value.trim();
    const obs = document.getElementById("ppad_obs").value.trim();

    if (!tipo || !importe) {
        alert("Rellena los campos obligatorios.");
        return;
    }

    listaPPAD.push({ tipo, importe, obs });

    renderPPAD();
    cerrarModal("modalPPAD");
}

// ===============================
// RENDER PPAD
// ===============================
function renderPPAD() {
    const tbody = document.getElementById("tablaPPAD");
    if (!tbody) return;

    tbody.innerHTML = "";

    listaPPAD.forEach((p, idx) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.tipo}</td>
            <td>${p.importe} €</td>
            <td>${p.obs || ""}</td>
            <td>
                <button class="btn btn-small btn-danger" onclick="eliminarPPAD(${idx})">
                    🗑
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// ===============================
// ELIMINAR PPAD (con animación)
// ===============================
function eliminarPPAD(index) {
    const tbody = document.getElementById("tablaPPAD");
    if (!tbody) return;

    const row = tbody.querySelector(`tr:nth-child(${index + 1})`);

    if (row) {
        row.classList.add("row-deleting");

        setTimeout(() => {
            listaPPAD.splice(index, 1);
            renderPPAD();
        }, 250);
    } else {
        listaPPAD.splice(index, 1);
        renderPPAD();
    }
}
/* ============================================================
   5. ACCIONES DEL EXPEDIENTE — GLASS LUXE 2027
============================================================ */

let accionesExpediente = [];

// ===============================
// CONFIRMAR ACCIÓN DESDE EL IFRAME
// ===============================
function confirmarAccion() {
    const iframe = document.getElementById("iframeAcciones")?.contentWindow;

    const accionSeleccionada = iframe?.obtenerAccionSeleccionada
        ? iframe.obtenerAccionSeleccionada()
        : null;

    if (!accionSeleccionada) {
        alert("Debes seleccionar una acción.");
        return;
    }

    accionesExpediente.push({
        accion: accionSeleccionada,
        fecha: new Date().toLocaleString()
    });

    renderAcciones();
    cerrarModalAcciones();
}

// ===============================
// RENDER ACCIONES DEL EXPEDIENTE
// ===============================
function renderAcciones() {
    const tbody = document.getElementById("tablaAccionesExpediente");
    if (!tbody) return;

    tbody.innerHTML = "";

    accionesExpediente.forEach((a, idx) => {
        const tr = document.createElement("tr");
        tr.classList.add("row-added");

        tr.innerHTML = `
            <td>
                <span class="chip chip-info">${a.accion}</span>
            </td>
            <td>${a.fecha}</td>
        `;

        tbody.appendChild(tr);

        // Animación Glass Luxe 2027
        setTimeout(() => tr.classList.remove("row-added"), 250);
    });
}
/* ============================================================
   6. FINCAS — GLASS LUXE 2027
============================================================ */

let listaFincas = [];

// ===============================
// GUARDAR FINCA
// ===============================
function guardarFinca() {
    const finca = {
        ns: document.getElementById("f_ns").value.trim(),
        numero: document.getElementById("f_numero").value.trim(),
        seccion: document.getElementById("f_seccion").value.trim(),
        idufir: document.getElementById("f_idufir").value.trim(),
        provincia: document.getElementById("f_provincia").value.trim(),
        poblacion: document.getElementById("f_poblacion")?.value.trim() || "",
        registro: document.getElementById("f_registro")?.value.trim() || "",
        capital: document.getElementById("f_capital").value.trim(),
        inscripcion: document.getElementById("f_inscripcion").value.trim(),
        contrato: document.getElementById("f_contrato").value.trim(),
        constitucion: document.getElementById("f_constitucion").value.trim(),
        modificaciones: document.getElementById("f_modificaciones").value.trim(),
        origen: document.getElementById("f_origen").value.trim()
    };

    // Validación mínima
    if (!finca.ns || !finca.numero || !finca.idufir) {
        alert("Los campos NS, Número e IDUFIR son obligatorios.");
        return;
    }

    listaFincas.push(finca);

    renderFincas();
    cerrarModalFincas();
}

// ===============================
// RENDER FINCAS
// ===============================
function renderFincas() {
    const tbody = document.getElementById("tablaFincas");
    if (!tbody) return;

    tbody.innerHTML = "";

    listaFincas.forEach((f, idx) => {
        const tr = document.createElement("tr");
        tr.classList.add("row-added");

        tr.innerHTML = `
            <td>${f.ns}</td>
            <td>${f.numero}</td>
            <td>${f.seccion}</td>
            <td>${f.idufir}</td>
            <td>${f.provincia}</td>
            <td>${f.poblacion}</td>
            <td>${f.registro}</td>
            <td>${f.capital} €</td>
            <td>${f.inscripcion}</td>
            <td>${f.contrato}</td>
            <td>${f.constitucion}</td>
            <td>${f.modificaciones}</td>
            <td>${f.origen}</td>
        `;

        tbody.appendChild(tr);

        // Animación Glass Luxe 2027
        setTimeout(() => tr.classList.remove("row-added"), 250);
    });
}

/* ============================================================
   7. VISOR PDF — GLASS LUXE 2027
============================================================ */

// ===============================
// ABRIR PDF EN EL VISOR
// ===============================
function abrirPDF(url) {
    const visor = document.getElementById("visorPDF");
    if (!visor) return;

    // Carga segura
    visor.src = url;

    // Abrir modal premium
    abrirModalPDF();
}

// ===============================
// CARGAR FACTURA DE HONORARIOS
// ===============================
function cargarFacturaHonorarios(urlPDF) {
    const visor = document.getElementById("visorFacturaHonorarios");
    if (!visor) return;

    visor.src = urlPDF;
}

// ===============================
// DESCARGAR FACTURA DE HONORARIOS
// ===============================
function descargarFacturaHonorarios() {
    const visor = document.getElementById("visorFacturaHonorarios");
    if (!visor || !visor.src) {
        alert("No hay factura cargada.");
        return;
    }

    const link = document.createElement("a");
    link.href = visor.src;
    link.download = "factura_honorarios.pdf";
    link.click();
}
/* ============================================================
   8. DOCUMENTOS (PLACEHOLDERS) — GLASS LUXE 2027
============================================================ */

// ===============================
// GUARDAR DOCUMENTO
// ===============================
function guardarDocumento() {
    alert("Documento guardado (pendiente de integración con backend).");
}

// ===============================
// BLOQUEAR DOCUMENTO
// ===============================
function bloquearDocumento() {
    alert("Documento bloqueado (pendiente de integración con backend).");
}

// ===============================
// GUARDAR DATOS DEL EXPEDIENTE
// ===============================
function guardarDatos() {
    alert("Datos del expediente guardados (pendiente de integración).");
}

// ===============================
// ENVIAR ENCARGO FINAL AL NOTARIO
// ===============================
function enviarEncargoFinal() {
    alert("Encargo enviado al notario (pendiente de integración).");
}

// ===============================
// VER DOCUMENTOS DE UNA ACTIVIDAD
// ===============================
function verDocsActividad(actividad) {
    alert(
        "📄 Mostrar documentos de: " +
        actividad +
        "\n\n(Integración pendiente con Carpeta Digital)"
    );
}

// ===============================
// ACTUALIZAR EXPEDIENTES VINCULADOS
// ===============================
function actualizarVinculados(lista) {
    const cont = document.querySelector(".expedientes-vinculados");
    if (!cont) return;

    cont.innerHTML = `
        Expedientes vinculados:
        ${lista.map(e => `<span class="badge badge--blue">${e}</span>`).join(" ")}
    `;
}
/* ============================================================
   9. OBSERVACIONES — GLASS LUXE 2027
============================================================ */

// ===============================
// DAR DE ALTA UNA OBSERVACIÓN
// ===============================
function darAltaObservacion() {
    const textarea = document.querySelector("textarea.input--compact");
    if (!textarea) return;

    const texto = textarea.value.trim();
    if (!texto) {
        alert("Debes escribir una observación.");
        return;
    }

    const visibleApoderado = document.getElementById("chkApoderado")?.checked || false;
    const visibleNotaria = document.getElementById("chkNotaria")?.checked || false;

    const nuevaObservacion = {
        texto,
        visibleApoderado,
        visibleNotaria,
        fecha: new Date().toLocaleString()
    };

    // Aquí se integrará con backend o tabla interna
    console.log("Observación guardada:", nuevaObservacion);

    alert("Observación guardada correctamente.");

    // Limpiar textarea
    textarea.value = "";
}
/* ============================================================
   10. PAGOS — GLASS LUXE 2027
============================================================ */

// ===============================
// ABRIR BLOQUE DE PAGOS
// ===============================
function abrirBloquesPago() {
    const bloque = document.getElementById("bloquePagos");
    const alerta = document.getElementById("alertaPagos");

    if (bloque) bloque.classList.add("open");
    if (alerta) alerta.style.display = "none";
}

// ===============================
// AÑADIR NUEVO PAGO (CLON PROFESIONAL)
// ===============================
function nuevoPago() {
    const contenedor = document.getElementById("contenedorPagos");
    if (!contenedor) return;

    const original = contenedor.querySelector(".pago-item");
    if (!original) return;

    const clon = original.cloneNode(true);

    // Limpieza de inputs
    clon.querySelectorAll("input").forEach(i => {
        if (i.type === "date") i.value = "";
        else i.value = "";
    });

    // Limpieza de selects
    clon.querySelectorAll("select").forEach(s => {
        s.selectedIndex = 0;
    });

    // Limpieza de visor PDF si existiera
    const pdf = clon.querySelector(".pdf-viewer");
    if (pdf) pdf.innerHTML = "[Aquí se mostrará la factura en PDF generada por el backend]";

    contenedor.appendChild(clon);

    // Animación Glass Luxe 2027
    clon.classList.add("row-added");
    setTimeout(() => clon.classList.remove("row-added"), 250);
}

// ===============================
// REGISTRAR PAGO
// ===============================
function registrarPago(btn) {
    const card = btn.closest(".pago-item");
    if (!card) return;

    const fecha = card.querySelector('input[type="date"]').value.trim();
    const concepto = card.querySelector("select").value.trim();
    const importe = card.querySelector('input[placeholder="0,00"]').value.trim();
    const pagador = card.querySelector('input[type="text"]').value.trim();

    if (!fecha || !importe) {
        alert("Faltan datos obligatorios.");
        return;
    }

    const tabla = document.querySelector("#tablaPagos tbody");
    if (!tabla) return;

    const fila = document.createElement("tr");
    fila.classList.add("row-added");

    fila.innerHTML = `
        <td>${fecha}</td>
        <td>${concepto}</td>
        <td>${importe} €</td>
        <td>${pagador}</td>
    `;

    tabla.appendChild(fila);

    // Animación Glass Luxe 2027
    setTimeout(() => fila.classList.remove("row-added"), 250);

    alert("Pago registrado correctamente.");
}

// ===============================
// DESCARGAR FACTURA PDF (placeholder)
// ===============================
function descargarFacturaPDF() {
    alert("Descarga de factura pendiente de integración con backend.");
}

// ===============================
// ABRIR MODAL DE PAGO (iframe)
// ===============================
function abrirPago() {
    const iframe = document.getElementById("iframePago");
    if (iframe) iframe.src = "ficha_pagodocumentos.html";

    abrirModalPago();
}
/* ============================================================
   11. EVENTOS INICIALES (DOMContentLoaded)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // RENDER INICIAL DE TABLAS
    // ===============================
    renderComentariosPendientes();
    renderPPAD();
    renderFincas();
    renderAcciones();

    // ===============================
    // LISTENERS DE BOTONES DE MODALES
    // ===============================

    // Comentarios pendientes
    const btnComentarios = document.getElementById("btnComentariosPendientes");
    if (btnComentarios) {
        btnComentarios.addEventListener("click", abrirModalComentariosPendientes);
    }

    // PPAD
    const btnPPAD = document.getElementById("btnPPAD");
    if (btnPPAD) {
        btnPPAD.addEventListener("click", abrirModalPPAD);
    }

    // Fincas
    const btnFincas = document.getElementById("btnFincas");
    if (btnFincas) {
        btnFincas.addEventListener("click", abrirModalFincas);
    }

    // Acciones
    const btnAcciones = document.getElementById("btnAcciones");
    if (btnAcciones) {
        btnAcciones.addEventListener("click", abrirModalAcciones);
    }

    // Pagos
    const btnPago = document.getElementById("btnPago");
    if (btnPago) {
        btnPago.addEventListener("click", abrirPago);
    }

    // ===============================
    // LOG DE CONTROL
    // ===============================
    console.log("DS-Expediente.js inicializado correctamente — Glass Luxe 2027");
});

document.addEventListener("DOMContentLoaded", () => {
    // Aquí irán las inicializaciones reales
});
