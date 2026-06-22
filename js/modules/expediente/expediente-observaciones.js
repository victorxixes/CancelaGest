/* ============================
   OBSERVACIONES DEL EXPEDIENTE
============================ */

let observaciones = [];

/* ============================
   CARGAR DESDE LOCALSTORAGE
============================ */

document.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem("observacionesExpediente");
    observaciones = data ? JSON.parse(data) : [];
    renderObservaciones();
});
// ABRIR MODAL
function abrirModalNuevaObservacion() {
    document.getElementById("modalNuevaObservacion").classList.add("open");
}

// CERRAR MODAL
function cerrarModalNuevaObservacion(e) {
    if (e) e.stopPropagation();
    document.getElementById("modalNuevaObservacion").classList.remove("open");
}

// GUARDAR OBSERVACIÓN
function guardarNuevaObservacion() {
    const texto = document.getElementById("nuevaObsTexto").value.trim();
    const visibilidad = document.getElementById("nuevaObsVisibilidad").value;
    const urgente = document.getElementById("nuevaObsUrgente").checked;

    if (!texto) {
        alert("La observación no puede estar vacía.");
        return;
    }

    const fecha = new Date().toLocaleString("es-ES");

    const nueva = {
        fecha,
        texto,
        visibilidad,
        urgente
    };

    // Guardar en localStorage o en tu backend
    let lista = JSON.parse(localStorage.getItem("observacionesExpediente") || "[]");
    lista.unshift(nueva);
    localStorage.setItem("observacionesExpediente", JSON.stringify(lista));

    cerrarModalNuevaObservacion();
    renderObservaciones();
}

// RENDERIZAR TABLA
function renderObservaciones() {
    const tbody = document.getElementById("tablaObservaciones");
    tbody.innerHTML = "";

    const lista = JSON.parse(localStorage.getItem("observacionesExpediente") || "[]");

    lista.forEach((obs, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${obs.fecha}</td>
            <td>
                ${obs.urgente ? "<span class='badge badge--red'>URGENTE</span> " : ""}
                ${obs.texto}
                <br>
                <small class="text-soft">Visibilidad: ${obs.visibilidad}</small>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// INICIALIZAR
document.addEventListener("DOMContentLoaded", renderObservaciones);

/* ============================
   GUARDAR OBSERVACIÓN
============================ */

function guardarObservacion() {
    const texto = getValue("obsTexto").trim();
    const visibilidad = getValue("obsVisibilidad");
    const urgente = document.getElementById("obsUrgente").checked;

    if (!texto) {
        alert("Debes escribir una observación.");
        return;
    }

    const nueva = {
        id: Date.now(),
        texto,
        visibilidad,
        urgente,
        fecha: new Date().toLocaleString()
    };

    observaciones.unshift(nueva);
    persistir();
    renderObservaciones();

    // limpiar formulario
    document.getElementById("obsTexto").value = "";
    document.getElementById("obsUrgente").checked = false;
}

/* ============================
   RENDERIZAR LISTA
============================ */

function renderObservaciones() {
    const cont = document.getElementById("listaObservaciones");
    if (!cont) return;

    cont.innerHTML = "";

    observaciones.forEach(obs => {
        const div = document.createElement("div");
        div.classList.add("obs-item", "fade-in");

        div.innerHTML = `
            <div class="obs-header">
                <span class="obs-fecha">${obs.fecha}</span>
                <div class="obs-badges">
                    ${badgeVisibilidad(obs.visibilidad)}
                    ${obs.urgente ? `<span class="badge badge-urgente">⚠ Urgente</span>` : ""}
                </div>
            </div>

            <div class="obs-texto">${obs.texto}</div>

            <div class="obs-actions">
                <button class="btn-mini btn-yellow" onclick="editarObservacion(${obs.id})">✏ Editar</button>
                <button class="btn-mini btn-red" onclick="eliminarObservacion(${obs.id})">🗑 Eliminar</button>
            </div>
        `;

        cont.appendChild(div);
    });
}

/* ============================
   BADGES DE VISIBILIDAD
============================ */

function badgeVisibilidad(tipo) {
    const map = {
        interno:     "🔒 Interno",
        apoderado:   "👤 Apoderado",
        notaria:     "🏛️ Notaría",
        departamento:"🏢 Departamento"
    };

    return `<span class="badge badge-vis">${map[tipo] || tipo}</span>`;
}

/* ============================
   EDITAR OBSERVACIÓN
============================ */

function editarObservacion(id) {
    const obs = observaciones.find(o => o.id === id);
    if (!obs) return;

    const nuevoTexto = prompt("Editar observación:", obs.texto);
    if (!nuevoTexto) return;

    obs.texto = nuevoTexto.trim();
    persistir();
    renderObservaciones();
}

/* ============================
   ELIMINAR OBSERVACIÓN
============================ */

function eliminarObservacion(id) {
    if (!confirm("¿Eliminar esta observación?")) return;

    observaciones = observaciones.filter(o => o.id !== id);
    persistir();
    renderObservaciones();
}

/* ============================
   PERSISTENCIA
============================ */

function persistir() {
    localStorage.setItem("observacionesExpediente", JSON.stringify(observaciones));
}

/* ============================
   HELPERS
============================ */

function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : "";
}
