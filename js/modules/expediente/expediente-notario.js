/* ============================================================
   ABRIR MODAL EDITAR / ENVIAR AL NOTARIO
============================================================ */

function abrirModalEditarEncargo() {
    document.getElementById("modalEditarEncargo").classList.add("open");
}

/* ============================================================
   ENCARGO AL NOTARIO — ESTADO GLOBAL
============================================================ */

let datosEncargoNotario = null;


/* ============================================================
   GUARDAR ENCARGO (desde el modal principal)
============================================================ */

function guardarEncargoNotario() {

    datosEncargoNotario = {
        tipoDocumento: document.getElementById("tipoDocumento").value,
        escrituraDocumento: document.getElementById("escrituraDocumento").value,
        tramitacion: document.getElementById("tramitacion").value,
        formatoEscritura: document.getElementById("formatoEscritura").value,
        tipoFirma: document.getElementById("tipoFirma").value,
        idioma: document.getElementById("idioma").value,
        apoderado: document.getElementById("apoderado").value,
        notario: document.getElementById("notario").value,
        fechaSolicitud: document.getElementById("fechaSolicitud").value,
        solicitudPnc: document.getElementById("solicitudPnc").value,
        fechaEncargo: document.getElementById("fechaEncargo").value,
        fechaFirma: document.getElementById("fechaFirma").value,
        protocolo: document.getElementById("protocolo").value,
        provision: document.getElementById("provision").value,
        observaciones: document.getElementById("observacionesEncargo").value,
        fechaRegistro: new Date().toLocaleString("es-ES")
    };

    cerrarModalEditarEncargo();
    renderEncargoNotario(datosEncargoNotario);
}


/* ============================================================
   RENDER DEL BLOQUE ENCARGO AL NOTARIO
============================================================ */

function renderEncargoNotario(datos) {

    const contenedor = document.getElementById("bloqueEncargoNotario");

    contenedor.innerHTML = `
        <div class="card-block widget" id="encargoNotarioCard">

            <div class="section-header">
                <h3 class="section-title">📤 Envío al notario</h3>

                <div style="display:flex; gap:8px;">
                    <button class="btn btn-small btn-blue" onclick="editarEncargoNotario()">
                        ✏ Editar
                    </button>

                    <button class="btn btn-small btn-red" onclick="abrirModalEliminarEncargo()">
                        🗑 Eliminar
                    </button>
                </div>
            </div>

            <table class="table table--compact mt-10">
                <tbody>
                    <tr><th>Fecha registro</th><td>${datos.fechaRegistro}</td></tr>
                    <tr><th>Tipo documento</th><td>${datos.tipoDocumento}</td></tr>
                    <tr><th>Escritura / Documento</th><td>${datos.escrituraDocumento}</td></tr>
                    <tr><th>Tramitación</th><td>${datos.tramitacion}</td></tr>
                    <tr><th>Formato escritura</th><td>${datos.formatoEscritura}</td></tr>
                    <tr><th>Tipo firma</th><td>${datos.tipoFirma}</td></tr>
                    <tr><th>Idioma</th><td>${datos.idioma}</td></tr>
                    <tr><th>Apoderado</th><td>${datos.apoderado}</td></tr>
                    <tr><th>Notario</th><td>${datos.notario}</td></tr>
                    <tr><th>Fecha solicitud PNC</th><td>${datos.fechaSolicitud}</td></tr>
                    <tr><th>Nº Solicitud PNC</th><td>${datos.solicitudPnc}</td></tr>
                    <tr><th>Fecha encargo</th><td>${datos.fechaEncargo}</td></tr>
                    <tr><th>Fecha firma</th><td>${datos.fechaFirma}</td></tr>
                    <tr><th>Nº Protocolo</th><td>${datos.protocolo}</td></tr>
                    <tr><th>Provisión</th><td>${datos.provision} €</td></tr>
                    <tr><th>Observaciones</th><td>${datos.observaciones}</td></tr>
                </tbody>
            </table>

        </div>
    `;
}


/* ============================================================
   ABRIR MODAL DE EDICIÓN (cuando ya existe un encargo)
============================================================ */

function editarEncargoNotario() {

    if (!datosEncargoNotario) return;

    document.getElementById("edit_tipoDocumento").value = datosEncargoNotario.tipoDocumento;
    document.getElementById("edit_escrituraDocumento").value = datosEncargoNotario.escrituraDocumento;
    document.getElementById("edit_tramitacion").value = datosEncargoNotario.tramitacion;
    document.getElementById("edit_formatoEscritura").value = datosEncargoNotario.formatoEscritura;
    document.getElementById("edit_tipoFirma").value = datosEncargoNotario.tipoFirma;
    document.getElementById("edit_idioma").value = datosEncargoNotario.idioma;
    document.getElementById("edit_apoderado").value = datosEncargoNotario.apoderado;
    document.getElementById("edit_notario").value = datosEncargoNotario.notario;
    document.getElementById("edit_fechaSolicitud").value = datosEncargoNotario.fechaSolicitud;
    document.getElementById("edit_solicitudPnc").value = datosEncargoNotario.solicitudPnc;
    document.getElementById("edit_fechaEncargo").value = datosEncargoNotario.fechaEncargo;
    document.getElementById("edit_fechaFirma").value = datosEncargoNotario.fechaFirma;
    document.getElementById("edit_protocolo").value = datosEncargoNotario.protocolo;
    document.getElementById("edit_provision").value = datosEncargoNotario.provision;
    document.getElementById("edit_observacionesEncargo").value = datosEncargoNotario.observaciones;

    document.getElementById("modalEditarEncargo").classList.add("open");
}


/* ============================================================
   GUARDAR EDICIÓN
============================================================ */

function guardarEdicionEncargo() {

    datosEncargoNotario.tipoDocumento = document.getElementById("edit_tipoDocumento").value;
    datosEncargoNotario.escrituraDocumento = document.getElementById("edit_escrituraDocumento").value;
    datosEncargoNotario.tramitacion = document.getElementById("edit_tramitacion").value;
    datosEncargoNotario.formatoEscritura = document.getElementById("edit_formatoEscritura").value;
    datosEncargoNotario.tipoFirma = document.getElementById("edit_tipoFirma").value;
    datosEncargoNotario.idioma = document.getElementById("edit_idioma").value;
    datosEncargoNotario.apoderado = document.getElementById("edit_apoderado").value;
    datosEncargoNotario.notario = document.getElementById("edit_notario").value;
    datosEncargoNotario.fechaSolicitud = document.getElementById("edit_fechaSolicitud").value;
    datosEncargoNotario.solicitudPnc = document.getElementById("edit_solicitudPnc").value;
    datosEncargoNotario.fechaEncargo = document.getElementById("edit_fechaEncargo").value;
    datosEncargoNotario.fechaFirma = document.getElementById("edit_fechaFirma").value;
    datosEncargoNotario.protocolo = document.getElementById("edit_protocolo").value;
    datosEncargoNotario.provision = document.getElementById("edit_provision").value;
    datosEncargoNotario.observaciones = document.getElementById("edit_observacionesEncargo").value;

    cerrarModalEditarEncargo();
    renderEncargoNotario(datosEncargoNotario);
}


/* ============================================================
   ELIMINAR ENCARGO — CONFIRMACIÓN
============================================================ */

function abrirModalEliminarEncargo() {
    document.getElementById("modalEliminarEncargo").classList.add("open");
}

function cerrarModalEliminarEncargo(e) {
    if (e) e.stopPropagation();
    document.getElementById("modalEliminarEncargo").classList.remove("open");
}


/* ============================================================
   ELIMINAR ENCARGO — ACCIÓN FINAL
============================================================ */

function eliminarEncargoNotario() {

    datosEncargoNotario = null;

    const contenedor = document.getElementById("bloqueEncargoNotario");
    contenedor.innerHTML = "";

    cerrarModalEliminarEncargo();
}


/* ============================================================
   CERRAR MODALES
============================================================ */

function cerrarModalEditarEncargo(e) {
    if (e) e.stopPropagation();
    document.getElementById("modalEditarEncargo").classList.remove("open");
}


/* ============================================================
   DOCUMENTOS PARA NOTARÍA — ESTADO GLOBAL
============================================================ */

window.documentosNotaria = [];


/* ============================================================
   REGISTRAR DOCUMENTO (llamado desde Carpeta Digital)
============================================================ */

function registrarDocumentoNotaria(doc) {
    if (!window.documentosNotaria) window.documentosNotaria = [];
    window.documentosNotaria.push(doc);
    renderDocumentosNotaria();
}


/* ============================================================
   RENDER DOCUMENTOS PARA NOTARÍA
============================================================ */

function renderDocumentosNotaria() {
    const contenedor = document.getElementById("tablaDocumentosNotaria");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (!window.documentosNotaria || window.documentosNotaria.length === 0) {
        contenedor.innerHTML = `
            <tr>
                <td colspan="5" class="text-soft">No hay documentos subidos.</td>
            </tr>`;
        return;
    }

    window.documentosNotaria.forEach(doc => {
        contenedor.innerHTML += `
            <tr>
                <td>${doc.nombre}</td>
                <td>${doc.tipo}</td>
                <td>${doc.fecha}</td>
                <td>
                    <span class="badge badge--${doc.estado === "validado" ? "green" : doc.estado === "rechazado" ? "red" : "yellow"}">
                        ${doc.estado}
                    </span>
                </td>
                <td>
                    <button class="btn btn-small" onclick="verDocumento('${doc.url}')">👁 Ver</button>
                    <button class="btn btn-blue btn-small" onclick="validarDocumento('${doc.id}')">✔ Validar</button>
                    <button class="btn btn-red btn-small" onclick="eliminarDocumento('${doc.id}')">🗑 Eliminar</button>
                </td>
            </tr>
        `;
    });
}


/* ============================================================
   ACCIONES SOBRE DOCUMENTOS
============================================================ */

function verDocumento(url) {
    window.open(url, "_blank");
}

function validarDocumento(id) {
    const doc = window.documentosNotaria.find(d => d.id === id);
    if (doc) doc.estado = "validado";
    renderDocumentosNotaria();
}

function eliminarDocumento(id) {
    window.documentosNotaria = window.documentosNotaria.filter(d => d.id !== id);
    renderDocumentosNotaria();
}


/* ============================================================
   DETECTAR TIPO DE DOCUMENTO
============================================================ */

function detectarTipoDocumento(nombre) {
    const n = nombre.toLowerCase();
    if (n.includes("dni")) return "Identificación";
    if (n.includes("poder")) return "Poder";
    if (n.includes("escritura")) return "Escritura";
    if (n.includes("certificado")) return "Certificado";
    if (n.includes("nota")) return "Nota simple";
    return "Documento";
}


/* ============================================================
   ESCUCHAR DOCUMENTOS SUBIDOS DESDE CARPETA DIGITAL
============================================================ */

window.addEventListener("message", (event) => {
    if (!event.data || event.data.tipo !== "documentoSubido") return;

    const { nombre, url } = event.data;

    const nuevoDoc = {
        id: crypto.randomUUID(),
        nombre: nombre,
        tipo: detectarTipoDocumento(nombre),
        fecha: new Date().toISOString().slice(0,10),
        estado: "pendiente",
        url: url
    };

    window.documentosNotaria.push(nuevoDoc);
    renderDocumentosNotaria();
});


/* ============================================================
   ESCUCHAR DOCUMENTOS ELIMINADOS DESDE CARPETA DIGITAL
============================================================ */

window.addEventListener("message", (event) => {
    if (event.data?.tipo !== "documentoEliminado") return;

    const nombre = event.data.nombre;

    window.documentosNotaria = window.documentosNotaria.filter(d => d.nombre !== nombre);

    renderDocumentosNotaria();
});
